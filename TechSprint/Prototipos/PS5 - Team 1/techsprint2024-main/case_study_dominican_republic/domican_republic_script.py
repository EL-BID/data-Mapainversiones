import pandas as pd
import json
from datetime import datetime
import jsonschema
import uuid

# Configura opciones de visualización de Pandas
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)

# Lee el archivo Excel en DataFrames de Pandas
filepath = \
    'case_study_dominican_republic/Dominican_Republic_Techsprint_Data.xlsx'
df_processes = pd.read_excel(filepath, sheet_name='Processes')
df_contracts = pd.read_excel(filepath, sheet_name='Contracts')

# Muestra las primeras 5 filas de cada DataFrame
print("Primeras 5 filas del DataFrame de Procesos:")
print(df_processes.head().to_markdown(index=False, numalign="left", 
                                      stralign="left"))

print("\nPrimeras 5 filas del DataFrame de Contratos:")
print(df_contracts.head().to_markdown(index=False, numalign="left", 
                                      stralign="left"))

# Imprime los nombres de columna y sus tipos de datos
print("\nNombres de columna y tipos para el DataFrame de Procesos:")
df_processes.info()

print("\nNombres de columna y tipos para el DataFrame de Contratos:")
df_contracts.info()

# Preprocesa la columna 'MontoEstimado' en df_processes
df_processes['MontoEstimado'] = \
    df_processes['MontoEstimado'].astype(str).str.replace('e', 'E', regex=False)
df_processes['MontoEstimado'] = \
    pd.to_numeric(df_processes['MontoEstimado'], errors='coerce')
df_processes['MontoEstimado'] = df_processes['MontoEstimado'].fillna(0)

# Reemplaza 'e' con 'E' en la columna 'ValorContrato'
df_contracts['ValorContrato'] = \
    df_contracts['ValorContrato'].astype(str).str.replace('e', 'E', regex=False)

# Convierte la columna 'ValorContrato' a numérico
df_contracts['ValorContrato'] = \
    pd.to_numeric(df_contracts['ValorContrato'], errors='coerce')

# Rellena valores NaN en 'ValorContrato' con 0
df_contracts['ValorContrato'] = df_contracts['ValorContrato'].fillna(0)

# Elimina espacios en blanco al final de 'CodigoProceso'
df_contracts['CodigoProceso'] = \
    df_contracts['CodigoProceso'].astype(str).str.strip()

def generate_ocds_releases(df_processes, df_contracts):
    """
    Genera una lista de releases OCDS, uno por cada 'CodigoProceso' único.
    """

    releases = []
    for codigo_proceso in df_processes['CodigoProceso'].unique():
        # Filtra datos para el CodigoProceso actual
        df_process = df_processes[df_processes['CodigoProceso'] == codigo_proceso].iloc[0]
        df_contract = df_contracts[df_contracts['CodigoProceso'] == codigo_proceso]

        # Mapeo de 'EstadoProceso' a estado de licitación OCDS
        status_mapping = {
            'Proceso adjudicado y celebrado': 'complete',
            'Proceso ad': 'active',
            'Cancelado': 'cancelled',
            'Proceso con etapa cerrada': 'active',
            'Sobres abiertos o aperturados': 'active',
            'No Definido': None,
            'Proceso desierto': 'unsuccessful'
        }
        ocds_status = status_mapping.get(df_process['EstadoProceso'], 'active') 

        # Mapeo de 'Modalidad' a método de contratación OCDS
        procurement_method_mapping = {
            'Licitación Pública Nacional': 'open',
            'Compras por Debajo del Umbral': 'limited', 
            'Comparación de Precios': 'selective', 
            'Licitación Pública Internacional': 'open', 
            'Contratación Directa': 'direct',
            'Sorteo de Obras': 'open', 
            'Selección de Consultores': 'selective', 
            'Contratación Menor': 'limited' 
        }
        ocds_procurement_method = procurement_method_mapping.get(df_process['Modalidad'], None)

        # Crea el release OCDS básico
        release = {
            "ocid": f"ocds-r5n6j87-{codigo_proceso}", 
            "id": str(uuid.uuid4()), 
            "date": pd.Timestamp.now().strftime('%Y-%m-%dT%H:%M:%SZ'),
            "tag": ["tender"],
            "initiationType": "tender",
            "planning": {
                "budget": {
                    "amount": {
                        "amount": df_process['MontoEstimado'],
                        "currency": "DOP"
                    }
                }
            },
            "tender": {
                "id": codigo_proceso,
                "title": df_process['NombreProyecto'],
                "description": df_process['DescripcionProceso'],
                "status": ocds_status,
                "statusDetails": df_process['EstadoProceso'],
                "procurementMethod": ocds_procurement_method,
                "procurementMethodDetails": df_process['Modalidad'],
            }
        }

        # Agrega información de contratos si existen
        if not df_contract.empty:
            contracts = []
            for _, row in df_contract.iterrows():
                contracts.append({
                    "id": row['CodigoContrato'],
                    "title": row['DescripcionContrato'],
                    "status": row['EstadoContrato'],
                    "value": {
                        "amount": row['ValorContrato'],
                        "currency": row['MonedaContrato']
                    },
                    "awardID": "award-" + row['CodigoContrato'],
                    "suppliers": [
                        {
                            "id": row['CodigoProveedor'],
                            "name": row['Proveedor']
                        }
                    ]
                })

            release['tender']['contracts'] = contracts

        releases.append(release)

    return releases

def generate_ocds_package(release):
    """
    Genera un paquete de release OCDS.
    """

    package = {
        "uri": f"do.dgcprd.{release["ocid"]}",
        "version": "1.1",
        "publishedDate": datetime.now().strftime('%Y-%m-%dT%H:%M:%SZ'),
        "releases": [release],
        "publisher": {
            "name": "Dominican Republic"
        },
    }

    return package

def validate_json_schema(dct: dict, schema: dict):
    """
    Valida un diccionario contra un esquema JSON Schema.
    """
    jsonschema.validate(instance=dct, schema=schema)

# Ejemplo de uso
ocds_releases = generate_ocds_releases(df_processes, df_contracts)

for release in ocds_releases:
    # Genera el paquete OCDS
    ocds_package = generate_ocds_package(release)

    # Carga el esquema de validación
    with open("case_study_dominican_republic/release_package_schema.json", "r") as f:
        schema = json.load(f)

    # Valida el paquete contra el esquema
    validate_json_schema(ocds_package, schema)

    # Imprime y guarda el paquete generado
    print(json.dumps(ocds_package, indent=4))
    filepath = \
        f"case_study_dominican_republic/release_packages/{release['ocid']}.json"
    with open(filepath, "w") as f:
        json.dump(ocds_package, f, indent=4)

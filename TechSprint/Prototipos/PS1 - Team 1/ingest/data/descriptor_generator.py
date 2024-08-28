import json
import sqlite3
import requests

# Define the URLs and corresponding prefixes for each country
country_url_prefix_map = {
    "argentina": {
        "db_name": "argentina_data.db",
        "url_prefix_map": {
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/investment-projects-and-works-arg/datapackage.json": "investmentProjectsAndWorksArg"
        }
    },
    "paraguay": {
        "db_name": "paraguay_data.db",
        "url_prefix_map": {
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/national-development-plan-pry/datapackage.json": "nationalDevelopmentPlanPry",
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/investment-projects-pry/datapackage.json": "investmentProjectsPry",
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/general-budget-pry/datapackage.json": "generalBudgetPry"
        }
    },
    "republica_dominicana": {
        "db_name": "dominican_republic_data.db",
        "url_prefix_map": {
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/general-budget-information-on-investment-dom/datapackage.json": "generalBudgetInformationOnInvestmentDom",
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/emergency-processes-and-contracts-and-budget-dom/datapackage.json": "emergencyProcessesAndContractsAndBudgetDom",
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/investment-projects-dom/datapackage.json": "investmentProjectsDom"
        }
    },
    "honduras": {
        "db_name": "honduras_data.db",
        "url_prefix_map": {
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/investment-projects-hnd/datapackage.json": "investmentProjectsHnd"
        }
    },
    "jamaica": {
        "db_name": "jamaica_data.db",
        "url_prefix_map": {
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/investment-projects-jam/datapackage.json": "investmentProjectsJam"
        }
    },
    "panama": {
        "db_name": "panama_data.db",
        "url_prefix_map": {
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/investment-projects-pan/datapackage.json": "investmentProjectsPan"
        }
    }
}

def to_upper_camel_case(snake_str):
    components = snake_str.split('_')
    return ''.join(x.title() for x in components)

def fetch_json(url):
    response = requests.get(url)
    response.raise_for_status()
    return response.json()

def get_enum_values(conn, table_name, column_name, limit=20):
    # Quote the column name to handle spaces and special characters
    column_name_quoted = f'"{column_name}"'
    query = f"SELECT DISTINCT {column_name_quoted} FROM {table_name} LIMIT {limit + 1}"
    try:
        cursor = conn.execute(query)
        values = cursor.fetchall()
        if len(values) <= limit:
            return [v[0] for v in values]
    except sqlite3.OperationalError as e:
        print(f"Error executing query: {e}")
    return None

# Loop through each country and generate the descriptors
for country, data in country_url_prefix_map.items():
    db_name = data['db_name']
    url_prefix_map = data['url_prefix_map']

    # Connect to the SQLite database
    conn = sqlite3.connect(db_name)

    # Initialize an empty dictionary to store the tables and fields
    tables_dict = {}

    # Fetch data from each URL and parse the tables and fields
    for url, prefix in url_prefix_map.items():
        dataset = fetch_json(url)
        for resource in dataset['resources']:
            table_info = {
                'title': resource.get('title', ''),
                'description': resource.get('description', ''),
                'fields': []
            }

            # Add Spanish translations if available
            title_translations = resource.get('title_translations', {})
            description_translations = resource.get('description_translations', {})
            if 'es' in title_translations:
                table_info['title_es'] = title_translations['es']
            if 'es' in description_translations:
                table_info['description_es'] = description_translations['es']

            schema = resource.get('schema', {})
            fields = schema.get('fields', [])
            table_name = to_upper_camel_case(resource['name'].replace('-', '_'))
            full_table_name = f"{prefix}{table_name}"

            # Debug: Print the columns in the table
            cursor = conn.execute(f"PRAGMA table_info({full_table_name})")
            columns = cursor.fetchall()
            print(f"Columns in table {full_table_name}:")
            for column in columns:
                print(column[1])

            for field in fields:
                field_info = {
                    'name': field.get('name'),
                    'type': field.get('type'),
                    'format': field.get('format', 'default'),
                    'description': field.get('description', '')
                }

                # Add Spanish translations for field descriptions if available
                field_description_translations = field.get('description_translations', {})
                if 'es' in field_description_translations:
                    field_info['description_es'] = field_description_translations['es']

                # Find enum values if they exist and the field is not a date field
                if 'date' not in field_info['type'].lower():
                    enum_values = get_enum_values(conn, full_table_name, field['name'])
                    if enum_values:
                        field_info['description'] += f" Options: {enum_values}"
                        if 'es' in field_description_translations:
                            field_info['description_es'] += f" Opciones: {enum_values}"

                table_info['fields'].append(field_info)

            tables_dict[full_table_name] = table_info

    # Close the database connection
    conn.close()

    # Define the output file path for each country
    output_file_path = f"tables-descriptor-{country}.json"

    # Save the resulting dictionary to a JSON file
    with open(output_file_path, 'w', encoding='utf-8') as outfile:
        json.dump(tables_dict, outfile, ensure_ascii=False, indent=4)

    print(f"Data saved to {output_file_path}")

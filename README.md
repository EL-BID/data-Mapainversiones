[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=EL-BID_data-repository-Mapainversiones&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=EL-BID_data-repository-Mapainversiones)


# data-repository-Mapainversiones

## Package descriptor sample


```json
{
  "hash": "7d1af14084147c32ef3b53e2c9418d0e",
  "profile": "data-package",
  "name": "presupuesto-pry",
  "title": "Presupuesto",
  "country": "PRY",
  "contributors": [
    {
      "title": "Hacienda",
      "email": "",
      "path": "",
      "role": "author",
      "organization":""
    }
  ],
  "sources": [
    {
      "title": "Presupuesto",
      "path": "",
      "email": ""
    }
  ],
  "resources": []
}

```

## Tableschema sample

```json
{
  "dialect": {
    "caseSensitiveHeader": false,
    "delimiter": ",",
    "doubleQuote": true,
    "header": true,
    "lineTerminator": "\r\n",
    "quoteChar": "\"",
    "skipInitialSpace": false
  },
  "encoding": "utf-8",
  "format": "csv",
  "hash": "54755420f612237c5345b7870571948c",
  "name": "proyectos",
  "path": "https://air.portaljs.com/opendata/DOM/MAPAINVDB/OPENDATA/PROYECTOS/CSV/2024/06/19/PROYECTOS.CSV",
  "toc": "https://air.portaljs.com/opendata/DOM/MAPAINVDB/OPENDATA/PROYECTOS/toc_PROYECTOS.csv",
  "profile": "tabular-data-resource",
  "schema": {
    "fields": [
      {
        "format": "default",
        "name": "IdProyecto",
        "type": "integer"
      },
      {
        "format": "default",
        "name": "codigosnip",
        "type": "integer"
      } ...
    ],
    "missingValues": [
      ""
    ]
  }
}
```

## Data
### Paraguay datasets - total 4
|Country|Package name|Resource name|Owner|
|-|-|-|-|
PRY|proyectos-de-inversión-pry| opendata-proyectos|SNIP|
PRY|proyectos-de-inversión-pry|opendata-proyectos-ejecucion-ppto|SNIP|
PRY|proyectos-de-inversión-pry|opendata-proyectos-componentes|SNIP|
PRY| presupuesto-pry| presupuesto | Hacienda |
PRY|presupuesto-pry|presupuesto-indicadores| Hacienda |
PRY|pnd-pry|presupuesto-por-entidad|Secretaría Técnica de Planificación|
PRY|pnd-pry| indicadores |Secretaría Técnica de Planificación|
PRY| redflags-pry ?| redflags |Dirección Nacional de Contrataciones Públicas|No url to the resource in their metadata|

### Dominican Republic datasets - total 3
|Country|Package name|Resource name|Owner|
|-|-|-|-|
DOM|proyectos-de-inversión-dom| proyectos|SNIP|Started|
DOM|ppto-dom| presupuesto-de-inversion| Hacienda |Started|
DOM|ppto-dom| procesos-de-compras|Hacienda / DGCP|Started|
DOM|ppto-dom| contratos-de-compras|Hacienda / DGCP|Started|
DOM|ppto-dom| presupuesto-relacionado-a-proyectos-de-inversion|Hacienda / SNIP|Started|

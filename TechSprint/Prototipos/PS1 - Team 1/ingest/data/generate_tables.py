import json
import requests
import sqlite3
import pandas as pd
from io import StringIO
import csv

# URLs and corresponding database names for each country
country_data = {
    "argentina": {
        "db_name": "argentina_data.db",
        "urls": [
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/investment-projects-and-works-arg/datapackage.json"
        ]
    },
    "republica_dominicana": {
        "db_name": "dominican_republic_data.db",
        "urls": [
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/general-budget-information-on-investment-dom/datapackage.json",
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/emergency-processes-and-contracts-and-budget-dom/datapackage.json",
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/investment-projects-dom/datapackage.json"
        ]
    },
    "honduras": {
        "db_name": "honduras_data.db",
        "urls": [
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/investment-projects-hnd/datapackage.json"
        ]
    },
    "jamaica": {
        "db_name": "jamaica_data.db",
        "urls": [
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/investment-projects-jam/datapackage.json"
        ]
    },
    "panama": {
        "db_name": "panama_data.db",
        "urls": [
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/investment-projects-pan/datapackage.json"
        ]
    }
}


def fetch_json(url):
    response = requests.get(url)
    response.raise_for_status()
    return response.json()


def to_lower_camel_case(snake_str):
    components = snake_str.replace('-', '_').split('_')
    return components[0] + ''.join(x.title() for x in components[1:])


def create_table_from_csv(csv_content, table_name, conn):
    try:
        # Try reading the CSV with default settings
        df = pd.read_csv(StringIO(csv_content), low_memory=False)
    except pd.errors.ParserError as e:
        print(f"ParserError detected in {table_name}: {e}")
        print(f"Attempting manual line-by-line CSV parsing for {table_name}...")

        # Manually parse the CSV content
        rows = csv_content.splitlines()
        header = rows[0].split(',')  # Assuming the first line is the header
        data = []

        for line in rows[1:]:
            row = next(csv.reader([line], skipinitialspace=True))
            # Ensure the row matches the header length
            if len(row) == len(header):
                data.append(row)
            else:
                print(f"Skipping problematic line in {table_name}: {line}")

        # Convert the cleaned data to DataFrame
        df = pd.DataFrame(data, columns=header)

    # Write the DataFrame to SQL
    df.to_sql(table_name, conn, if_exists='replace', index=False)


for country, data in country_data.items():
    db_name = data['db_name']
    urls = data['urls']

    # Create a new SQLite database (or connect if it exists)
    conn = sqlite3.connect(db_name)

    for url in urls:
        # Fetch the datapackage JSON
        datapackage = fetch_json(url)

        # Extract the name and resources
        dataset_name = datapackage['name'].replace('-', '_')
        resources = datapackage['resources']

        for resource in resources:
            if resource['format'] == 'csv':
                csv_url = resource['path']
                csv_name = resource['name'].replace('-', '_')

                # Convert dataset and CSV names to lower camel case
                camel_case_table_name = to_lower_camel_case(f"{dataset_name}_{csv_name}")

                print(f"Processing CSV: {csv_name} from {csv_url}")

                # Fetch the CSV content
                csv_response = requests.get(csv_url)
                csv_response.raise_for_status()

                # Create a table for this CSV
                create_table_from_csv(csv_response.text, camel_case_table_name, conn)

    # Close the connection
    conn.close()

    print(f"Data saved to {db_name}")

import csv
import json
import requests
import sqlite3
import pandas as pd
from io import StringIO

# URLs and corresponding database names for Paraguay
country_data = {
    "paraguay": {
        "db_name": "paraguay_data.db",
        "urls": [
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/national-development-plan-pry/datapackage.json",
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/investment-projects-pry/datapackage.json",
            "https://raw.githubusercontent.com/EL-BID/data-Mapainversiones/main/datasets/general-budget-pry/datapackage.json"
        ]
    }
}

# Custom CSV path for the manual CSV file replacement
custom_csv_path = "generalBudgetPryGeneralBudgetIndicators.csv"
custom_csv_name = "IndicadoresPND_MH"

def fetch_json(url):
    response = requests.get(url)
    response.raise_for_status()
    return response.json()

def to_lower_camel_case(snake_str):
    components = snake_str.replace('-', '_').split('_')
    return components[0] + ''.join(x.title() for x in components[1:])

def create_table_from_csv(csv_content, table_name, conn, delimiter=','):
    try:
        # Try reading the CSV with the provided delimiter
        df = pd.read_csv(StringIO(csv_content), delimiter=delimiter, low_memory=False)
    except pd.errors.ParserError as e:
        print(f"ParserError detected in {table_name}: {e}")
        print(f"Attempting manual line-by-line CSV parsing for {table_name}...")

        # Manually parse the CSV content if there's a parsing error
        rows = csv_content.splitlines()
        header = rows[0].split(delimiter)  # Assuming the first line is the header
        data = []

        for line in rows[1:]:
            row = next(csv.reader([line], delimiter=delimiter, skipinitialspace=True))
            # Ensure the row matches the header length
            if len(row) == len(header):
                data.append(row)
            else:
                print(f"Skipping problematic line in {table_name}: {line}")

        # Convert the cleaned data to DataFrame
        df = pd.DataFrame(data, columns=header)

    # Write the DataFrame to SQL
    df.to_sql(table_name, conn, if_exists='replace', index=False)

# Process Paraguay data
db_name = country_data['paraguay']['db_name']
urls = country_data['paraguay']['urls']

# Create a new SQLite database (or connect if it exists)
conn = sqlite3.connect(db_name)

# Process the custom CSV file (Libro2.csv) first
with open(custom_csv_path, 'r', encoding='ISO-8859-1') as file:  # Use ISO-8859-1 encoding
    csv_content = file.read()
    camel_case_table_name = to_lower_camel_case(f"national_development_plan_pry_{custom_csv_name}")
    print(f"Processing custom CSV: {custom_csv_name} from {custom_csv_path}")
    create_table_from_csv(csv_content, camel_case_table_name, conn, delimiter=',')

# Now process the rest of the URLs, but skip the specific CSV that was replaced
for url in urls:
    datapackage = fetch_json(url)
    dataset_name = datapackage['name'].replace('-', '_')
    resources = datapackage['resources']

    for resource in resources:
        if resource['format'] == 'csv' and custom_csv_name not in resource['name']:
            csv_url = resource['path']
            csv_name = resource['name'].replace('-', '_')

            camel_case_table_name = to_lower_camel_case(f"{dataset_name}_{csv_name}")

            print(f"Processing CSV: {csv_name} from {csv_url}")

            csv_response = requests.get(csv_url)
            csv_response.raise_for_status()

            delimiter = ';' if csv_response.text.count(';') > csv_response.text.count(',') else ','
            create_table_from_csv(csv_response.text, camel_case_table_name, conn, delimiter)

# Close the connection
conn.close()

print(f"Data saved to {db_name}")

import os
import json
import sqlite3
import pandas as pd
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

# Load environment variables from .env file
load_dotenv()


def format_table_info(descriptions):
    table_info = ""
    for table_name, details in descriptions.items():
        table_info += f"Table: {table_name}\n"
        table_info += f"Title: {details.get('title', '')}\n"
        table_info += f"Description: {details.get('description', '')}\n"
        table_info += "Fields:\n"
        for field in details['fields']:
            table_info += f"  - {field['name']} ({field['type']}): {field.get('description', '')}\n"
        table_info += "\n"
    return table_info


class TransparencyAssistant:
    def __init__(self, db_path, descriptor_path, openai_api_key):
        self.table_info = None
        self.table_descriptions = None
        self.db_path = db_path
        self.descriptor_path = descriptor_path
        self.conn = sqlite3.connect(self.db_path)

        # Fetch model name from environment variable, defaulting to "gpt-4o-mini" if not set
        model_name = os.getenv("OPENAI_MODEL_NAME", "gpt-4o-mini")
        self.llm = ChatOpenAI(temperature=0, model=model_name, openai_api_key=openai_api_key)

        self.context = ""
        self.load_table_descriptions()

    def load_table_descriptions(self):
        with open(self.descriptor_path, "r", encoding="utf-8") as file:
            self.table_descriptions = json.load(file)
        self.table_info = format_table_info(self.table_descriptions)

    def generate_sql_query(self, user_input):
        prompt_template = """
        Here is the description of the tables in the database:
        {table_info}

        Your task is to generate a SQL query that answers the user's question. Follow these guidelines strictly:

        1. Language Consistency: Detect the language in which the user has asked the question. Respond in the same 
        language.

        2. Strict Schema Adherence: - Use Only Provided Names: Use only the table names and column names provided in 
        the description above. Double-check each name against the provided schema. - No Invention: Do not invent or 
        assume any table names, column names, or values that are not explicitly provided in the description above.

        3. Validation of Columns and Tables: - Column and Table Check: Before using a table or column in the SQL 
        query, ensure it exists in the provided description. If it does not exist, acknowledge this and suggest 
        alternative columns or approaches using only what is available. - Enum Options: Utilize only the provided 
        options for enum-like columns when performing comparisons. If a column has an `options` array provided in the 
        description, use only these options for comparisons.

        4. Query Optimization:
           - DISTINCT Clause: Use the `DISTINCT` keyword to avoid duplicated records where appropriate.
           - Case-Insensitive Search: Use case-insensitive `LIKE` wildcards for text comparisons.

        5. Explanation of Results: - Provide a clear and simple explanation of the data in the query results, 
        focusing on what the data represents and how it answers the user's question. Avoid technical details about 
        the SQL query itself. - If relevant data or columns are missing, clearly state this and explain how it 
        impacts the query.

        6. User Guidance: - If more information is needed from the user to generate an accurate query, ask for it 
        explicitly. - In cases where the query cannot be accurately generated due to missing columns or tables, 
        provide an alternative approach using the available data.

        Previous conversation context: {context}

        User's question: {prompt}

        Generate a JSON object with two fields, no markup in the response: 1. `sql_query` - a SQL query that answers 
        the user's question, or an empty string if the question is out of scope. 2. `explanation` - a simple and 
        non-technical explanation of the data in the query results, don't mention it is a query, just in own words, 
        specifically explaining what the data represents and how it answers the user's question, in the same language 
        as the user's question. Ensure that numerical values are clearly formatted and that currency names are 
        included where relevant."""
        formatted_prompt = prompt_template.format(
            table_info=self.table_info, context=self.context, prompt=user_input
        )
        response = self.llm.invoke([{"role": "user", "content": formatted_prompt}])
        return response

    def handle_response(self, response):
        try:
            response_content = response.content
            response_data = json.loads(response_content)
            sql_query = response_data['sql_query']
            explanation = response_data['explanation']

            if not sql_query:
                return None, explanation  # Out-of-scope response
            else:
                return self.execute_sql_query(sql_query), explanation
        except json.JSONDecodeError:
            return None, "Error parsing the response. Please ensure the response is in valid JSON format."
        except Exception as e:
            return None, f"Error generating or executing SQL query: {e}"

    def execute_sql_query(self, sql_query):
        cursor = self.conn.cursor()
        cursor.execute(sql_query)
        result = cursor.fetchall()
        columns = [desc[0] for desc in cursor.description]
        df = pd.DataFrame(result, columns=columns)

        # Format numbers to avoid scientific notation and add currency symbol if relevant
        df = df.apply(lambda x: x.map(lambda y: f"{y:,.2f}" if isinstance(y, (int, float)) else y))

        return df

    def close_connection(self):
        self.conn.commit()
        self.conn.close()

    def chat(self, user_input):
        self.context += f"\nUser: {user_input}"
        response = self.generate_sql_query(user_input)
        result, explanation = self.handle_response(response)
        self.context += f"\nAssistant: {explanation.strip()}"
        return result, explanation

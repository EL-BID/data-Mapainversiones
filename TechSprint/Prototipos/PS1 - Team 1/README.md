# Government Transparency AI Analyst

This repository contains a Government Transparency AI Analyst tool, which consists of two main components: a Streamlit app and a FastAPI service. The Streamlit app provides a user-friendly interface to interact with government transparency data, while the FastAPI service handles API requests to generate SQL queries and explanations based on user input.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [Running the Streamlit App](#running-the-streamlit-app)
- [Running the FastAPI Service](#running-the-fastapi-service)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Government Transparency Data Analysis**: Interact with and query government transparency data.
- **AI-Powered Query Generation**: Use OpenAI's language models to generate SQL queries and explanations based on user input.
- **Cross-Platform Compatibility**: Works on both Windows and Linux environments.

## Setup

### Prerequisites

Ensure you have the following installed on your system:

- Python 3.8+
- pip (Python package installer)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/hubert77500/data-Mapainversiones.git
   cd chatbots/bid-hackaton-ps1

### Create and activate a virtual environment:

**On Windows:**

```bash
    python -m venv venv
    .\venv\Scripts\activate
   ```
   

**On Linux/Mac:**

```bash
    python3 -m venv venv
    source venv/bin/activate
   ```
     


### Install the required dependencies:

```bash
    pip install -r requirements.txt
    Set up environment variables:
```    

- Copy .env.example to .env and update the necessary environment variables.

```bash
cp .env.example .env
```

### Generate the Databases

You can get the base prepared .db of all countries by running:
```bash
cd ingest/data
python3 get_base_db_files.py
```

Or you can run de base .db files first time run from the urls provided in the problem statement:
```bash
cd ingest/data
python3 generate_tables.py
python3 generate_tables_paraguay.py
```



### Running the Streamlit App
The Streamlit app provides an interactive UI for querying government data.

**Start the Streamlit app:**

```bash
streamlit run streamlit_app.py
```

**Access the app:**

Once the app is running, open your web browser and go to http://localhost:8501.

**Running the FastAPI Service**

The FastAPI service provides an API endpoint for generating SQL queries and explanations.

**Start the FastAPI service:**

```bash
uvicorn main:app --reload --port 5000
```

**Access the API:**

The FastAPI service will be available at http://localhost:5000. You can view the automatically generated API documentation by navigating to http://localhost:5000/docs.

**Environment Variables**

The application relies on several environment variables, which should be defined in the .env file:

```dotenv
OPENAI_API_KEY: Your OpenAI API key.
QUERY_RESOLVER_API: The URL for the FastAPI query resolver API.
USE_PHONE_NUMBER_WHITELIST: Boolean to determine if phone number whitelist should be used.
```

### Usage

Interacting with the Streamlit App

The Streamlit app allows users to:

- Select a country: Choose the country whose government data you wish to query.
- Enter a query: Type in your question, and the AI will generate a SQL query and explanation based on the provided data.
- View results: The query results and explanation will be displayed on the screen.
- Interacting with the FastAPI Service
The FastAPI service provides a /query endpoint that accepts POST requests with the following JSON payload:

```json
{
  "prompt": "Your question here",
  "country": "Country name"
}
```

**Example Request**

```bash
curl -X POST http://localhost:5000/query -H "Content-Type: application/json" -d '{"prompt": "What are the largest government projects?", "country": "Republica Dominicana"}'
```

### API documentation - Swagger UI link
http://localhost:5000/docs

### Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Be sure to include tests and ensure that the code follows the project's coding standards.

### License
This project is licensed under the MIT License. See the LICENSE file for details.





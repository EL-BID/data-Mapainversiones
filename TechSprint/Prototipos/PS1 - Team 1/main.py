import os
from enum import Enum

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

from assistant.config import country_paths
from assistant.transparency_assistant import TransparencyAssistant

load_dotenv()

app = FastAPI(
    title="Government Transparency AI Analyst API",
    description="This API allows users to query government transparency data for different countries using natural "
                "language prompts.",
    version="1.0.0"
)


# Define an Enum for the available countries
class CountryEnum(str, Enum):
    argentina = "Argentina"
    honduras = "Honduras"
    jamaica = "Jamaica"
    panama = "Panama"
    paraguay = "Paraguay"
    republica_dominicana = "Republica Dominicana"


# Define the input model for the endpoint
class QueryRequest(BaseModel):
    prompt: str
    country: CountryEnum  # Use the Enum for the country field

    class Config:
        json_schema_extra = {
            "example": {
                "prompt": "List the top 5 projects with the highest budget.",
                "country": "Argentina"
            }
        }


# Define the response model for the endpoint
class QueryResponse(BaseModel):
    result: dict
    explanation: str

    class Config:
        json_schema_extra = {
            "example": {
                "result": {
                    "project_name": ["Project A", "Project B", "Project C"],
                    "budget": [1000000, 950000, 900000]
                },
                "explanation": "This data represents the top 5 projects in Argentina with the highest allocated "
                               "budgets."
            }
        }


@app.post("/query", response_model=QueryResponse, summary="Query Transparency Assistant",
          description="Send a query to the Transparency Assistant for a specific country to generate a SQL query "
                      "based on a natural language prompt.",
          responses={
              200: {"description": "Successful response with query results."},
              400: {"description": "Invalid country specified."},
              404: {"description": "No data found for the query."},
              500: {"description": "Internal server error."}
          })
async def query_assistant(data: QueryRequest):
    """
    ## Query the Transparency Assistant

    This endpoint allows you to send a natural language prompt to the Transparency Assistant for a specific country.

    The assistant will generate an SQL query based on the provided prompt and return the query results along with an
    explanation.

    ### Parameters: - **prompt**: The user's query in natural language. This should be a descriptive request related
    to government transparency data. - **country**: The country to query data for. Must be one of the following: -
    Argentina - Honduras - Jamaica - Panama - Paraguay - Republica Dominicana

    ### Responses:
    - **200 OK**: Returns the results of the query along with an explanation of the data.
    - **400 Bad Request**: Returned if the specified country is not supported.
    - **404 Not Found**: Returned if no data is found for the query.
    - **500 Internal Server Error**: Returned if there is an internal error processing the request.
    """
    if data.country not in country_paths:
        raise HTTPException(status_code=400, detail="Country not supported")

    paths = country_paths[data.country]

    # Fetch the OpenAI API key from environment variables
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        raise HTTPException(status_code=500, detail="OpenAI API key not found in environment variables")

    # Initialize the TransparencyAssistant with the API key
    assistant = TransparencyAssistant(db_path=paths["db_path"], descriptor_path=paths["descriptor_path"], openai_api_key=openai_api_key)

    # Process the user's query
    result, explanation = assistant.chat(data.prompt)

    result_dict = result.to_dict() if result is not None else {}
    return QueryResponse(result=result_dict, explanation=explanation)

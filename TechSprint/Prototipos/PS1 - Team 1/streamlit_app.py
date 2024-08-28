import os
import streamlit as st
from dotenv import load_dotenv
from assistant.config import country_paths
from assistant.transparency_assistant import TransparencyAssistant

# Load environment variables from .env file
load_dotenv()

# Set up Streamlit page configuration
st.set_page_config(
    layout="wide",
    page_title="Government Transparency AI Analyst 🏛️",
    page_icon="🏛️",
)

# Title
st.title("Government Transparency AI Analyst 🏛️")

# Initialize session state for chat history and context
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []
if "context" not in st.session_state:
    st.session_state.context = ""

# Selector for country, sorted alphabetically
sorted_countries = sorted(country_paths.keys())
sorted_countries.insert(0, "Select Country")
selected_country = st.selectbox("Select Country", sorted_countries)

# Only proceed if a country is selected
if selected_country != "Select Country":
    # Load the appropriate paths based on the selected country
    paths = country_paths[selected_country]
    db_path = paths["db_path"]
    descriptor_path = paths["descriptor_path"]
    openai_api_key = os.getenv('OPENAI_API_KEY')  # Retrieve the OpenAI API key from environment variables

    # Initialize the TransparencyAssistant with the OpenAI API key
    assistant = TransparencyAssistant(db_path, descriptor_path, openai_api_key)

    # Handling chat input
    if prompt := st.chat_input("Type your message and press Enter"):
        st.session_state.chat_history.append({"role": "user", "message": prompt})
        result, explanation = assistant.chat(prompt)
        st.session_state.chat_history.append({"role": "assistant", "message": explanation})
        if result is not None:
            st.session_state.chat_history.append({"role": "assistant", "message": result.to_markdown(index=False)})

    # Display all chat messages
    for chat in st.session_state.chat_history:
        if chat["role"] == "user":
            st.chat_message("user").write(chat["message"])
        else:
            st.chat_message("assistant").write(chat["message"])

    # Close the connection when the session ends
    assistant.close_connection()

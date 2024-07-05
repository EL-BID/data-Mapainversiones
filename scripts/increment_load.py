from azure.storage.blob import BlobServiceClient, ContainerClient, BlobClient
import boto3
from botocore.exceptions import NoCredentialsError,ClientError
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


# Azure Storage credentials
azure_storage_account_name = os.getenv('AZURE_STORAGE_ACCOUNT_NAME')
azure_storage_account_key = os.getenv('AZURE_STORAGE_ACCOUNT_KEY')
azure_container_name = os.getenv('AZURE_CONTAINER_NAME')
# Cloudflare R2 credentials
r2_access_key_id = os.getenv('R2_ACCESS_KEY_ID')
r2_secret_access_key = os.getenv('R2_SECRET_ACCESS_KEY')
r2_bucket_name = os.getenv('R2_BUCKET_NAME')
r2_endpoint_url = os.getenv('R2_ENDPOINT_URL')
r2_location = os.getenv('R2_LOCATION')

# Initialize Azure Blob Service Client
azure_connection_string = f"DefaultEndpointsProtocol=https;AccountName={azure_storage_account_name};AccountKey={azure_storage_account_key};EndpointSuffix=core.windows.net"
azure_blob_service_client = BlobServiceClient.from_connection_string(azure_connection_string)
azure_container_client = azure_blob_service_client.get_container_client(azure_container_name)


# Initialize Cloudflare R2 client using boto3
r2_client = boto3.client('s3', endpoint_url=r2_endpoint_url,
                         aws_access_key_id=r2_access_key_id,
                         aws_secret_access_key=r2_secret_access_key,
                         region_name=r2_location)            


def increment_load():
    # List and copy blobs
    for blob in azure_container_client.list_blobs():
        blob_client = azure_container_client.get_blob_client(blob)
        r2_blob_name = f"{azure_container_name}/{blob.name}"
        blob_properties = blob_client.get_blob_properties()
        if blob_properties.size > 0:
            # Check if the object already exists in the R2 bucket
            try:
                r2_client.head_object(Bucket=r2_bucket_name, Key=r2_blob_name)
                #print(f"Skipping {r2_blob_name}: already exists in R2 bucket.")
            except ClientError as e:
                if e.response['Error']['Code'] == '404':
                    # Object does not exist, proceed with upload 
                    blob_content = blob_client.download_blob().readall()   
                    r2_client.put_object(Bucket=r2_bucket_name, Key=r2_blob_name, Body=blob_content)
                    print(f"Successfully copied {r2_blob_name} to R2 in {r2_location}.")
                else:
                    # Handle other potential errors
                    print(f"Error checking if {r2_blob_name} exists: {e}")

if __name__ == '__main__':
    increment_load()

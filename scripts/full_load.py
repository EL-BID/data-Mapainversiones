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
                     
def search_file_in_r2(prefix, file_name):

    # Cloudflare R2 credentials
    r2_access_key_id = os.getenv('R2_ACCESS_KEY_ID')
    r2_secret_access_key = os.getenv('R2_SECRET_ACCESS_KEY')
    r2_bucket_name = os.getenv('R2_BUCKET_NAME')
    r2_endpoint_url = os.getenv('R2_ENDPOINT_URL')
    r2_location = os.getenv('R2_LOCATION')


    # Initialize Cloudflare R2 client using boto3
    r2_client = boto3.client('s3', endpoint_url=r2_endpoint_url,
                             aws_access_key_id=r2_access_key_id,
                             aws_secret_access_key=r2_secret_access_key,
                             region_name=r2_location)
    try:
        response = r2_client.list_objects_v2(Bucket=r2_bucket_name, Prefix=prefix)
        objects = response.get('Contents', [])
        
        found_files = [obj['Key'] for obj in objects if file_name in obj['Key']]
        
        if not found_files:
            print(f"No files found in R2 bucket {r2_bucket_name} with prefix '{prefix}' containing '{file_name}'.")
        else:
            print(f"Files found in R2 bucket {r2_bucket_name} with prefix '{prefix}' containing '{file_name}':")
            for file in found_files:
                print(f" - {file}")
                
        return found_files
    except NoCredentialsError:
        print("Credentials not available.")
    except Exception as e:
        print(f"Failed to search for files in R2 bucket: {e}")
        return []

def copy_azure_to_r2(container_name, blob_name, blob_content):
    try:
        # Prepend the Azure container name to the blob name
        r2_blob_name = f"{container_name}/{blob_name}"
        
        # Check if the object already exists in the R2 bucket
        try:
            r2_client.head_object(Bucket=r2_bucket_name, Key=r2_blob_name)
            print(f"Skipping {r2_blob_name}: already exists in R2 bucket.")
        except ClientError as e:
            if e.response['Error']['Code'] == '404':
                # Object does not exist, proceed with upload
                r2_client.put_object(Bucket=r2_bucket_name, Key=r2_blob_name, Body=blob_content)
                print(f"Successfully copied {r2_blob_name} to R2 in {r2_location}.")
            else:
                # Handle other potential errors
                print(f"Error checking if {r2_blob_name} exists: {e}")
    except NoCredentialsError:
        print("Credentials not available.")
    except Exception as e:
        print(f"Failed to copy {blob_name}: {e}")
        
def full_load():
    # List and copy blobs
    for blob in azure_container_client.list_blobs():
        blob_client = azure_container_client.get_blob_client(blob)
        blob_properties = blob_client.get_blob_properties()
        if blob_properties.size > 0:
            blob_content = blob_client.download_blob().readall()
            copy_azure_to_r2(azure_container_name,blob.name, blob_content)
        else:
            print(f"Skipping empty blob: {blob.name}")


if __name__ == '__main__':
    full_load()

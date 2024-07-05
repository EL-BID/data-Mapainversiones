from dataflows import Flow, load, dump_to_path, add_metadata,update_resource
import boto3
from botocore.exceptions import NoCredentialsError,ClientError

import csv
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


def package_init():
    flow = Flow(
        load("datasets/investment-projects-hnd/thematic-budgets.csv", format='csv', name="thematic-budgets"),
        dump_to_path(out_path="datasets/test/")
    )
    flow.process()  
#package_init()
def add_to_toc(blob_name, toc_file):
    '''
    blob sample: opendata/PRY/MAPAINVDB/PROYECTOS/CSV/2024/06/10/OPENDATA_PROYECTOS.CSV
    resource_name sample:  OPENDATA_PROYECTOS.csv
    toc_file sample: toc_+resource_name
    '''
    domain="https://air.portaljs.com/"
    blob_parts = blob_name.split('/')
    print(blob_parts)
    if blob_parts[1] not in ('DOM', 'JAM'):
        date = '-'.join(blob_parts[6:9])
        uri = domain+blob_name
    else:
        date = '-'.join(blob_parts[5:8])
        uri = domain+blob_name
    file_exists = os.path.isfile(toc_file)
    with open(toc_file, mode='a', newline='') as file:
        fieldnames = ['date', 'uri']
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        if not file_exists:
            writer.writeheader()
        writer.writerow({'date': date, 'uri': uri})
    print(f"Data appended to {toc_file}")
#add_to_toc("opendata/PRY/MAPAINVDB/PROYECTOS/CSV/2024/06/10/OPENDATA_PROYECTOS.CSV", "toc_OPENDATA_PROYECTOS.csv")



def toc_file_init(prefix):
    r2_access_key_id = os.getenv('R2_ACCESS_KEY_ID')
    r2_secret_access_key = os.getenv('R2_SECRET_ACCESS_KEY')
    r2_bucket_name = os.getenv('R2_BUCKET_NAME')
    r2_endpoint_url = os.getenv('R2_ENDPOINT_URL')
    r2_location = os.getenv('R2_LOCATION')
    r2_client = boto3.client(
        's3',
        endpoint_url=r2_endpoint_url,
        aws_access_key_id=r2_access_key_id,
        aws_secret_access_key=r2_secret_access_key,
        region_name=r2_location  # Setting the region/location
    )
    try:
        response = r2_client.list_objects_v2(Bucket=r2_bucket_name, Prefix=prefix)
        objects = response.get('Contents', [])
        if not objects:
            print(f"No objects found in R2 bucket {r2_bucket_name} with prefix {prefix}.")
        else:
            for obj in objects:
                blob_name = obj['Key']
                toc_file = "toc_"+obj['Key'].split('/')[-1]
                print(toc_file)
                add_to_toc(blob_name, toc_file)
                #print(f"Found object: {obj['Key']} (Size: {obj['Size']} bytes)")
    except NoCredentialsError:
        print("Credentials not available.")
    except Exception as e:
        print(f"Failed to list objects in R2 bucket: {e}")

#specific_prefix = "opendata/HND/MAPAINVDB/OPENDATA/PRESUPUESTO_GENERO/CSV/"  # Replace with the desired prefix
#toc_file_init(specific_prefix)

def upload_file_to_r2(file_path, key):
    # Cloudflare R2 credentials
    r2_access_key_id = os.getenv('R2_ACCESS_KEY_ID')
    r2_secret_access_key = os.getenv('R2_SECRET_ACCESS_KEY')
    r2_bucket_name = os.getenv('R2_BUCKET_NAME')
    r2_endpoint_url = os.getenv('R2_ENDPOINT_URL')
    r2_location = os.getenv('R2_LOCATION')
    
    r2_client = boto3.client('s3', endpoint_url=r2_endpoint_url,
                             aws_access_key_id=r2_access_key_id,
                             aws_secret_access_key=r2_secret_access_key,
                             region_name=r2_location)
    try:
        with open(file_path, 'rb') as file:
            r2_client.put_object(Bucket=r2_bucket_name, Key=key, Body=file)
            print(f"Successfully uploaded {file_path} to R2 with key {key}.")
    except FileNotFoundError:
        print(f"File not found: {file_path}")
    except NoCredentialsError:
        print("Credentials not available.")
    except Exception as e:
        print(f"Failed to upload {file_path}: {e}")
        
        
local_csv_path = "toc_presupuesto_genero.csv"
upload_key = "opendata/HND/MAPAINVDB/OPENDATA/PRESUPUESTO_GENERO/toc_presupuesto_genero.csv"
upload_file_to_r2(local_csv_path, upload_key)
        

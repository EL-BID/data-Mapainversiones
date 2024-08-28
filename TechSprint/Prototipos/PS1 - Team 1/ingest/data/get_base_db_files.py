import gdown


def download_files():
    file_ids = [
        '1lPVua5KKydFriLI2ZcSPI7sjCQrL2m9i',  # Argentina
        '1XZK2t6IDwk0AV7NXhinBy8S3XDFe06Q2',  # Dominican Republic
        '12u1c6e8OjbG8NqMaBDX7W2fS1UbGakMV',  # Honduras
        '1l17tVa2cdfo2HHvzc4hjhiyN0U7b9QoV',  # Jamaica
        '1j_OX7R2pDcf0VEYI_oVH1R3shJ5616GF',  # Panama
        '1ZM-9_I6L0dOmUeQYBH_sjdmlAYR1Bn-S'  # Paraguay
    ]

    filenames = [
        'argentina_data.db',
        'dominican_republic_data.db',
        'honduras_data.db',
        'jamaica_data.db',
        'panama_data.db',
        'paraguay_data.db'
    ]

    base_url = 'https://drive.google.com/uc?id='

    for file_id, filename in zip(file_ids, filenames):
        full_url = f"{base_url}{file_id}"
        print(f"Downloading {filename}...")
        gdown.download(full_url, filename, quiet=False)


if __name__ == "__main__":
    download_files()

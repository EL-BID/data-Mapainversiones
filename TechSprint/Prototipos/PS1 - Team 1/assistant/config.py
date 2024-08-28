from pathlib import Path

base_dir = Path(__file__).resolve().parent.parent  # Adjusted to ensure correct base directory

country_paths = {
    'Argentina': {
        'db_path': (base_dir / 'ingest/data/argentina_data.db').resolve(),
        'descriptor_path': (base_dir / 'ingest/data/tables-descriptor-argentina.json').resolve()
    },
    'Honduras': {
        'db_path': (base_dir / 'ingest/data/honduras_data.db').resolve(),
        'descriptor_path': (base_dir / 'ingest/data/tables-descriptor-honduras.json').resolve()
    },
    'Jamaica': {
        'db_path': (base_dir / 'ingest/data/jamaica_data.db').resolve(),
        'descriptor_path': (base_dir / 'ingest/data/tables-descriptor-jamaica.json').resolve()
    },
    'Panama': {
        'db_path': (base_dir / 'ingest/data/panama_data.db').resolve(),
        'descriptor_path': (base_dir / 'ingest/data/tables-descriptor-panama.json').resolve()
    },
    'Paraguay': {
        'db_path': (base_dir / 'ingest/data/paraguay_data.db').resolve(),
        'descriptor_path': (base_dir / 'ingest/data/tables-descriptor-paraguay.json').resolve()
    },
    'Republica Dominicana': {
        'db_path': (base_dir / 'ingest/data/dominican_republic_data.db').resolve(),
        'descriptor_path': (base_dir / 'ingest/data/tables-descriptor-republica_dominicana.json').resolve()
    }
}

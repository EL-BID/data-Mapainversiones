from datetime import datetime

def transf_datetime_to_str(value):
    if isinstance(value, datetime):
        return value.isoformat()
    print(f"[LOOK] {value} | {type(value)} | date isn't datetime")
    return value

def deserialize_dates(read_dict: dict):
    return recursive_dict_read(read_dict, transf_datetime_to_str)

def recursive_dict_read(read_dict, date_parse_hook):
    for key, value in read_dict.items():
        if isinstance(value, dict): # object-values
            read_dict[key] = recursive_dict_read(
                value, date_parse_hook
            )
        elif isinstance(value, (list, set)):
            # contemplates empty arrays
            if value and isinstance(value[0], dict):
                read_dict[key] = [
                    recursive_dict_read(e, date_parse_hook)
                    for e in value
                ] # array-values

        if "date" in key.lower() or "fecha" in key.lower():
            read_dict[key] = date_parse_hook(value)
        elif isinstance(value, datetime):
            print("key has not date and value type is datetime")
    return read_dict
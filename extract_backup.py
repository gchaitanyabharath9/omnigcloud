
import json

with open('en_backup.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("Root Keys:", data.keys())

for k in ['WhitePaper', 'Whitepaper', 'whitepaper', 'Docs', 'docs']:
    if k in data:
        print(f"\n--- {k} ---")
        # print first few nested keys to identify
        if isinstance(data[k], dict):
            print(list(data[k].keys())[:10])
        else:
            print(data[k])

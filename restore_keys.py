
import json

with open('en_backup.json', 'r', encoding='utf-8') as f:
    en_bak = json.load(f)

with open('src/messages/en.json', 'r', encoding='utf-8') as f:
    en_curr = json.load(f)

# Restore missing/mismatched namespaces
if 'WhitePaper' in en_bak:
    en_curr['WhitePaper'] = en_bak['WhitePaper']
if 'docs' in en_bak:
    # merge carefully if docs exists as a string
    if isinstance(en_curr.get('docs'), str):
        # Move string to a new key or ignore? 
        # The user's list says docs.whitepaper is missing.
        en_curr['docs'] = en_bak['docs']
    else:
        en_curr['docs'] = en_bak['docs']

if 'Common' in en_bak and 'header' in en_bak['Common']:
    if 'Common' not in en_curr: en_curr['Common'] = {}
    en_curr['Common']['header'] = en_bak['Common']['header']

# Also check for charts in Docs.whitepaper
if 'Docs' in en_bak and 'whitepaper' in en_bak['Docs'] and 'charts' in en_bak['Docs']['whitepaper']:
    if 'Docs' in en_curr and 'whitepaper' in en_curr['Docs']:
        en_curr['Docs']['whitepaper']['charts'] = en_bak['Docs']['whitepaper']['charts']

with open('src/messages/en.json', 'w', encoding='utf-8') as f:
    json.dump(en_curr, f, indent=2, ensure_ascii=False)

print("Restored keys in en.json")

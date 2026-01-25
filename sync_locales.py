
import json
import os
import glob

def sync_keys(source, target):
    if not isinstance(source, dict):
        return target
    
    new_target = {}
    target_lower = {k.lower(): (k, v) for k, v in target.items()} if isinstance(target, dict) else {}
    
    for k, v in source.items():
        # Special case: if both "Docs" and "docs" exist in source, 
        # we need to preserve them in target too.
        # But our sync_keys logic usually picks based on case-insensitivity.
        
        # Actually, let's just use exact match first, then fallback to case-insensitive.
        if isinstance(target, dict) and k in target:
            if isinstance(v, dict):
                new_target[k] = sync_keys(v, target[k])
            else:
                new_target[k] = target[k]
        else:
            kl = k.lower()
            if kl in target_lower:
                orig_k, orig_v = target_lower[kl]
                if isinstance(v, dict):
                    new_target[k] = sync_keys(v, orig_v)
                else:
                    new_target[k] = orig_v
            else:
                new_target[k] = v
            
    return new_target

def fix_locales():
    en_path = 'src/messages/en.json'
    with open(en_path, 'r', encoding='utf-8') as f:
        en = json.load(f)
    
    for fpath in glob.glob('src/messages/*.json'):
        if fpath.endswith('en.json'):
            continue
        
        print(f"Syncing {fpath}...")
        with open(fpath, 'r', encoding='utf-8') as f:
            loc = json.load(f)
        
        synced = sync_keys(en, loc)
        
        with open(fpath, 'w', encoding='utf-8') as f:
            json.dump(synced, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    fix_locales()

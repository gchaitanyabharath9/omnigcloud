
import json
import os
import glob

def get_mapping(obj, path=""):
    mapping = {}
    if isinstance(obj, dict):
        for k, v in obj.items():
            full_path = f"{path}.{k}" if path else k
            mapping[full_path.lower()] = full_path
            mapping.update(get_mapping(v, full_path))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            full_path = f"{path}[{i}]"
            mapping.update(get_mapping(v, full_path))
    return mapping

def sync_keys(source, target):
    """Recursively updates target to have the same keys as source, 
    preserving values where keys match case-insensitively."""
    if not isinstance(source, dict):
        return target
    
    new_target = {}
    target_lower = {k.lower(): (k, v) for k, v in target.items()} if isinstance(target, dict) else {}
    
    for k, v in source.items():
        kl = k.lower()
        if kl in target_lower:
            # Key exists in target (possibly different case)
            orig_k, orig_v = target_lower[kl]
            if isinstance(v, dict):
                new_target[k] = sync_keys(v, orig_v)
            else:
                new_target[k] = orig_v
        else:
            # Key missing from target, use source value
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

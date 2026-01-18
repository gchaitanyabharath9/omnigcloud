import os

def check_file(path):
    print(f"Checking {path}")
    if not os.path.exists(path):
        print("File not found")
        return
        
    with open(path, 'rb') as f:
        data = f.read()
        
    # Search for "cloud" or "Cloud"
    instances = []
    import re
    # Look for "cloud" followed by non-ascii
    # b'cloud' is bytes
    
    # Let's just look for ANY bytes > 127 and print context
    count = 0
    for i, b in enumerate(data):
        if b > 127:
            start = max(0, i-10)
            end = min(len(data), i+10)
            context = data[start:end]
            print(f"Found non-ASCII byte {b} ({hex(b)}) at {i}. Context: {context}")
            count += 1
            if count > 10:
                print("... stopping after 10 matches ...")
                break
    
    if count == 0:
        print("No non-ASCII bytes found.")

check_file(r"submission/acm/A1/main.tex")

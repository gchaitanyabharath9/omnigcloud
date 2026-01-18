
import os
import re

def fix_underscores(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # List of known terms with underscores found in papers
    keywords = [
        "user_id", "tenant_id", "trace_id", "span_id", 
        "device_type", "session_id", "status_code", 
        "remote_addr", "partition_id", "last_offset", 
        "batch_size", "group_id", "request_id", 
        "correlation_id", "customer_data", "billing_address",
        "shipping_address", "password_hash", "email_verified",
        "credit_card_token", "phone_verified", "allowed_registries",
        "data_residency_eu", "customer_region", "storage_location",
        "compute_location", "break_glass_token", "pki_issue",
        "common_name", "argocd_app_sync_total", "argocd_app_reconcile_duration_seconds",
        "http_requests_total", "http_request_duration_seconds",
        "queue_depth", "specific_endpoints", "error_policy",
        "latency_policy", "probabilistic_policy"
    ]
    
    # Replace `word_word` with `word\_word` provided it's NOT already escaped
    # Regex lookbehind (?<!\\)
    # Also ignore valid cases? 
    # If inside verbatim, escaping is WRONG!
    # Regex replacement is global, so it might break verbatim.
    # WE MUST SKIP VERBATIM BLOCKS.
    
    # Strategy: Split by verbatim blocks.
    # Only modify text parts.
    
    # Regex to split by verbatim or lstlisting
    # Patterns: \begin{verbatim} ... \end{verbatim}
    #           \verb|...| (harder)
    
    parts = re.split(r'(\\begin\{verbatim\}.*?\\end\{verbatim\})', content, flags=re.DOTALL)
    
    new_parts = []
    for part in parts:
        if part.startswith(r'\begin{verbatim}'):
            new_parts.append(part) # Don't touch
        else:
            # Modify text part
            text = part
            for kw in keywords:
                # Replace kw with kw.replace('_', '\\_')
                # Only if not preceded by \
                # And NOT inside a URL?
                # For now, just fix the underscores.
                escaped_kw = kw.replace('_', r'\_')
                # Use regex to replace unescaped
                # pattern: (?<!\\)keyword
                text = re.sub(r'(?<!\\)' + re.escape(kw), escaped_kw, text)
            new_parts.append(text)
            
    content = "".join(new_parts)
    
    if content != original:
        print(f"Fixed underscores in {file_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    subdirs = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            fix_underscores(path)

if __name__ == "__main__":
    main()

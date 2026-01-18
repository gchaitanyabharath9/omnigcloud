
import os
import re

def fix_a2_math(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Fix double beta: $\beta$$\beta$ > 0.01
    content = content.replace(r'$\beta$$\beta$', r'$\beta$')
    
    # Fix unclosed math: $\beta < 0.001 to
    # Pattern: \$\beta < 0\.001 (followed by space/word)
    # Replace with \$\beta < 0.001$
    # Be careful not to double $ if already there.
    
    # Specific string replace
    content = content.replace(r'targets $\beta < 0.001 to', r'targets $\beta < 0.001$ to')
    
    # Fix "The only way to achieve   0 is"
    # Should be "achieve $\beta \to 0$ is" or similar.
    content = content.replace(r'achieve   0 is', r'achieve $\beta \to 0$ is')
    
    # Fix "The PostgreSQL example demonstrates this: even with 8 read replicas, the single write master created  = 0.15,"
    # Missing symbol.
    content = content.replace(r'created  = 0.15', r'created $\alpha$ = 0.15')
    
    # Fix "even with low contention ( = 0.05), high coordination overhead ( = 0.08)"
    content = content.replace(r'contention ( = 0.05)', r'contention ($\alpha$ = 0.05)')
    content = content.replace(r'overhead ( = 0.08)', r'overhead ($\beta$ = 0.08)')
    
    if content != original:
        print(f"Fixed A2 math in {file_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    path = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers\A2\main.tex"
    if os.path.exists(path):
        fix_a2_math(path)

if __name__ == "__main__":
    main()

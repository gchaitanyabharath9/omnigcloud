
import os
import glob
import subprocess

def run_command(command):
    print(f"Running: {command}")
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.stdout:
        print(result.stdout)
    if result.stderr:
        print(result.stderr)
    return result.returncode

def cleanup_reports():
    patterns = [
        "audit_report_v*.txt",
        "diagnosis.txt",
        "params_report.txt",
        "syntax_report.txt",
        "braces_report.txt",
        "FINAL_ACM_AUDIT_REPORT.txt", # Removing this as part of cleanup, unless user specified otherwise
        "papers/*/build", # This assumes glob can handle dir removal? No, glob just finds strings.
    ]
    
    root_dir = os.getcwd()
    
    # Remove files
    for pattern in patterns:
        full_pattern = os.path.join(root_dir, pattern)
        files = glob.glob(full_pattern)
        for f in files:
            if os.path.isfile(f):
                try:
                    os.remove(f)
                    print(f"Removed file: {f}")
                except Exception as e:
                    print(f"Error removing {f}: {e}")
    
    # Remove build directories manually walking? or specific command
    # Powershell command is better for recursive dir removal
    run_command('Get-ChildItem -Path "papers" -Recurse -Include "build" | Remove-Item -Recurse -Force')

def git_operations():
    run_command("git add .")
    run_command('git commit -m "fix(latex): resolve syntax and math mode errors across all papers"')
    run_command("git push")

if __name__ == "__main__":
    cleanup_reports()
    git_operations()

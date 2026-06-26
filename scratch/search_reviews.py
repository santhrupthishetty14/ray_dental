with open(r'C:\Users\dell\.gemini\antigravity\brain\81792f8b-d4ea-4bce-be3d-d21289644190\.system_generated\steps\1058\content.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if 'review' in line.lower() or 'stars' in line.lower() or 'comment' in line.lower():
        print(f"Line {idx+1}: {line.strip()[:120]}")

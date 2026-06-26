with open(r'C:\Users\dell\.gemini\antigravity\brain\81792f8b-d4ea-4bce-be3d-d21289644190\.system_generated\steps\1068\content.md', 'r', encoding='utf-8') as f:
    for line in f:
        if 'dr.' in line.lower():
            print(line.strip()[:120])

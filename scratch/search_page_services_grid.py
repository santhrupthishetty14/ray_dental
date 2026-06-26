with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if 'service' in line.lower() and ('grid' in line.lower() or 'card' in line.lower() or 'map' in line.lower()):
        if idx > 150 and idx < 350:
            print(f"Line {idx+1}: {line.strip()[:100]}")

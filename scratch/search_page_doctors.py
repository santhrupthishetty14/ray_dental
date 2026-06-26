with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if 'doctor' in line.lower() or 'bio' in line.lower() or 'alexander' in line.lower():
        print(f"Line {idx+1}: {line.strip()[:100]}")

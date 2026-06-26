with open('src/app/services/[slug]/page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    for city in ['dubai', 'london', 'riyadh', 'beverly']:
        if city in line.lower():
            print(f"Line {idx+1}: {line.strip()[:120]}")
            break

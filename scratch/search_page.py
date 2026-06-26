with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if 'testimonial' in line.lower() or 'review' in line.lower():
        print(f"Line {idx+1}: {line.strip()[:100]}")

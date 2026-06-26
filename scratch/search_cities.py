import os

cities = ['dubai', 'riyadh', 'london', 'beverly']
files_to_check = []

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css')):
            files_to_check.append(os.path.join(root, file))

for filepath in files_to_check:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    for city in cities:
        if city in content.lower():
            print(f"Found '{city}' in {filepath}")

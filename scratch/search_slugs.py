with open('src/app/services/[slug]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import re
matches = re.findall(r'(\w+):\s*\{\s*title:', content)
print("Registry slugs:", matches)

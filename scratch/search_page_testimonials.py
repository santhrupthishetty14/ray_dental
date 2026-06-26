import json

log_path = r"C:\Users\dell\.gemini\antigravity\brain\81792f8b-d4ea-4bce-be3d-d21289644190\.system_generated\logs\transcript.jsonl"

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            for tc in step.get('tool_calls', []):
                args = tc.get('args', {})
                if 'page.tsx' in args.get('TargetFile', ''):
                    content = args.get('ReplacementContent') or args.get('CodeContent')
                    if content and 'testimonials' in content.lower():
                        print(f"Step {step.get('step_index')}:")
                        # find the blockquote or text color in content
                        lines = content.split('\n')
                        for l in lines:
                            if 'blockquote' in l or 'review' in l:
                                print(f"  {l.strip()}")
                        print("-" * 50)
        except Exception as e:
            pass

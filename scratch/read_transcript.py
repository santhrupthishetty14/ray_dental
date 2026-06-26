import json

log_path = r"C:\Users\dell\.gemini\antigravity\brain\81792f8b-d4ea-4bce-be3d-d21289644190\.system_generated\logs\transcript.jsonl"

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            if step.get('step_index') == 462:
                for tc in step['tool_calls']:
                    if 'page.tsx' in tc.get('args', {}).get('TargetFile', ''):
                        content = tc['args'].get('ReplacementContent') or tc['args'].get('CodeContent')
                        print(content[:2500])
        except Exception as e:
            pass

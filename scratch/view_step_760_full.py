import json

log_path = r"C:\Users\dell\.gemini\antigravity\brain\81792f8b-d4ea-4bce-be3d-d21289644190\.system_generated\logs\transcript.jsonl"

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            if step.get('step_index') == 760:
                print(json.dumps(step.get('tool_calls'), indent=2))
        except Exception as e:
            pass

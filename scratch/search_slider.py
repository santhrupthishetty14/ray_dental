import json
import os

log_path = r"C:\Users\dell\.gemini\antigravity\brain\81792f8b-d4ea-4bce-be3d-d21289644190\.system_generated\logs\transcript.jsonl"

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            tool_calls = step.get('tool_calls', [])
            for tc in tool_calls:
                args = tc.get('args', {})
                target = args.get('TargetFile', '')
                if 'BeforeAfterSlider' in target:
                    print(f"Step {step.get('step_index')}: Tool {tc.get('name')}")
                    # If it's a file write, print content snippet
                    content = args.get('CodeContent') or args.get('ReplacementContent')
                    if content:
                        print(content[:500])
                        print("=" * 40)
        except Exception as e:
            pass

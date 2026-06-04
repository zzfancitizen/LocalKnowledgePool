---
title: "extract_status_from_text"
tags:
  - treasury-agent/symbol
  - understand-anything
node_type: "function"
node_id: "function:app/supervisor/utils/stream_utils.py:extract_status_from_text"
source_path: "app/supervisor/utils/stream_utils.py"
---

# extract_status_from_text

extract_status_from_text 是 stream_utils.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。

- Type: `function`
- Parent file: [[Treasury Transaction Agent KG/Files/app-supervisor-utils-stream_utils.py-bf7c54b4|app/supervisor/utils/stream_utils.py]]
- Layer: [[Treasury Transaction Agent KG/Layers/Supervisor-c86198|Supervisor 编排层]]
- Complexity: `moderate`

## Tags

- #函数
- #Supervisor-编排

## Outgoing Symbol Links

- calls -> [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-stream_utils.py-try_parse_status-d9b430ce|app/supervisor/utils/stream_utils.py]]

## Incoming Symbol Links

- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-stream_utils.py-bf7c54b4|app/supervisor/utils/stream_utils.py]] -> contains
- [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-stream_utils.py-try_parse_status-d9b430ce|app/supervisor/utils/stream_utils.py]] -> calls
- [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-stream_utils.py-extract_agent_status-52829988|app/supervisor/utils/stream_utils.py]] -> calls

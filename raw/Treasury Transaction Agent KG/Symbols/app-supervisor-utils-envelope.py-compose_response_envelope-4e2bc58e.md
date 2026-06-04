---
title: "compose_response_envelope"
tags:
  - treasury-agent/symbol
  - understand-anything
node_type: "function"
node_id: "function:app/supervisor/utils/envelope.py:compose_response_envelope"
source_path: "app/supervisor/utils/envelope.py"
---

# compose_response_envelope

compose_response_envelope 是 envelope.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。

- Type: `function`
- Parent file: [[Treasury Transaction Agent KG/Files/app-supervisor-utils-envelope.py-0bb61fef|app/supervisor/utils/envelope.py]]
- Layer: [[Treasury Transaction Agent KG/Layers/Supervisor-c86198|Supervisor 编排层]]
- Complexity: `moderate`

## Tags

- #函数
- #Supervisor-编排

## Outgoing Symbol Links

- calls -> [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-envelope.py-_extract_content_strings-2c661948|app/supervisor/utils/envelope.py]]
- calls -> [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-envelope.py-_parse_dispatch_preview-63df9d18|app/supervisor/utils/envelope.py]]
- calls -> [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-envelope.py-_is_change_preview-08652323|app/supervisor/utils/envelope.py]]
- calls -> [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-envelope.py-_extract_amount_increase_proposal_items-fc81e413|app/supervisor/utils/envelope.py]]
- calls -> [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-envelope.py-_extract_premature_proposal_items-bd2296d3|app/supervisor/utils/envelope.py]]
- calls -> [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-envelope.py-_extract_business_case-3437b63b|app/supervisor/utils/envelope.py]]
- calls -> [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-envelope.py-_scan_forbidden-7543b297|app/supervisor/utils/envelope.py]]

## Incoming Symbol Links

- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-envelope.py-0bb61fef|app/supervisor/utils/envelope.py]] -> contains

---
title: "app/supervisor/utils/envelope.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/supervisor/utils/envelope.py"
source_path: "app/supervisor/utils/envelope.py"
---

# app/supervisor/utils/envelope.py

envelope.py 属于Supervisor 编排模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含8 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Supervisor-c86198|Supervisor 编排层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/supervisor/utils/envelope.py)

## Tags

- #supervisor
- #函数
- #Supervisor-编排

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-types.py-d07c9c6e|app/supervisor/types.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-stream_utils.py-bf7c54b4|app/supervisor/utils/stream_utils.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_envelope.py-02d3e34e|tests/supervisor/test_envelope.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-envelope.py-_extract_amount_increase_proposal_items-fc81e413|_extract_amount_increase_proposal_items]]: _extract_amount_increase_proposal_items 是 envelope.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-envelope.py-_extract_business_case-3437b63b|_extract_business_case]]: _extract_business_case 是 envelope.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-envelope.py-_extract_content_strings-2c661948|_extract_content_strings]]: _extract_content_strings 是 envelope.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-envelope.py-_extract_premature_proposal_items-bd2296d3|_extract_premature_proposal_items]]: _extract_premature_proposal_items 是 envelope.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-envelope.py-_is_change_preview-08652323|_is_change_preview]]: _is_change_preview 是 envelope.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-envelope.py-_parse_dispatch_preview-63df9d18|_parse_dispatch_preview]]: _parse_dispatch_preview 是 envelope.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-envelope.py-_scan_forbidden-7543b297|_scan_forbidden]]: _scan_forbidden 是 envelope.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-envelope.py-compose_response_envelope-4e2bc58e|compose_response_envelope]]: compose_response_envelope 是 envelope.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。

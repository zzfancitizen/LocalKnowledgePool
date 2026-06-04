---
title: "app/supervisor/utils/stream_utils.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/supervisor/utils/stream_utils.py"
source_path: "app/supervisor/utils/stream_utils.py"
---

# app/supervisor/utils/stream_utils.py

stream_utils.py 属于Supervisor 编排模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含6 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Supervisor-c86198|Supervisor 编排层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/supervisor/utils/stream_utils.py)

## Tags

- #supervisor
- #函数
- #Supervisor-编排

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-utils-envelope.py-0bb61fef|app/supervisor/utils/envelope.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-stream_utils.py-extract_agent_status-52829988|extract_agent_status]]: extract_agent_status 是 stream_utils.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-stream_utils.py-extract_message_from_json_response-86602273|extract_message_from_json_response]]: extract_message_from_json_response 是 stream_utils.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-stream_utils.py-extract_status_from_text-11ad1757|extract_status_from_text]]: extract_status_from_text 是 stream_utils.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-stream_utils.py-humanize_tool_name-0f7c4655|humanize_tool_name]]: humanize_tool_name 是 stream_utils.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-stream_utils.py-humanize_tool_result-46f4c287|humanize_tool_result]]: humanize_tool_result 是 stream_utils.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-stream_utils.py-try_parse_status-d9b430ce|try_parse_status]]: try_parse_status 是 stream_utils.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。

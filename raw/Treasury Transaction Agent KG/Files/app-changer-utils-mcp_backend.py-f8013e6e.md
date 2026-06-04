---
title: "app/changer/utils/mcp_backend.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/changer/utils/mcp_backend.py"
source_path: "app/changer/utils/mcp_backend.py"
---

# app/changer/utils/mcp_backend.py

mcp_backend.py 属于Changer 执行模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/changer/utils/mcp_backend.py)

## Tags

- #changer
- #mcp
- #函数
- #类

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-client.py-9a1132b2|app/providers/mcp/client.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-errors.py-d341e3fe|app/providers/mcp/errors.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-changer-utils-mcp_body.py-bcd9fd40|app/changer/utils/mcp_body.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-mcp_data_access.py-34803261|app/plugins/mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_mcp_backend_v4_write.py-fb89caf7|tests/changer/test_mcp_backend_v4_write.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_mcp_backend.py-5a93d178|tests/changer/test_mcp_backend.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access.py-4a9ac051|tests/plugins/test_mcp_data_access.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-changer-utils-mcp_backend.py-McpChangerBackend-68d9e178|McpChangerBackend]]: McpChangerBackend 是 mcp_backend.py 中的类，组织 Changer 执行 相关状态与行为，包含 7 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-changer-utils-mcp_backend.py-_parse_json_response-d54fc884|_parse_json_response]]: _parse_json_response 是 mcp_backend.py 中的函数，封装该文件在 Changer 执行 场景下的一段可复用处理逻辑。

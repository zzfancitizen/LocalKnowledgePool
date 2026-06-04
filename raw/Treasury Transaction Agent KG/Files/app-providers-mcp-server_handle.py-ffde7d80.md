---
title: "app/providers/mcp/server_handle.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/providers/mcp/server_handle.py"
source_path: "app/providers/mcp/server_handle.py"
---

# app/providers/mcp/server_handle.py

server_handle.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含3 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/providers/mcp/server_handle.py)

## Tags

- #mcp
- #函数
- #类
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-auth.py-1e32a7aa|app/providers/mcp/auth.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-client.py-9a1132b2|app/providers/mcp/client.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-config.py-d59585f9|app/providers/mcp/config.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-destination.py-639e463c|app/providers/mcp/destination.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-tool_factory.py-ecad45b0|app/providers/mcp/tool_factory.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-tool_schema.py-8d54c66f|app/providers/mcp/tool_schema.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_server_handle.py-987ce6e0|tests/providers/mcp/test_server_handle.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-mcp_data_access.py-34803261|app/plugins/mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access_multi_server.py-d7b8a414|tests/plugins/test_mcp_data_access_multi_server.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access.py-4a9ac051|tests/plugins/test_mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_resolver.py-f645ef3b|tests/plugins/test_resolver.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_server_handle.py-987ce6e0|tests/providers/mcp/test_server_handle.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-server_handle.py-ServerHandle-7ae72139|ServerHandle]]: ServerHandle 是 server_handle.py 中的类，组织 项目支撑 相关状态与行为。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-server_handle.py-_discover_schemas-439fadb8|_discover_schemas]]: _discover_schemas 是 server_handle.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-server_handle.py-_filter_schemas-0d32499e|_filter_schemas]]: _filter_schemas 是 server_handle.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-server_handle.py-build_server_handle-bd2eef8b|build_server_handle]]: build_server_handle 是 server_handle.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。

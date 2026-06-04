---
title: "app/providers/mcp/destination.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/providers/mcp/destination.py"
source_path: "app/providers/mcp/destination.py"
---

# app/providers/mcp/destination.py

destination.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含5 个函数、2 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/providers/mcp/destination.py)

## Tags

- #mcp
- #函数
- #类
- #tested

## Outgoing Links

- tested_by -> [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_destination.py-d24905ec|tests/providers/mcp/test_destination.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-mcp_data_access.py-34803261|app/plugins/mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-auth.py-1e32a7aa|app/providers/mcp/auth.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-server_handle.py-ffde7d80|app/providers/mcp/server_handle.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access_multi_server.py-d7b8a414|tests/plugins/test_mcp_data_access_multi_server.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access.py-4a9ac051|tests/plugins/test_mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_resolver.py-f645ef3b|tests/plugins/test_resolver.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_auth.py-409483d8|tests/providers/mcp/test_auth.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_destination_redaction.py-27f0f459|tests/providers/mcp/test_destination_redaction.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_destination.py-d24905ec|tests/providers/mcp/test_destination.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-destination.py-DestinationBinding-cf6c5fb1|DestinationBinding]]: DestinationBinding 是 destination.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-destination.py-ResolvedMcpDestination-d36314ae|ResolvedMcpDestination]]: ResolvedMcpDestination 是 destination.py 中的类，组织 项目支撑 相关状态与行为。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-destination.py-_read_from_env-9147e0fe|_read_from_env]]: _read_from_env 是 destination.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-destination.py-_read_from_files-0742fca5|_read_from_files]]: _read_from_files 是 destination.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-destination.py-fetch_destination_config-56322ff9|fetch_destination_config]]: fetch_destination_config 是 destination.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-destination.py-fetch_destination_service_token-50c1eae5|fetch_destination_service_token]]: fetch_destination_service_token 是 destination.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-destination.py-read_destination_binding-a46aabfc|read_destination_binding]]: read_destination_binding 是 destination.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。

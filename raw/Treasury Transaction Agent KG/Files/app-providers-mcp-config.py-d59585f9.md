---
title: "app/providers/mcp/config.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/providers/mcp/config.py"
source_path: "app/providers/mcp/config.py"
---

# app/providers/mcp/config.py

config.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含4 个函数、2 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/providers/mcp/config.py)

## Tags

- #mcp
- #函数
- #类
- #tested

## Outgoing Links

- tested_by -> [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_config.py-2eae1227|tests/providers/mcp/test_config.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-mcp_data_access.py-34803261|app/plugins/mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-server_handle.py-ffde7d80|app/providers/mcp/server_handle.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access_multi_server.py-d7b8a414|tests/plugins/test_mcp_data_access_multi_server.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access.py-4a9ac051|tests/plugins/test_mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_resolver.py-f645ef3b|tests/plugins/test_resolver.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_config.py-2eae1227|tests/providers/mcp/test_config.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_server_handle.py-987ce6e0|tests/providers/mcp/test_server_handle.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_tool_factory_multi_server.py-baf1d5e5|tests/providers/mcp/test_tool_factory_multi_server.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-config.py-McpServerConfig-1c8659a2|McpServerConfig]]: McpServerConfig 是 config.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-config.py-McpToolFilterConfig-1fd3281f|McpToolFilterConfig]]: McpToolFilterConfig 是 config.py 中的类，组织 项目支撑 相关状态与行为。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-config.py-_parse_tool_filter-706c943f|_parse_tool_filter]]: _parse_tool_filter 是 config.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-config.py-load_destination_instance_name-f42664e5|load_destination_instance_name]]: load_destination_instance_name 是 config.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-config.py-load_mcp_overrides-c2d26eff|load_mcp_overrides]]: load_mcp_overrides 是 config.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-config.py-load_mcp_servers-3df79eb0|load_mcp_servers]]: load_mcp_servers 是 config.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。

---
title: "app/plugins/mcp_data_access.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/plugins/mcp_data_access.py"
source_path: "app/plugins/mcp_data_access.py"
---

# app/plugins/mcp_data_access.py

mcp_data_access.py 属于插件系统模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/plugins/mcp_data_access.py)

## Tags

- #插件
- #mcp
- #类
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-changer-backend.py-5123a6cd|app/changer/backend.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-common-backend.py-fde4070b|app/common/backend.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-proposal-backend.py-70da5ddf|app/proposal/backend.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-client.py-9a1132b2|app/providers/mcp/client.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-config.py-d59585f9|app/providers/mcp/config.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-destination.py-639e463c|app/providers/mcp/destination.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-server_handle.py-ffde7d80|app/providers/mcp/server_handle.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-tool_schema.py-8d54c66f|app/providers/mcp/tool_schema.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-proposal-utils-mcp_backend.py-7ddb4f01|app/proposal/utils/mcp_backend.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-changer-utils-mcp_backend.py-f8013e6e|app/changer/utils/mcp_backend.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access.py-4a9ac051|tests/plugins/test_mcp_data_access.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access_multi_server.py-d7b8a414|tests/plugins/test_mcp_data_access_multi_server.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access.py-4a9ac051|tests/plugins/test_mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_resolver.py-f645ef3b|tests/plugins/test_resolver.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-plugins-mcp_data_access.py-McpDataAccessPlugin-8f31a001|McpDataAccessPlugin]]: McpDataAccessPlugin 是 mcp_data_access.py 中的类，组织 插件系统 相关状态与行为，包含 8 个方法。

---
title: "app/providers/mcp/tool_schema.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/providers/mcp/tool_schema.py"
source_path: "app/providers/mcp/tool_schema.py"
---

# app/providers/mcp/tool_schema.py

tool_schema.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `simple`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/providers/mcp/tool_schema.py)

## Tags

- #mcp
- #模型
- #函数
- #类
- #tested

## Outgoing Links

- tested_by -> [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_tool_schema.py-28397be9|tests/providers/mcp/test_tool_schema.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-mcp_data_access.py-34803261|app/plugins/mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-client.py-9a1132b2|app/providers/mcp/client.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-server_handle.py-ffde7d80|app/providers/mcp/server_handle.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-tool_factory.py-ecad45b0|app/providers/mcp/tool_factory.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access_multi_server.py-d7b8a414|tests/plugins/test_mcp_data_access_multi_server.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access.py-4a9ac051|tests/plugins/test_mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_client.py-ad4d6dfb|tests/providers/mcp/test_client.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_server_handle.py-987ce6e0|tests/providers/mcp/test_server_handle.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_tool_factory_multi_server.py-baf1d5e5|tests/providers/mcp/test_tool_factory_multi_server.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_tool_factory.py-3e84ee78|tests/providers/mcp/test_tool_factory.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_tool_schema.py-28397be9|tests/providers/mcp/test_tool_schema.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-tool_schema.py-McpToolSchema-216f9bc9|McpToolSchema]]: McpToolSchema 是 tool_schema.py 中的类，组织 项目支撑 相关状态与行为。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-tool_schema.py-format_for_prompt-369950bf|format_for_prompt]]: format_for_prompt 是 tool_schema.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。

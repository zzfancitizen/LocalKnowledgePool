---
title: "app/providers/mcp/tool_factory.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/providers/mcp/tool_factory.py"
source_path: "app/providers/mcp/tool_factory.py"
---

# app/providers/mcp/tool_factory.py

tool_factory.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含5 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/providers/mcp/tool_factory.py)

## Tags

- #mcp
- #函数
- #项目支撑
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-client.py-9a1132b2|app/providers/mcp/client.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-tool_schema.py-8d54c66f|app/providers/mcp/tool_schema.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_tool_factory.py-3e84ee78|tests/providers/mcp/test_tool_factory.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-providers-mcp-server_handle.py-ffde7d80|app/providers/mcp/server_handle.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_tool_factory_multi_server.py-baf1d5e5|tests/providers/mcp/test_tool_factory_multi_server.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_tool_factory.py-3e84ee78|tests/providers/mcp/test_tool_factory.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-tool_factory.py-_build_args_model-506d0b0d|_build_args_model]]: _build_args_model 是 tool_factory.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-tool_factory.py-_build_handler-d14ad255|_build_handler]]: _build_handler 是 tool_factory.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-tool_factory.py-_resolve_field_type-4a4a8546|_resolve_field_type]]: _resolve_field_type 是 tool_factory.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-tool_factory.py-build_mcp_langchain_tools-55eda380|build_mcp_langchain_tools]]: build_mcp_langchain_tools 是 tool_factory.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-tool_factory.py-normalize_name-26b8e690|normalize_name]]: normalize_name 是 tool_factory.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。

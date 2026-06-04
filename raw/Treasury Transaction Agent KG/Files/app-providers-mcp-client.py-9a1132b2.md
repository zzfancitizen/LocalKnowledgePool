---
title: "app/providers/mcp/client.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/providers/mcp/client.py"
source_path: "app/providers/mcp/client.py"
---

# app/providers/mcp/client.py

client.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含3 个函数、2 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/providers/mcp/client.py)

## Tags

- #mcp
- #函数
- #类
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-auth.py-1e32a7aa|app/providers/mcp/auth.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-errors.py-d341e3fe|app/providers/mcp/errors.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-tool_schema.py-8d54c66f|app/providers/mcp/tool_schema.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_client.py-ad4d6dfb|tests/providers/mcp/test_client.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-changer-utils-mcp_backend.py-f8013e6e|app/changer/utils/mcp_backend.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-plugins-mcp_data_access.py-34803261|app/plugins/mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-server_handle.py-ffde7d80|app/providers/mcp/server_handle.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-tool_factory.py-ecad45b0|app/providers/mcp/tool_factory.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_mcp_backend_v4_write.py-fb89caf7|tests/changer/test_mcp_backend_v4_write.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_mcp_backend.py-5a93d178|tests/changer/test_mcp_backend.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-common-tools-test_providers.py-9115664e|tests/common/tools/test_providers.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access.py-4a9ac051|tests/plugins/test_mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_client_log_redaction.py-734c397a|tests/providers/mcp/test_client_log_redaction.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_client.py-ad4d6dfb|tests/providers/mcp/test_client.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_no_output_validation_dict.py-b017f091|tests/providers/mcp/test_no_output_validation_dict.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-client.py-_NoOutputValidationDict-f1730e68|_NoOutputValidationDict]]: _NoOutputValidationDict 是 client.py 中的类，组织 项目支撑 相关状态与行为，包含 1 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-client.py-McpClient-12b72e9f|McpClient]]: McpClient 是 client.py 中的类，组织 项目支撑 相关状态与行为，包含 8 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-client.py-_create_session-f8066af4|_create_session]]: _create_session 是 client.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-client.py-_resolve_tool_timeout-ef928b2c|_resolve_tool_timeout]]: _resolve_tool_timeout 是 client.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-client.py-_summarize_response_for_log-9d3107c7|_summarize_response_for_log]]: _summarize_response_for_log 是 client.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。

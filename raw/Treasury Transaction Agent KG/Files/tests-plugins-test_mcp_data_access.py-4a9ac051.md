---
title: "tests/plugins/test_mcp_data_access.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:tests/plugins/test_mcp_data_access.py"
source_path: "tests/plugins/test_mcp_data_access.py"
---

# tests/plugins/test_mcp_data_access.py

test_mcp_data_access.py 属于测试模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含4 个函数、2 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-93ec47|评测与测试层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/tests/plugins/test_mcp_data_access.py)

## Tags

- #测试
- #插件
- #mcp
- #函数
- #类

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-contracts.py-042a0a4b|app/plugins/contracts.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-mcp_data_access.py-34803261|app/plugins/mcp_data_access.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-client.py-9a1132b2|app/providers/mcp/client.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-config.py-d59585f9|app/providers/mcp/config.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-destination.py-639e463c|app/providers/mcp/destination.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-server_handle.py-ffde7d80|app/providers/mcp/server_handle.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-tool_schema.py-8d54c66f|app/providers/mcp/tool_schema.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-proposal-backend.py-70da5ddf|app/proposal/backend.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-proposal-utils-mcp_backend.py-7ddb4f01|app/proposal/utils/mcp_backend.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-changer-backend.py-5123a6cd|app/changer/backend.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-changer-utils-mcp_backend.py-f8013e6e|app/changer/utils/mcp_backend.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-changer-utils-odata_backend.py-79fb87bf|app/changer/utils/odata_backend.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-mcp_data_access.py-34803261|app/plugins/mcp_data_access.py]] -> tested_by

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_mcp_data_access.py-TestMcpDataAccessPluginProtocol-eec4ad85|TestMcpDataAccessPluginProtocol]]: TestMcpDataAccessPluginProtocol 是 test_mcp_data_access.py 中的类，组织 测试 相关状态与行为，包含 4 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_mcp_data_access.py-TestMcpLangchainToolsExposure-7d0586cc|TestMcpLangchainToolsExposure]]: TestMcpLangchainToolsExposure 是 test_mcp_data_access.py 中的类，组织 测试 相关状态与行为，包含 2 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_mcp_data_access.py-_fake_binding-33c1953a|_fake_binding]]: _fake_binding 是 test_mcp_data_access.py 中的函数，封装该文件在 测试 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_mcp_data_access.py-_fake_handle-0645ab93|_fake_handle]]: _fake_handle 是 test_mcp_data_access.py 中的函数，封装该文件在 测试 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_mcp_data_access.py-_fake_server-f1bc7cc6|_fake_server]]: _fake_server 是 test_mcp_data_access.py 中的函数，封装该文件在 测试 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_mcp_data_access.py-_mock_mcp_infra-adcfff2a|_mock_mcp_infra]]: _mock_mcp_infra 是 test_mcp_data_access.py 中的函数，封装该文件在 测试 场景下的一段可复用处理逻辑。

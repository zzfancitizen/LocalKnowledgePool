---
title: "tests/providers/mcp/test_client.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:tests/providers/mcp/test_client.py"
source_path: "tests/providers/mcp/test_client.py"
---

# tests/providers/mcp/test_client.py

test_client.py 属于测试模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含6 个函数、6 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-93ec47|评测与测试层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/tests/providers/mcp/test_client.py)

## Tags

- #测试
- #mcp
- #函数
- #类

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-auth.py-1e32a7aa|app/providers/mcp/auth.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-client.py-9a1132b2|app/providers/mcp/client.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-errors.py-d341e3fe|app/providers/mcp/errors.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-tool_schema.py-8d54c66f|app/providers/mcp/tool_schema.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-providers-mcp-client.py-9a1132b2|app/providers/mcp/client.py]] -> tested_by

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/tests-providers-mcp-test_client.py-_FakeTokenProvider-51371022|_FakeTokenProvider]]: _FakeTokenProvider 是 test_client.py 中的类，组织 测试 相关状态与行为，包含 3 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-providers-mcp-test_client.py-TestCallTool-d9fd34c4|TestCallTool]]: TestCallTool 是 test_client.py 中的类，组织 测试 相关状态与行为，包含 17 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-providers-mcp-test_client.py-TestDiscoverTools-a30bf3d5|TestDiscoverTools]]: TestDiscoverTools 是 test_client.py 中的类，组织 测试 相关状态与行为，包含 3 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-providers-mcp-test_client.py-TestDiscoverToolsIsolated-9da757b0|TestDiscoverToolsIsolated]]: TestDiscoverToolsIsolated 是 test_client.py 中的类，组织 测试 相关状态与行为，包含 3 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-providers-mcp-test_client.py-TestFakeTokenProviderImplementsProtocol-bd5889f2|TestFakeTokenProviderImplementsProtocol]]: TestFakeTokenProviderImplementsProtocol 是 test_client.py 中的类，组织 测试 相关状态与行为，包含 1 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-providers-mcp-test_client.py-TestSessionPooling-9c28d7b5|TestSessionPooling]]: TestSessionPooling 是 test_client.py 中的类，组织 测试 相关状态与行为，包含 3 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/tests-providers-mcp-test_client.py-_async_cm-f1598699|_async_cm]]: _async_cm 是 test_client.py 中的函数，封装该文件在 测试 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/tests-providers-mcp-test_client.py-_make_call_result-c4943c52|_make_call_result]]: _make_call_result 是 test_client.py 中的函数，封装该文件在 测试 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/tests-providers-mcp-test_client.py-_make_provider-09e40a8d|_make_provider]]: _make_provider 是 test_client.py 中的函数，封装该文件在 测试 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/tests-providers-mcp-test_client.py-_make_tool-0ecc10f0|_make_tool]]: _make_tool 是 test_client.py 中的函数，封装该文件在 测试 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/tests-providers-mcp-test_client.py-_mock_session-1fbaea14|_mock_session]]: _mock_session 是 test_client.py 中的函数，封装该文件在 测试 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/tests-providers-mcp-test_client.py-_patch_pooled_session-9d219379|_patch_pooled_session]]: _patch_pooled_session 是 test_client.py 中的函数，封装该文件在 测试 场景下的一段可复用处理逻辑。

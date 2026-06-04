---
title: "app/providers/mcp/auth.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/providers/mcp/auth.py"
source_path: "app/providers/mcp/auth.py"
---

# app/providers/mcp/auth.py

auth.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含2 个函数、2 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/providers/mcp/auth.py)

## Tags

- #mcp
- #函数
- #类
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-destination.py-639e463c|app/providers/mcp/destination.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_auth.py-409483d8|tests/providers/mcp/test_auth.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-providers-mcp-client.py-9a1132b2|app/providers/mcp/client.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-server_handle.py-ffde7d80|app/providers/mcp/server_handle.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_auth.py-409483d8|tests/providers/mcp/test_auth.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_client.py-ad4d6dfb|tests/providers/mcp/test_client.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-auth.py-DestinationTokenProvider-2e7ae532|DestinationTokenProvider]]: DestinationTokenProvider 是 auth.py 中的类，组织 项目支撑 相关状态与行为，包含 5 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-auth.py-McpTokenProvider-418920a9|McpTokenProvider]]: McpTokenProvider 是 auth.py 中的类，组织 项目支撑 相关状态与行为，包含 2 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-auth.py-_is_token_expired-aad2568a|_is_token_expired]]: _is_token_expired 是 auth.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-auth.py-_is_token_near_expiry-2db6c31b|_is_token_near_expiry]]: _is_token_near_expiry 是 auth.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。

---
title: "app/providers/mcp/errors.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/providers/mcp/errors.py"
source_path: "app/providers/mcp/errors.py"
---

# app/providers/mcp/errors.py

errors.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `simple`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/providers/mcp/errors.py)

## Tags

- #mcp
- #类
- #项目支撑
- #tested

## Outgoing Links

- tested_by -> [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_errors.py-ab14a1f9|tests/providers/mcp/test_errors.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-changer-utils-mcp_backend.py-f8013e6e|app/changer/utils/mcp_backend.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-utils-mcp_backend.py-7ddb4f01|app/proposal/utils/mcp_backend.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-client.py-9a1132b2|app/providers/mcp/client.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_mcp_backend_v4_write.py-fb89caf7|tests/changer/test_mcp_backend_v4_write.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_client.py-ad4d6dfb|tests/providers/mcp/test_client.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_errors.py-ab14a1f9|tests/providers/mcp/test_errors.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-errors.py-McpToolError-f00e7cd3|McpToolError]]: McpToolError 是 errors.py 中的类，组织 项目支撑 相关状态与行为，包含 1 个方法。

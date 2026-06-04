---
title: "app/proposal/utils/mcp_backend.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/proposal/utils/mcp_backend.py"
source_path: "app/proposal/utils/mcp_backend.py"
---

# app/proposal/utils/mcp_backend.py

mcp_backend.py 属于Proposal 专家模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含4 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/proposal/utils/mcp_backend.py)

## Tags

- #proposal
- #mcp
- #函数
- #类

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-errors.py-d341e3fe|app/providers/mcp/errors.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-odata-params.py-864ac9a7|app/providers/odata/params.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-mcp_data_access.py-34803261|app/plugins/mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-response_builder.py-76a1a5e1|app/proposal/response_builder.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access.py-4a9ac051|tests/plugins/test_mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_mcp_backend_helpers.py-54f3ee55|tests/proposal/test_mcp_backend_helpers.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-proposal-utils-mcp_backend.py-McpProposalBackend-3f8365db|McpProposalBackend]]: McpProposalBackend 是 mcp_backend.py 中的类，组织 Proposal 专家 相关状态与行为，包含 2 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-utils-mcp_backend.py-_build_amount_increase_filter-7db1911b|_build_amount_increase_filter]]: _build_amount_increase_filter 是 mcp_backend.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-utils-mcp_backend.py-_build_premature_filter-0ca84b70|_build_premature_filter]]: _build_premature_filter 是 mcp_backend.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-utils-mcp_backend.py-_format_odata_date-058cc2c3|_format_odata_date]]: _format_odata_date 是 mcp_backend.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-utils-mcp_backend.py-_transform_deals-b0f5ca2d|_transform_deals]]: _transform_deals 是 mcp_backend.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。

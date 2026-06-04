---
title: "app/proposal/utils/odata.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/proposal/utils/odata.py"
source_path: "app/proposal/utils/odata.py"
---

# app/proposal/utils/odata.py

odata.py 属于Proposal 专家模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含4 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/proposal/utils/odata.py)

## Tags

- #proposal
- #odata
- #函数
- #类

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-providers-odata-params.py-864ac9a7|app/providers/odata/params.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-proposal-utils-odata_backend.py-4f9c2baf|app/proposal/utils/odata_backend.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-utils-odata_transform.py-e8db4898|app/proposal/utils/odata_transform.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_odata_import.py-e12b13ba|tests/proposal/test_odata_import.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_odata.py-8a91acec|tests/proposal/test_odata.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-proposal-utils-odata.py-ODataRequest-5b070754|ODataRequest]]: ODataRequest 是 odata.py 中的类，组织 Proposal 专家 相关状态与行为。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-utils-odata.py-build_amount_increase_filter-99825d9f|build_amount_increase_filter]]: build_amount_increase_filter 是 odata.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-utils-odata.py-build_amount_increase_path-e1ff7b7a|build_amount_increase_path]]: build_amount_increase_path 是 odata.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-utils-odata.py-build_premature_filter-354c7cdc|build_premature_filter]]: build_premature_filter 是 odata.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-utils-odata.py-build_premature_path-531039bc|build_premature_path]]: build_premature_path 是 odata.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。

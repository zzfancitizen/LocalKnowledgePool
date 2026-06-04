---
title: "app/proposal/utils/odata_transform.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/proposal/utils/odata_transform.py"
source_path: "app/proposal/utils/odata_transform.py"
---

# app/proposal/utils/odata_transform.py

odata_transform.py 属于Proposal 专家模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含3 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/proposal/utils/odata_transform.py)

## Tags

- #proposal
- #odata
- #函数

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-proposal-utils-odata.py-bf1df2ff|app/proposal/utils/odata.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-proposal-utils-odata_backend.py-4f9c2baf|app/proposal/utils/odata_backend.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_odata_import.py-e12b13ba|tests/proposal/test_odata_import.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_odata_transform.py-7b67b5c5|tests/proposal/test_odata_transform.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-utils-odata_transform.py-_format_odata_date-fc94acc7|_format_odata_date]]: _format_odata_date 是 odata_transform.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-utils-odata_transform.py-_format_v4_date-0c65bc5f|_format_v4_date]]: _format_v4_date 是 odata_transform.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-utils-odata_transform.py-transform_odata_deals-ed043710|transform_odata_deals]]: transform_odata_deals 是 odata_transform.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。

---
title: "app/supervisor/types.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/supervisor/types.py"
source_path: "app/supervisor/types.py"
---

# app/supervisor/types.py

types.py 属于Supervisor 编排模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含5 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Supervisor-c86198|Supervisor 编排层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/supervisor/types.py)

## Tags

- #supervisor
- #类
- #Supervisor-编排

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-envelope.py-0bb61fef|app/supervisor/utils/envelope.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_envelope.py-02d3e34e|tests/supervisor/test_envelope.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_supervisor_types.py-791ef556|tests/supervisor/test_supervisor_types.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-supervisor-types.py-ActionResult-4d7a9d39|ActionResult]]: ActionResult 是 types.py 中的类，组织 Supervisor 编排 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-supervisor-types.py-BusinessCase-323dc8d9|BusinessCase]]: BusinessCase 是 types.py 中的类，组织 Supervisor 编排 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-supervisor-types.py-ProposalItemAmountIncrease-df4ea5c8|ProposalItemAmountIncrease]]: ProposalItemAmountIncrease 是 types.py 中的类，组织 Supervisor 编排 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-supervisor-types.py-ProposalItemPremature-7eb7ca46|ProposalItemPremature]]: ProposalItemPremature 是 types.py 中的类，组织 Supervisor 编排 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-supervisor-types.py-SupervisorResponseEnvelope-63d6d764|SupervisorResponseEnvelope]]: SupervisorResponseEnvelope 是 types.py 中的类，组织 Supervisor 编排 相关状态与行为。

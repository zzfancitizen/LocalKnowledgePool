---
title: "app/proposal/types.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/proposal/types.py"
source_path: "app/proposal/types.py"
---

# app/proposal/types.py

types.py 属于Proposal 专家模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含5 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/proposal/types.py)

## Tags

- #proposal
- #类
- #Proposal-专家
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-proposal-test_types.py-5ccf12fb|tests/proposal/test_types.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-response_builder.py-76a1a5e1|app/proposal/response_builder.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_build_response.py-6462cd2a|tests/proposal/test_build_response.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_response_builder.py-8609d297|tests/proposal/test_response_builder.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_status_logging.py-f9b08376|tests/proposal/test_status_logging.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_structured_output.py-93453a65|tests/proposal/test_structured_output.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_types.py-5ccf12fb|tests/proposal/test_types.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-proposal-types.py-ProposalDealAmountIncrease-dca01a18|ProposalDealAmountIncrease]]: ProposalDealAmountIncrease 是 types.py 中的类，组织 Proposal 专家 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-proposal-types.py-ProposalDealPremature-a2533d53|ProposalDealPremature]]: ProposalDealPremature 是 types.py 中的类，组织 Proposal 专家 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-proposal-types.py-ProposalDetailAmountIncrease-28ad771e|ProposalDetailAmountIncrease]]: ProposalDetailAmountIncrease 是 types.py 中的类，组织 Proposal 专家 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-proposal-types.py-ProposalDetailPremature-94bd3084|ProposalDetailPremature]]: ProposalDetailPremature 是 types.py 中的类，组织 Proposal 专家 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-proposal-types.py-ProposalResponse-1dc2bd3a|ProposalResponse]]: ProposalResponse 是 types.py 中的类，组织 Proposal 专家 相关状态与行为。

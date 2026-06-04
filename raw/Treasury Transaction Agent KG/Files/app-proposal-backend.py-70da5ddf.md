---
title: "app/proposal/backend.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/proposal/backend.py"
source_path: "app/proposal/backend.py"
---

# app/proposal/backend.py

backend.py 属于Proposal 专家模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含2 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/proposal/backend.py)

## Tags

- #proposal
- #类
- #Proposal-专家
- #tested

## Outgoing Links

- tested_by -> [[Treasury Transaction Agent KG/Files/tests-proposal-test_backend.py-75622bad|tests/proposal/test_backend.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-contracts.py-042a0a4b|app/plugins/contracts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-plugins-mcp_data_access.py-34803261|app/plugins/mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-plugins-odata_data_access.py-489123f1|app/plugins/odata_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-plugins-stub_data_access.py-26659b47|app/plugins/stub_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_contracts.py-24748727|tests/plugins/test_contracts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access.py-4a9ac051|tests/plugins/test_mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_odata_data_access.py-bbc08ca0|tests/plugins/test_odata_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_plugin_wiring_integration.py-781d1cfa|tests/plugins/test_plugin_wiring_integration.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_stub_data_access.py-54c7f0bb|tests/plugins/test_stub_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_agent_backend_wiring.py-ee698dea|tests/proposal/test_agent_backend_wiring.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_backend.py-75622bad|tests/proposal/test_backend.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_odata_backend.py-4e50624b|tests/proposal/test_odata_backend.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_proposal_agent.py-02f26489|tests/proposal/test_proposal_agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_proposal_tool_logging.py-ee3f6645|tests/proposal/test_proposal_tool_logging.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_status_logging.py-f9b08376|tests/proposal/test_status_logging.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_structured_output.py-93453a65|tests/proposal/test_structured_output.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_build_tools_integration.py-6ebeddd6|tests/supervisor/test_build_tools_integration.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_cross_agent_consistency.py-f193d019|tests/test_cross_agent_consistency.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-proposal-backend.py-ProposalBackend-c6cf30e2|ProposalBackend]]: ProposalBackend 是 backend.py 中的类，组织 Proposal 专家 相关状态与行为，包含 1 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/app-proposal-backend.py-StubProposalBackend-1266b128|StubProposalBackend]]: StubProposalBackend 是 backend.py 中的类，组织 Proposal 专家 相关状态与行为，包含 1 个方法。

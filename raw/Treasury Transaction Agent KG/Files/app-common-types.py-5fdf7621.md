---
title: "app/common/types.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/common/types.py"
source_path: "app/common/types.py"
---

# app/common/types.py

types.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含10 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/common/types.py)

## Tags

- #类
- #项目支撑
- #python

## Outgoing Links

- none

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-agent_executor.py-87c591ed|app/agent_executor.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-agent.py-0db25f59|app/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-agent.py-339dc8e2|app/changer/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-tools-execute_amount_increase_tool.py-c65c9d86|app/changer/tools/execute_amount_increase_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-tools-execute_premature_repayment_tool.py-82847e41|app/changer/tools/execute_premature_repayment_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-tools-execute_premature_termination_tool.py-c9c043d3|app/changer/tools/execute_premature_termination_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-tools-preview_amount_increase_tool.py-6389d273|app/changer/tools/preview_amount_increase_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-tools-preview_premature_payment_tool.py-1c6ba98e|app/changer/tools/preview_premature_payment_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-types.py-6747f1fd|app/changer/types.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-utils-providers.py-743ba002|app/changer/utils/providers.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-common-__init__.py-64a4bc0f|app/common/__init__.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-core-context_store.py-0674d9bb|app/core/context_store.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-core-prompt_utils.py-eac8ca06|app/core/prompt_utils.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-core-skill_loader.py-5e57af7f|app/core/skill_loader.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-context_store.py-67955bfd|app/plugins/agent_memory/context_store.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-plugins-contracts.py-042a0a4b|app/plugins/contracts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-types.py-1546c3a4|app/proposal/types.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-dispatch_contract.py-11533792|app/supervisor/dispatch_contract.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-tools-context_tools.py-b9a85d61|app/supervisor/tools/context_tools.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-tools-dispatch_tools.py-c4c16ed4|app/supervisor/tools/dispatch_tools.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-types.py-d07c9c6e|app/supervisor/types.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-providers.py-9e5ebd0b|app/supervisor/utils/providers.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-stream_utils.py-bf7c54b4|app/supervisor/utils/stream_utils.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_agent.py-5897e92f|tests/changer/test_agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_execute_amount_increase_tool.py-0acd8869|tests/changer/test_execute_amount_increase_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_execute_premature_repayment_tool.py-e8077f4d|tests/changer/test_execute_premature_repayment_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_execute_premature_termination_tool.py-3df98d7b|tests/changer/test_execute_premature_termination_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_pending_cross_pod.py-095f50da|tests/changer/test_pending_cross_pod.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_preview_amount_increase_tool.py-b9232a20|tests/changer/test_preview_amount_increase_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_preview_premature_payment_tool.py-5f05c30b|tests/changer/test_preview_premature_payment_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-common-test_agent_status.py-78cbd953|tests/common/test_agent_status.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-common-test_case_context_pending.py-0e0858cf|tests/common/test_case_context_pending.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-common-test_case_context.py-ceaf6fcc|tests/common/test_case_context.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-core-test_prompt_utils.py-c6db4790|tests/core/test_prompt_utils.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-core-test_skill_header.py-e82b1706|tests/core/test_skill_header.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-agent_memory-test_context_store.py-f5f1a4aa|tests/plugins/agent_memory/test_context_store.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_agent_memory_wiring.py-57d91e62|tests/plugins/test_agent_memory_wiring.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_in_memory.py-86f58a86|tests/plugins/test_in_memory.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_plugin_wiring_integration.py-781d1cfa|tests/plugins/test_plugin_wiring_integration.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_extract_param.py-f8e50468|tests/proposal/test_extract_param.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_proposal_agent.py-02f26489|tests/proposal/test_proposal_agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-runtime-test_external_memory.py-81cd9087|tests/runtime/test_external_memory.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_awaiting_input_propagation.py-915ad6b7|tests/supervisor/test_awaiting_input_propagation.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_case_context_ttl.py-f40ccf06|tests/supervisor/test_case_context_ttl.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_context_tools.py-74c7fe9e|tests/supervisor/test_context_tools.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_dispatch_contract.py-1cf9e9e8|tests/supervisor/test_dispatch_contract.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_dispatch_logging.py-d0695fd7|tests/supervisor/test_dispatch_logging.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_in_process_dispatch.py-d06ecbd2|tests/supervisor/test_in_process_dispatch.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_invoke.py-ab52249d|tests/supervisor/test_invoke.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-tools-test_dispatch_tools_factory.py-9a1c03f5|tests/supervisor/tools/test_dispatch_tools_factory.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_proposal_dispatch_integration.py-a6daa3dc|tests/test_proposal_dispatch_integration.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-common-types.py-AgentResponse-c27b696f|AgentResponse]]: AgentResponse 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-common-types.py-AgentStatus-9c7579d5|AgentStatus]]: AgentStatus 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-common-types.py-AgentStreamEvent-d337770a|AgentStreamEvent]]: AgentStreamEvent 是 types.py 中的类，组织 项目支撑 相关状态与行为，包含 1 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/app-common-types.py-CaseContext-b9323d93|CaseContext]]: CaseContext 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-common-types.py-DispatchPlan-bd1377a6|DispatchPlan]]: DispatchPlan 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-common-types.py-PendingConfirmation-13b5ec5a|PendingConfirmation]]: PendingConfirmation 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-common-types.py-RuntimeModel-bde9bc18|RuntimeModel]]: RuntimeModel 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-common-types.py-RuntimeSkillDescriptor-f71dba32|RuntimeSkillDescriptor]]: RuntimeSkillDescriptor 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-common-types.py-RuntimeSkillDetail-1254d0fa|RuntimeSkillDetail]]: RuntimeSkillDetail 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-common-types.py-RuntimeSkillHeader-84bc4bed|RuntimeSkillHeader]]: RuntimeSkillHeader 是 types.py 中的类，组织 项目支撑 相关状态与行为。

---
title: "app/supervisor/agent.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/supervisor/agent.py"
source_path: "app/supervisor/agent.py"
---

# app/supervisor/agent.py

agent.py 属于Supervisor 编排模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含2 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Supervisor-c86198|Supervisor 编排层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/supervisor/agent.py)

## Tags

- #agent
- #supervisor
- #函数
- #类

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-utils-agent_tool_exposure.py-0690ae92|app/common/utils/agent_tool_exposure.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-common-utils-providers.py-b1bcea10|app/common/utils/providers.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-context_store.py-0674d9bb|app/core/context_store.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-skill_loader.py-5e57af7f|app/core/skill_loader.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-tool_registry.py-7fb3b648|app/core/tool_registry.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-dispatch_contract.py-11533792|app/supervisor/dispatch_contract.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-prompts.py-950721c4|app/supervisor/prompts.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-utils-dispatch_builder.py-9c1c8d99|app/supervisor/utils/dispatch_builder.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-utils-providers.py-9e5ebd0b|app/supervisor/utils/providers.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-utils-stream_utils.py-bf7c54b4|app/supervisor/utils/stream_utils.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-guardrails-enforcer.py-f978cafd|app/guardrails/enforcer.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-resolver.py-3a0d2707|app/plugins/resolver.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-contracts.py-042a0a4b|app/plugins/contracts.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-llm-router.py-d759664a|app/providers/llm/router.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-guardrails-types.py-cea6f6f7|app/guardrails/types.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-tools-context_tools.py-b9a85d61|app/supervisor/tools/context_tools.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-resilient_tool_node.py-91553aac|app/core/resilient_tool_node.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-message_trim.py-a18fab8e|app/core/message_trim.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-prompt_utils.py-eac8ca06|app/core/prompt_utils.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-observability.py-650ac986|app/core/observability.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-token_usage.py-00d0e35e|app/core/token_usage.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-utils-envelope.py-0bb61fef|app/supervisor/utils/envelope.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-agent_executor.py-87c591ed|app/agent_executor.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-agent.py-0db25f59|app/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-__init__.py-d9ab7150|app/supervisor/__init__.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_contracts.py-24748727|tests/plugins/test_contracts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_in_memory.py-86f58a86|tests/plugins/test_in_memory.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_agent_stream_attribution.py-5a177340|tests/supervisor/test_agent_stream_attribution.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_awaiting_input_propagation.py-915ad6b7|tests/supervisor/test_awaiting_input_propagation.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_build_tools_integration.py-6ebeddd6|tests/supervisor/test_build_tools_integration.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_call_model_timeout.py-1008f0dd|tests/supervisor/test_call_model_timeout.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_concurrent_isolation.py-e3c758af|tests/supervisor/test_concurrent_isolation.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_dispatch_target_resolution.py-1ec9cfb0|tests/supervisor/test_dispatch_target_resolution.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_extract_message_from_json.py-78e5623c|tests/supervisor/test_extract_message_from_json.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_invoke.py-ab52249d|tests/supervisor/test_invoke.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_loop_limits.py-e2f71ed9|tests/supervisor/test_loop_limits.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_memory.py-a48a4a44|tests/supervisor/test_memory.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_status_logging.py-8a3fdd04|tests/supervisor/test_status_logging.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_stream_humanize.py-5a6013e3|tests/supervisor/test_stream_humanize.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_stream_tool_logging.py-d837671f|tests/supervisor/test_stream_tool_logging.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_cross_agent_consistency.py-f193d019|tests/test_cross_agent_consistency.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_proposal_dispatch_integration.py-a6daa3dc|tests/test_proposal_dispatch_integration.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-supervisor-agent.py-SupervisorAgent-d5b303ab|SupervisorAgent]]: SupervisorAgent 是 agent.py 中的类，组织 Supervisor 编排 相关状态与行为，包含 12 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-agent.py-_resolve_dispatch_target_for_event-702155ec|_resolve_dispatch_target_for_event]]: _resolve_dispatch_target_for_event 是 agent.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-agent.py-_resolve_originating_agent_for_event-c98c1af8|_resolve_originating_agent_for_event]]: _resolve_originating_agent_for_event 是 agent.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。

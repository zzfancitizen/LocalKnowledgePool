---
title: "app/changer/backend.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/changer/backend.py"
source_path: "app/changer/backend.py"
---

# app/changer/backend.py

backend.py 属于Changer 执行模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含2 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/changer/backend.py)

## Tags

- #changer
- #类
- #Changer-执行
- #tested

## Outgoing Links

- tested_by -> [[Treasury Transaction Agent KG/Files/tests-changer-test_backend.py-46e759ee|tests/changer/test_backend.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-changer-agent.py-339dc8e2|app/changer/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-tools-execute_amount_increase_tool.py-c65c9d86|app/changer/tools/execute_amount_increase_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-tools-execute_premature_repayment_tool.py-82847e41|app/changer/tools/execute_premature_repayment_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-tools-execute_premature_termination_tool.py-c9c043d3|app/changer/tools/execute_premature_termination_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-utils-providers.py-743ba002|app/changer/utils/providers.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-plugins-contracts.py-042a0a4b|app/plugins/contracts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-plugins-mcp_data_access.py-34803261|app/plugins/mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-plugins-odata_data_access.py-489123f1|app/plugins/odata_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-plugins-stub_data_access.py-26659b47|app/plugins/stub_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_agent.py-5897e92f|tests/changer/test_agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_backend.py-46e759ee|tests/changer/test_backend.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_mcp_backend.py-5a93d178|tests/changer/test_mcp_backend.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_odata_backend.py-e2f68722|tests/changer/test_odata_backend.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_providers.py-6fc3efb2|tests/changer/test_providers.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_tool_registry.py-69e4c5d1|tests/changer/test_tool_registry.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_tools_logging.py-1ee36d1a|tests/changer/test_tools_logging.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_tools.py-b26e51d4|tests/changer/test_tools.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-common-test_backend.py-b51782e9|tests/common/test_backend.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_contracts.py-24748727|tests/plugins/test_contracts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access.py-4a9ac051|tests/plugins/test_mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_odata_data_access.py-bbc08ca0|tests/plugins/test_odata_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_plugin_wiring_integration.py-781d1cfa|tests/plugins/test_plugin_wiring_integration.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_stub_data_access.py-54c7f0bb|tests/plugins/test_stub_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_build_tools_integration.py-6ebeddd6|tests/supervisor/test_build_tools_integration.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_cross_agent_consistency.py-f193d019|tests/test_cross_agent_consistency.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-changer-backend.py-ChangerBackend-1b9af4b6|ChangerBackend]]: ChangerBackend 是 backend.py 中的类，组织 Changer 执行 相关状态与行为，包含 3 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/app-changer-backend.py-StubChangerBackend-f35eb6a5|StubChangerBackend]]: StubChangerBackend 是 backend.py 中的类，组织 Changer 执行 相关状态与行为，包含 3 个方法。

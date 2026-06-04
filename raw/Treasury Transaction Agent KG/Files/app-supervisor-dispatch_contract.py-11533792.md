---
title: "app/supervisor/dispatch_contract.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/supervisor/dispatch_contract.py"
source_path: "app/supervisor/dispatch_contract.py"
---

# app/supervisor/dispatch_contract.py

dispatch_contract.py 属于Supervisor 编排模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含3 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Supervisor-c86198|Supervisor 编排层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/supervisor/dispatch_contract.py)

## Tags

- #supervisor
- #类
- #Supervisor-编排
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-observability.py-650ac986|app/core/observability.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-supervisor-test_dispatch_contract.py-1cf9e9e8|tests/supervisor/test_dispatch_contract.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-tools-dispatch_tools.py-c4c16ed4|app/supervisor/tools/dispatch_tools.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-dispatch_builder.py-9c1c8d99|app/supervisor/utils/dispatch_builder.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-providers.py-9e5ebd0b|app/supervisor/utils/providers.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-common-test_tools.py-dee06386|tests/common/test_tools.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_build_tools_integration.py-6ebeddd6|tests/supervisor/test_build_tools_integration.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_dispatch_contract.py-1cf9e9e8|tests/supervisor/test_dispatch_contract.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_dispatch_logging.py-d0695fd7|tests/supervisor/test_dispatch_logging.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_in_process_dispatch.py-d06ecbd2|tests/supervisor/test_in_process_dispatch.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_stream_tool_logging.py-d837671f|tests/supervisor/test_stream_tool_logging.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_proposal_dispatch_integration.py-a6daa3dc|tests/test_proposal_dispatch_integration.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-supervisor-dispatch_contract.py-DispatchBackend-e287a5e3|DispatchBackend]]: DispatchBackend 是 dispatch_contract.py 中的类，组织 Supervisor 编排 相关状态与行为，包含 1 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/app-supervisor-dispatch_contract.py-InProcessDispatchBackend-f7885d40|InProcessDispatchBackend]]: InProcessDispatchBackend 是 dispatch_contract.py 中的类，组织 Supervisor 编排 相关状态与行为，包含 2 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/app-supervisor-dispatch_contract.py-NoopDispatchBackend-5ecf7904|NoopDispatchBackend]]: NoopDispatchBackend 是 dispatch_contract.py 中的类，组织 Supervisor 编排 相关状态与行为，包含 1 个方法。

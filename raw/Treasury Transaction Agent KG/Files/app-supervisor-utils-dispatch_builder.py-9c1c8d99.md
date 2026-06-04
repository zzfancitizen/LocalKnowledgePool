---
title: "app/supervisor/utils/dispatch_builder.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/supervisor/utils/dispatch_builder.py"
source_path: "app/supervisor/utils/dispatch_builder.py"
---

# app/supervisor/utils/dispatch_builder.py

dispatch_builder.py 属于Supervisor 编排模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Supervisor-c86198|Supervisor 编排层]]
- Complexity: `simple`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/supervisor/utils/dispatch_builder.py)

## Tags

- #supervisor
- #函数
- #Supervisor-编排

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-dispatch_contract.py-11533792|app/supervisor/dispatch_contract.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-changer-agent.py-339dc8e2|app/changer/agent.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-contracts.py-042a0a4b|app/plugins/contracts.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-in_memory.py-e45e1a33|app/plugins/in_memory.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_agent_memory_wiring.py-57d91e62|tests/plugins/test_agent_memory_wiring.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_sub_agent_memory_isolation.py-07d5efc4|tests/plugins/test_sub_agent_memory_isolation.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-runtime-test_external_memory.py-81cd9087|tests/runtime/test_external_memory.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-dispatch_builder.py-build_default_dispatch_backend-5ea81aff|build_default_dispatch_backend]]: build_default_dispatch_backend 是 dispatch_builder.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。

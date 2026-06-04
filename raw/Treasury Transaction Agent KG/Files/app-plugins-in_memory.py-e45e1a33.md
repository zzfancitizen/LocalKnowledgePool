---
title: "app/plugins/in_memory.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/plugins/in_memory.py"
source_path: "app/plugins/in_memory.py"
---

# app/plugins/in_memory.py

in_memory.py 属于插件系统模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含2 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `simple`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/plugins/in_memory.py)

## Tags

- #插件
- #记忆
- #类
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-core-checkpoint_eviction.py-67079dce|app/core/checkpoint_eviction.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-contracts.py-042a0a4b|app/plugins/contracts.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-context_store.py-0674d9bb|app/core/context_store.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-plugins-test_in_memory.py-86f58a86|tests/plugins/test_in_memory.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-dispatch_builder.py-9c1c8d99|app/supervisor/utils/dispatch_builder.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_in_memory.py-86f58a86|tests/plugins/test_in_memory.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_memory_isolation.py-925c2986|tests/plugins/test_memory_isolation.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_plugin_wiring_integration.py-781d1cfa|tests/plugins/test_plugin_wiring_integration.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_resolver.py-f645ef3b|tests/plugins/test_resolver.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_sub_agent_memory_isolation.py-07d5efc4|tests/plugins/test_sub_agent_memory_isolation.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-runtime-test_external_memory.py-81cd9087|tests/runtime/test_external_memory.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-plugins-in_memory.py-_FlushableMemorySaver-831f2a08|_FlushableMemorySaver]]: _FlushableMemorySaver 是 in_memory.py 中的类，组织 插件系统 相关状态与行为，包含 1 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/app-plugins-in_memory.py-InMemoryPlugin-edb2ce85|InMemoryPlugin]]: InMemoryPlugin 是 in_memory.py 中的类，组织 插件系统 相关状态与行为，包含 4 个方法。

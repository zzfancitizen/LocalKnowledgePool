---
title: "tests/plugins/test_in_memory.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:tests/plugins/test_in_memory.py"
source_path: "tests/plugins/test_in_memory.py"
---

# tests/plugins/test_in_memory.py

test_in_memory.py 属于测试模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含5 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-93ec47|评测与测试层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/tests/plugins/test_in_memory.py)

## Tags

- #测试
- #插件
- #记忆
- #类

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-checkpoint_eviction.py-67079dce|app/core/checkpoint_eviction.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-contracts.py-042a0a4b|app/plugins/contracts.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-in_memory.py-e45e1a33|app/plugins/in_memory.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-in_memory.py-e45e1a33|app/plugins/in_memory.py]] -> tested_by

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_in_memory.py-TestInMemoryPluginCheckpointer-b61cd35c|TestInMemoryPluginCheckpointer]]: TestInMemoryPluginCheckpointer 是 test_in_memory.py 中的类，组织 测试 相关状态与行为，包含 2 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_in_memory.py-TestInMemoryPluginCheckpointerIsolation-12db7310|TestInMemoryPluginCheckpointerIsolation]]: TestInMemoryPluginCheckpointerIsolation 是 test_in_memory.py 中的类，组织 测试 相关状态与行为，包含 2 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_in_memory.py-TestInMemoryPluginContextStore-4de556bd|TestInMemoryPluginContextStore]]: TestInMemoryPluginContextStore 是 test_in_memory.py 中的类，组织 测试 相关状态与行为，包含 6 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_in_memory.py-TestInMemoryPluginEvictor-393e3103|TestInMemoryPluginEvictor]]: TestInMemoryPluginEvictor 是 test_in_memory.py 中的类，组织 测试 相关状态与行为，包含 3 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_in_memory.py-TestInMemoryPluginProtocol-c7027c81|TestInMemoryPluginProtocol]]: TestInMemoryPluginProtocol 是 test_in_memory.py 中的类，组织 测试 相关状态与行为，包含 1 个方法。

---
title: "app/core/checkpoint_eviction.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/core/checkpoint_eviction.py"
source_path: "app/core/checkpoint_eviction.py"
---

# app/core/checkpoint_eviction.py

checkpoint_eviction.py 属于核心基础设施模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含2 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/core/checkpoint_eviction.py)

## Tags

- #函数
- #类
- #核心基础设施
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-core-observability.py-650ac986|app/core/observability.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-core-test_checkpoint_eviction.py-302ba4be|tests/core/test_checkpoint_eviction.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-in_memory.py-e45e1a33|app/plugins/in_memory.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-core-test_checkpoint_eviction.py-302ba4be|tests/core/test_checkpoint_eviction.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_contracts.py-24748727|tests/plugins/test_contracts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_in_memory.py-86f58a86|tests/plugins/test_in_memory.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-core-checkpoint_eviction.py-CheckpointEviction-e235ec2a|CheckpointEviction]]: CheckpointEviction 是 checkpoint_eviction.py 中的类，组织 核心基础设施 相关状态与行为，包含 4 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-checkpoint_eviction.py-_referenced_blob_keys-408a8280|_referenced_blob_keys]]: _referenced_blob_keys 是 checkpoint_eviction.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-checkpoint_eviction.py-_resolve_ttl-b5255d17|_resolve_ttl]]: _resolve_ttl 是 checkpoint_eviction.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。

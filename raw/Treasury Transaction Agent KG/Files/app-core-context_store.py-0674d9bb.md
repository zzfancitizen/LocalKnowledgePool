---
title: "app/core/context_store.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/core/context_store.py"
source_path: "app/core/context_store.py"
---

# app/core/context_store.py

context_store.py 属于核心基础设施模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/core/context_store.py)

## Tags

- #函数
- #类
- #核心基础设施

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-in_memory.py-e45e1a33|app/plugins/in_memory.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_case_context_ttl.py-f40ccf06|tests/supervisor/test_case_context_ttl.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-core-context_store.py-CaseContextStore-d9d3cd6c|CaseContextStore]]: CaseContextStore 是 context_store.py 中的类，组织 核心基础设施 相关状态与行为，包含 7 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-context_store.py-_resolve_context_ttl-9278401a|_resolve_context_ttl]]: _resolve_context_ttl 是 context_store.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。

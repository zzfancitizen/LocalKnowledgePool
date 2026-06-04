---
title: "app/core/dedup.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/core/dedup.py"
source_path: "app/core/dedup.py"
---

# app/core/dedup.py

dedup.py 属于核心基础设施模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/core/dedup.py)

## Tags

- #类
- #核心基础设施
- #python
- #tested

## Outgoing Links

- tested_by -> [[Treasury Transaction Agent KG/Files/tests-core-test_dedup.py-1fa9dacb|tests/core/test_dedup.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-main.py-ad934351|app/main.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-core-test_dedup.py-1fa9dacb|tests/core/test_dedup.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-core-dedup.py-RequestDeduplicator-1489d613|RequestDeduplicator]]: RequestDeduplicator 是 dedup.py 中的类，组织 核心基础设施 相关状态与行为，包含 5 个方法。

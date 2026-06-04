---
title: "app/providers/llm/types.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/providers/llm/types.py"
source_path: "app/providers/llm/types.py"
---

# app/providers/llm/types.py

types.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含3 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `simple`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/providers/llm/types.py)

## Tags

- #类
- #项目支撑
- #python
- #tested

## Outgoing Links

- tested_by -> [[Treasury Transaction Agent KG/Files/tests-providers-llm-test_types.py-60f8bd4e|tests/providers/llm/test_types.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-providers-llm-__init__.py-b40eba5a|app/providers/llm/__init__.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-providers-llm-config.py-4db7a115|app/providers/llm/config.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-providers-llm-router.py-d759664a|app/providers/llm/router.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-llm-test_config.py-05fa48c7|tests/providers/llm/test_config.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-llm-test_router.py-3689ef55|tests/providers/llm/test_router.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-llm-test_types.py-60f8bd4e|tests/providers/llm/test_types.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-providers-llm-types.py-ModelConfig-051ae8b2|ModelConfig]]: ModelConfig 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-providers-llm-types.py-ModelDeployment-937ffc27|ModelDeployment]]: ModelDeployment 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-providers-llm-types.py-RouterConfig-8259b152|RouterConfig]]: RouterConfig 是 types.py 中的类，组织 项目支撑 相关状态与行为。

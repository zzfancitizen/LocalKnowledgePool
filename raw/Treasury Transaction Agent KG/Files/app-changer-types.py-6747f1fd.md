---
title: "app/changer/types.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/changer/types.py"
source_path: "app/changer/types.py"
---

# app/changer/types.py

types.py 属于Changer 执行模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `simple`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/changer/types.py)

## Tags

- #changer
- #类
- #Changer-执行
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-changer-test_types.py-717ed9ee|tests/changer/test_types.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-changer-agent.py-339dc8e2|app/changer/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_agent.py-5897e92f|tests/changer/test_agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_types.py-717ed9ee|tests/changer/test_types.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-changer-types.py-ChangerResponse-aa658979|ChangerResponse]]: ChangerResponse 是 types.py 中的类，组织 Changer 执行 相关状态与行为。

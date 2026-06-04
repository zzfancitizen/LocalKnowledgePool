---
title: "app/supervisor/tools/context_tools.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/supervisor/tools/context_tools.py"
source_path: "app/supervisor/tools/context_tools.py"
---

# app/supervisor/tools/context_tools.py

context_tools.py 属于Supervisor 编排模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Supervisor-c86198|Supervisor 编排层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/supervisor/tools/context_tools.py)

## Tags

- #supervisor
- #函数
- #Supervisor-编排

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-tools-__init__.py-cbf72c08|app/supervisor/tools/__init__.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_context_tools.py-74c7fe9e|tests/supervisor/test_context_tools.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-tools-context_tools.py-create_update_case_context_tool-cee556ae|create_update_case_context_tool]]: create_update_case_context_tool 是 context_tools.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。

---
title: "app/supervisor/tools/dispatch_tools.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/supervisor/tools/dispatch_tools.py"
source_path: "app/supervisor/tools/dispatch_tools.py"
---

# app/supervisor/tools/dispatch_tools.py

dispatch_tools.py 属于Supervisor 编排模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Supervisor-c86198|Supervisor 编排层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/supervisor/tools/dispatch_tools.py)

## Tags

- #supervisor
- #函数
- #Supervisor-编排

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-dispatch_contract.py-11533792|app/supervisor/dispatch_contract.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-supervisor-tools-__init__.py-cbf72c08|app/supervisor/tools/__init__.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-providers.py-9e5ebd0b|app/supervisor/utils/providers.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-common-test_tools.py-dee06386|tests/common/test_tools.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-tools-test_dispatch_tools_factory.py-9a1c03f5|tests/supervisor/tools/test_dispatch_tools_factory.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_proposal_multiturn_integration.py-ac492a7e|tests/test_proposal_multiturn_integration.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-tools-dispatch_tools.py-create_dispatch_to_specialist_tool-eaafc7c0|create_dispatch_to_specialist_tool]]: create_dispatch_to_specialist_tool 是 dispatch_tools.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。

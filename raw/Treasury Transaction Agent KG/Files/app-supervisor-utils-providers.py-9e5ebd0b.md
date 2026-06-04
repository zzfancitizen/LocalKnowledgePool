---
title: "app/supervisor/utils/providers.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/supervisor/utils/providers.py"
source_path: "app/supervisor/utils/providers.py"
---

# app/supervisor/utils/providers.py

providers.py 属于Supervisor 编排模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Supervisor-c86198|Supervisor 编排层]]
- Complexity: `simple`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/supervisor/utils/providers.py)

## Tags

- #supervisor
- #函数
- #Supervisor-编排

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-dispatch_contract.py-11533792|app/supervisor/dispatch_contract.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-tools-dispatch_tools.py-c4c16ed4|app/supervisor/tools/dispatch_tools.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-tool_registry.py-7fb3b648|app/core/tool_registry.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-tools-test_providers.py-4d4fc8ce|tests/supervisor/tools/test_providers.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-supervisor-utils-providers.py-create_supervisor_tool_provider-b3af1749|create_supervisor_tool_provider]]: create_supervisor_tool_provider 是 providers.py 中的函数，封装该文件在 Supervisor 编排 场景下的一段可复用处理逻辑。

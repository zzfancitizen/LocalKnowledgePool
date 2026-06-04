---
title: "app/core/tool_registry.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/core/tool_registry.py"
source_path: "app/core/tool_registry.py"
---

# app/core/tool_registry.py

tool_registry.py 属于核心基础设施模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `simple`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/core/tool_registry.py)

## Tags

- #函数
- #类
- #核心基础设施
- #tested

## Outgoing Links

- tested_by -> [[Treasury Transaction Agent KG/Files/tests-core-test_tool_registry.py-1b23e239|tests/core/test_tool_registry.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-changer-agent.py-339dc8e2|app/changer/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-utils-providers.py-743ba002|app/changer/utils/providers.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-common-utils-providers.py-b1bcea10|app/common/utils/providers.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-providers.py-9e5ebd0b|app/supervisor/utils/providers.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-core-test_tool_registry.py-1b23e239|tests/core/test_tool_registry.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-core-tool_registry.py-ToolProvider-e608178c|ToolProvider]]: ToolProvider 是 tool_registry.py 中的类，组织 核心基础设施 相关状态与行为，包含 1 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-tool_registry.py-build_tools-f65e1c04|build_tools]]: build_tools 是 tool_registry.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。

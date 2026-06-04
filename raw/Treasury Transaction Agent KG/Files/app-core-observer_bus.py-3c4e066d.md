---
title: "app/core/observer_bus.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/core/observer_bus.py"
source_path: "app/core/observer_bus.py"
---

# app/core/observer_bus.py

observer_bus.py 属于核心基础设施模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个函数、2 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/core/observer_bus.py)

## Tags

- #函数
- #类
- #核心基础设施

## Outgoing Links

- none

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-agent_executor.py-87c591ed|app/agent_executor.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-main.py-ad934351|app/main.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-core-observer_bus.py-ObserverBus-25af2c33|ObserverBus]]: ObserverBus 是 observer_bus.py 中的类，组织 核心基础设施 相关状态与行为，包含 5 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/app-core-observer_bus.py-ObserverEvent-d281f320|ObserverEvent]]: ObserverEvent 是 observer_bus.py 中的类，组织 核心基础设施 相关状态与行为，包含 1 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-observer_bus.py-extract_sender_from_context_id-9c6a2f12|extract_sender_from_context_id]]: extract_sender_from_context_id 是 observer_bus.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。

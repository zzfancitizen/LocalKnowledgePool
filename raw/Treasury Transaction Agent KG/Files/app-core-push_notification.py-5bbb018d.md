---
title: "app/core/push_notification.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/core/push_notification.py"
source_path: "app/core/push_notification.py"
---

# app/core/push_notification.py

push_notification.py 属于核心基础设施模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/core/push_notification.py)

## Tags

- #类
- #核心基础设施
- #python

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-core-observability.py-650ac986|app/core/observability.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-main.py-ad934351|app/main.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_push_notification.py-bd5f37d7|tests/test_push_notification.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-core-push_notification.py-LoggingPushNotificationSender-fd7e5532|LoggingPushNotificationSender]]: LoggingPushNotificationSender 是 push_notification.py 中的类，组织 核心基础设施 相关状态与行为，包含 3 个方法。

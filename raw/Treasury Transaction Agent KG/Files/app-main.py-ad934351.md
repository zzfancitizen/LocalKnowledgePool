---
title: "app/main.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/main.py"
source_path: "app/main.py"
---

# app/main.py

main.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含7 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/A2A-473f1c|A2A 入口与协议层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/main.py)

## Tags

- #函数
- #类
- #项目支撑

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-agent_card.py-91337216|app/agent_card.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-agent_executor.py-87c591ed|app/agent_executor.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-dedup.py-6262656f|app/core/dedup.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-observer_bus.py-3c4e066d|app/core/observer_bus.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-push_notification.py-5bbb018d|app/core/push_notification.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-logging_config.py-ffc23900|app/logging_config.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-ord.py-39d3f931|app/ord.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/pyproject.toml-6730032d|pyproject.toml]] -> configures
- [[Treasury Transaction Agent KG/Files/Dockerfile-a03f956c|Dockerfile]] -> deploys
- [[Treasury Transaction Agent KG/Files/README.md-6e8b71dd|README.md]] -> documents
- [[Treasury Transaction Agent KG/Files/docs-adr-ADR-001-hitl-ticket-pattern-and-known-limits.md-a4395e72|docs/adr/ADR-001-hitl-ticket-pattern-and-known-limits.md]] -> documents
- [[Treasury Transaction Agent KG/Files/tests-test_push_notification.py-bd5f37d7|tests/test_push_notification.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-main.py-A2ARawBodyLoggerASGI-a333b656|A2ARawBodyLoggerASGI]]: A2ARawBodyLoggerASGI 是 main.py 中的类，组织 项目支撑 相关状态与行为，包含 2 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-main.py-_extract_text_from_parts-0b661b88|_extract_text_from_parts]]: _extract_text_from_parts 是 main.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-main.py-_get_header-2d41c06d|_get_header]]: _get_header 是 main.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-main.py-_observer_sse_generator-e76b1427|_observer_sse_generator]]: _observer_sse_generator 是 main.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-main.py-health_check-987f4442|health_check]]: health_check 是 main.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-main.py-main-4c198d4f|main]]: main 是 main.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-main.py-observer_events-773f2d9c|observer_events]]: observer_events 是 main.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-main.py-readiness_check-9f2fb74b|readiness_check]]: readiness_check 是 main.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。

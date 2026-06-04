---
title: "app/providers/llm/config.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/providers/llm/config.py"
source_path: "app/providers/llm/config.py"
---

# app/providers/llm/config.py

config.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含4 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/providers/llm/config.py)

## Tags

- #函数
- #项目支撑
- #python
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-providers-llm-types.py-931d833c|app/providers/llm/types.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-providers-llm-test_config.py-05fa48c7|tests/providers/llm/test_config.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-providers-llm-__init__.py-b40eba5a|app/providers/llm/__init__.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-providers-llm-router.py-d759664a|app/providers/llm/router.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-llm-test_config.py-05fa48c7|tests/providers/llm/test_config.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-llm-config.py-_config_from_env-ebc268d8|_config_from_env]]: _config_from_env 是 config.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-llm-config.py-_parse_yaml-c9e3c525|_parse_yaml]]: _parse_yaml 是 config.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-llm-config.py-_router_kwargs-af25ea33|_router_kwargs]]: _router_kwargs 是 config.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-llm-config.py-load_model_config-a510a541|load_model_config]]: load_model_config 是 config.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。

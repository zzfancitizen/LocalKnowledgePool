---
title: "_parse_yaml"
tags:
  - treasury-agent/symbol
  - understand-anything
node_type: "function"
node_id: "function:app/providers/llm/config.py:_parse_yaml"
source_path: "app/providers/llm/config.py"
---

# _parse_yaml

_parse_yaml 是 config.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。

- Type: `function`
- Parent file: [[Treasury Transaction Agent KG/Files/app-providers-llm-config.py-4db7a115|app/providers/llm/config.py]]
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`

## Tags

- #函数
- #项目支撑

## Outgoing Symbol Links

- calls -> [[Treasury Transaction Agent KG/Symbols/app-providers-llm-config.py-_router_kwargs-af25ea33|app/providers/llm/config.py]]

## Incoming Symbol Links

- [[Treasury Transaction Agent KG/Files/app-providers-llm-config.py-4db7a115|app/providers/llm/config.py]] -> contains
- [[Treasury Transaction Agent KG/Symbols/app-providers-llm-config.py-load_model_config-a510a541|app/providers/llm/config.py]] -> calls

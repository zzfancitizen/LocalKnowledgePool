---
title: "app/agent_card.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/agent_card.py"
source_path: "app/agent_card.py"
---

# app/agent_card.py

agent_card.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含2 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `simple`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/agent_card.py)

## Tags

- #agent
- #函数
- #项目支撑
- #tested

## Outgoing Links

- tested_by -> [[Treasury Transaction Agent KG/Files/tests-test_agent_card.py-e3adff06|tests/test_agent_card.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-main.py-ad934351|app/main.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_agent_card.py-e3adff06|tests/test_agent_card.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-agent_card.py-_derive_base_url-f312615d|_derive_base_url]]: _derive_base_url 是 agent_card.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-agent_card.py-load_and_enrich_agent_card-72c571a7|load_and_enrich_agent_card]]: load_and_enrich_agent_card 是 agent_card.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。

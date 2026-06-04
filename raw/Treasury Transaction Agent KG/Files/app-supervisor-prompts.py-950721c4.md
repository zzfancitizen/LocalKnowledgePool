---
title: "app/supervisor/prompts.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/supervisor/prompts.py"
source_path: "app/supervisor/prompts.py"
---

# app/supervisor/prompts.py

prompts.py 属于Supervisor 编排模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Supervisor-c86198|Supervisor 编排层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/supervisor/prompts.py)

## Tags

- #supervisor
- #类
- #Supervisor-编排
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-core-skill_loader.py-5e57af7f|app/core/skill_loader.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-guardrails-enforcer.py-f978cafd|app/guardrails/enforcer.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-supervisor-test_prompts.py-d3f9f46e|tests/supervisor/test_prompts.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_prompts.py-d3f9f46e|tests/supervisor/test_prompts.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-supervisor-prompts.py-PromptAssembler-bd4897eb|PromptAssembler]]: PromptAssembler 是 prompts.py 中的类，组织 Supervisor 编排 相关状态与行为，包含 2 个方法。

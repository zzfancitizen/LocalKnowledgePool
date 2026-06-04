---
title: "app/changer/prompts.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/changer/prompts.py"
source_path: "app/changer/prompts.py"
---

# app/changer/prompts.py

prompts.py 属于Changer 执行模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/changer/prompts.py)

## Tags

- #changer
- #类
- #Changer-执行
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-core-prompt_utils.py-eac8ca06|app/core/prompt_utils.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-skill_loader.py-5e57af7f|app/core/skill_loader.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-guardrails-enforcer.py-f978cafd|app/guardrails/enforcer.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-changer-test_prompts.py-e2fc834f|tests/changer/test_prompts.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-changer-agent.py-339dc8e2|app/changer/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_prompts.py-e2fc834f|tests/changer/test_prompts.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-changer-prompts.py-ChangerPromptAssembler-9c7d4314|ChangerPromptAssembler]]: ChangerPromptAssembler 是 prompts.py 中的类，组织 Changer 执行 相关状态与行为，包含 2 个方法。

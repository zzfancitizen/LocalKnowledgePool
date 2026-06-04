---
title: "app/proposal/prompts.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/proposal/prompts.py"
source_path: "app/proposal/prompts.py"
---

# app/proposal/prompts.py

prompts.py 属于Proposal 专家模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/proposal/prompts.py)

## Tags

- #proposal
- #类
- #Proposal-专家
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-core-prompt_utils.py-eac8ca06|app/core/prompt_utils.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-skill_loader.py-5e57af7f|app/core/skill_loader.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-guardrails-enforcer.py-f978cafd|app/guardrails/enforcer.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-proposal-test_prompts.py-7fc96e38|tests/proposal/test_prompts.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_prompts.py-7fc96e38|tests/proposal/test_prompts.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-proposal-prompts.py-ProposalPromptAssembler-7769e119|ProposalPromptAssembler]]: ProposalPromptAssembler 是 prompts.py 中的类，组织 Proposal 专家 相关状态与行为，包含 2 个方法。

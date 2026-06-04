---
title: "tests/supervisor/test_prompts.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:tests/supervisor/test_prompts.py"
source_path: "tests/supervisor/test_prompts.py"
---

# tests/supervisor/test_prompts.py

test_prompts.py 属于测试模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含4 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-93ec47|评测与测试层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/tests/supervisor/test_prompts.py)

## Tags

- #测试
- #supervisor
- #类

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-core-skill_loader.py-5e57af7f|app/core/skill_loader.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-prompts.py-950721c4|app/supervisor/prompts.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-guardrails-enforcer.py-f978cafd|app/guardrails/enforcer.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-supervisor-prompts.py-950721c4|app/supervisor/prompts.py]] -> tested_by

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/tests-supervisor-test_prompts.py-HitlExecutionLanguageHardRuleTests-7a4caab6|HitlExecutionLanguageHardRuleTests]]: HitlExecutionLanguageHardRuleTests 是 test_prompts.py 中的类，组织 测试 相关状态与行为，包含 9 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-supervisor-test_prompts.py-PromptAssemblerTests-234fc0c4|PromptAssemblerTests]]: PromptAssemblerTests 是 test_prompts.py 中的类，组织 测试 相关状态与行为，包含 14 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-supervisor-test_prompts.py-PureDispatcherRoleTests-b695295c|PureDispatcherRoleTests]]: PureDispatcherRoleTests 是 test_prompts.py 中的类，组织 测试 相关状态与行为，包含 8 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-supervisor-test_prompts.py-SupervisorMetadataFirstTests-bea551b3|SupervisorMetadataFirstTests]]: SupervisorMetadataFirstTests 是 test_prompts.py 中的类，组织 测试 相关状态与行为，包含 3 个方法。

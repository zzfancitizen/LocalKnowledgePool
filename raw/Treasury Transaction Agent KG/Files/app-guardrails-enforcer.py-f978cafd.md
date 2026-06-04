---
title: "app/guardrails/enforcer.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/guardrails/enforcer.py"
source_path: "app/guardrails/enforcer.py"
---

# app/guardrails/enforcer.py

enforcer.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/guardrails/enforcer.py)

## Tags

- #guardrail
- #类
- #项目支撑
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-guardrails-types.py-cea6f6f7|app/guardrails/types.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-guardrails-test_enforcer.py-1750337f|tests/guardrails/test_enforcer.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-changer-agent.py-339dc8e2|app/changer/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-prompts.py-245cc447|app/changer/prompts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-tools-preview_amount_increase_tool.py-6389d273|app/changer/tools/preview_amount_increase_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-tools-preview_premature_payment_tool.py-1c6ba98e|app/changer/tools/preview_premature_payment_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-utils-providers.py-743ba002|app/changer/utils/providers.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-common-tools-fetch_instrument_details_tool.py-4360dc63|app/common/tools/fetch_instrument_details_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-common-tools-python_sandbox_tool.py-cc0f8124|app/common/tools/python_sandbox_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-common-utils-providers.py-b1bcea10|app/common/utils/providers.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-prompts.py-7f27f9e7|app/proposal/prompts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-prompts.py-950721c4|app/supervisor/prompts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_preview_amount_increase_tool.py-b9232a20|tests/changer/test_preview_amount_increase_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_preview_premature_payment_tool.py-5f05c30b|tests/changer/test_preview_premature_payment_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-common-tools-test_python_sandbox_hardening.py-e87bd873|tests/common/tools/test_python_sandbox_hardening.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-common-tools-test_python_sandbox_tool.py-7b5a1a28|tests/common/tools/test_python_sandbox_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-guardrails-test_enforcer.py-1750337f|tests/guardrails/test_enforcer.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_loop_limits.py-e2f71ed9|tests/supervisor/test_loop_limits.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_prompts.py-d3f9f46e|tests/supervisor/test_prompts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_specialist_recursion_limits.py-bfc1d4a3|tests/test_specialist_recursion_limits.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-guardrails-enforcer.py-Enforcer-7ffe9694|Enforcer]]: Enforcer 是 enforcer.py 中的类，组织 项目支撑 相关状态与行为，包含 11 个方法。

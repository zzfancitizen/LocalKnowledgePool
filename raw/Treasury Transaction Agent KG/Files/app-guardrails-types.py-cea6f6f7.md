---
title: "app/guardrails/types.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/guardrails/types.py"
source_path: "app/guardrails/types.py"
---

# app/guardrails/types.py

types.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含10 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/guardrails/types.py)

## Tags

- #guardrail
- #类
- #项目支撑
- #tested

## Outgoing Links

- tested_by -> [[Treasury Transaction Agent KG/Files/tests-guardrails-test_types.py-ade4d5d3|tests/guardrails/test_types.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-common-tools-python_sandbox_tool.py-cc0f8124|app/common/tools/python_sandbox_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-guardrails-enforcer.py-f978cafd|app/guardrails/enforcer.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_preview_amount_increase_tool.py-b9232a20|tests/changer/test_preview_amount_increase_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_preview_premature_payment_tool.py-5f05c30b|tests/changer/test_preview_premature_payment_tool.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-core-test_resilient_tool_node.py-44584f86|tests/core/test_resilient_tool_node.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-guardrails-test_enforcer.py-1750337f|tests/guardrails/test_enforcer.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-guardrails-test_types.py-ade4d5d3|tests/guardrails/test_types.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-guardrails-types.py-ConfirmationTrigger-b68ab001|ConfirmationTrigger]]: ConfirmationTrigger 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-guardrails-types.py-DisabledByAgent-ceaae3ef|DisabledByAgent]]: DisabledByAgent 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-guardrails-types.py-Enforcement-201347af|Enforcement]]: Enforcement 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-guardrails-types.py-EnforcementLimits-78a2f6f6|EnforcementLimits]]: EnforcementLimits 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-guardrails-types.py-GuardrailConfig-ad693930|GuardrailConfig]]: GuardrailConfig 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-guardrails-types.py-GuardrailError-00a7f628|GuardrailError]]: GuardrailError 是 types.py 中的类，组织 项目支撑 相关状态与行为，包含 1 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/app-guardrails-types.py-GuardrailViolation-f4acda47|GuardrailViolation]]: GuardrailViolation 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-guardrails-types.py-IntentGuardrails-517ae336|IntentGuardrails]]: IntentGuardrails 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-guardrails-types.py-PromptRules-5604a913|PromptRules]]: PromptRules 是 types.py 中的类，组织 项目支撑 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-guardrails-types.py-SharedPromptRules-cb4338ac|SharedPromptRules]]: SharedPromptRules 是 types.py 中的类，组织 项目支撑 相关状态与行为。

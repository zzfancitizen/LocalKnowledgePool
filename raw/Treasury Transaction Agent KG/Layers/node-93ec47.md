---
title: "评测与测试层"
tags:
  - treasury-agent/layer
  - understand-anything
layer_id: "layer:quality"
node_count: 267
---

# 评测与测试层

覆盖 pytest、前端测试、Aeval 用例和回归场景，用于保护多轮代理行为。

> [!info]
> Layer notes are intentionally summaries. Open a file note for imports/incoming links, then open symbol notes for function/class-level detail when available.

## Most Connected Files

- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access.py-4a9ac051|tests/plugins/test_mcp_data_access.py]] (1 in / 12 out)
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_resolver.py-f645ef3b|tests/plugins/test_resolver.py]] (1 in / 10 out)
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_plugin_wiring_integration.py-781d1cfa|tests/plugins/test_plugin_wiring_integration.py]] (0 in / 10 out)
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_odata_data_access.py-bbc08ca0|tests/plugins/test_odata_data_access.py]] (1 in / 7 out)
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_agent_memory_wiring.py-57d91e62|tests/plugins/test_agent_memory_wiring.py]] (0 in / 8 out)
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_contracts.py-24748727|tests/plugins/test_contracts.py]] (1 in / 6 out)
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_in_memory.py-86f58a86|tests/plugins/test_in_memory.py]] (1 in / 5 out)
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_stub_data_access.py-54c7f0bb|tests/plugins/test_stub_data_access.py]] (1 in / 5 out)
- [[Treasury Transaction Agent KG/Files/tests-changer-test_agent.py-5897e92f|tests/changer/test_agent.py]] (1 in / 4 out)
- [[Treasury Transaction Agent KG/Files/tests-providers-mcp-test_client.py-ad4d6dfb|tests/providers/mcp/test_client.py]] (1 in / 4 out)
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_build_tools_integration.py-6ebeddd6|tests/supervisor/test_build_tools_integration.py]] (0 in / 6 out)
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access_multi_server.py-d7b8a414|tests/plugins/test_mcp_data_access_multi_server.py]] (0 in / 5 out)

## Files

- [[Treasury Transaction Agent KG/Files/aeval-configs-agent-config.yaml-598d344c|aeval/configs/agent-config.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-01_proposal_happy_path.yaml-8fabb8cc|aeval/testcases/correctness/01_proposal_happy_path.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-02_proposal_missing_params_asks_user.yaml-f58a1827|aeval/testcases/correctness/02_proposal_missing_params_asks_user.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-03_proposal_freetext_product_type_rejected.yaml-e26ecaf3|aeval/testcases/correctness/03_proposal_freetext_product_type_rejected.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-04_proposal_relative_date_resolved.yaml-fc45b9df|aeval/testcases/correctness/04_proposal_relative_date_resolved.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-05_proposal_vague_date_asks_user.yaml-11de95c8|aeval/testcases/correctness/05_proposal_vague_date_asks_user.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-06_routing_proposal_to_proposal_agent.yaml-f5831720|aeval/testcases/correctness/06_routing_proposal_to_proposal_agent.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-07_routing_change_to_change_agent.yaml-df2c4d52|aeval/testcases/correctness/07_routing_change_to_change_agent.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-08_changer_confirm_flow.yaml-1ef68a42|aeval/testcases/correctness/08_changer_confirm_flow.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-09_changer_missing_transaction_asks_user.yaml-310eb556|aeval/testcases/correctness/09_changer_missing_transaction_asks_user.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-10_changer_user_cancels.yaml-b05ae70c|aeval/testcases/correctness/10_changer_user_cancels.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-11_proposal_data_accuracy_no_rounding.yaml-a6312e6d|aeval/testcases/correctness/11_proposal_data_accuracy_no_rounding.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-12_proposal_optional_params_counterparty.yaml-4873b4df|aeval/testcases/correctness/12_proposal_optional_params_counterparty.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-13_proposal_optional_params_transaction_type.yaml-eca44f17|aeval/testcases/correctness/13_proposal_optional_params_transaction_type.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-14_changer_flow_type_from_fetch.yaml-46451ef7|aeval/testcases/correctness/14_changer_flow_type_from_fetch.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-15_response_no_raw_json_to_user.yaml-b54c6ae8|aeval/testcases/correctness/15_response_no_raw_json_to_user.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-16_proposal_followup_provides_missing_param.yaml-e0ce343a|aeval/testcases/correctness/16_proposal_followup_provides_missing_param.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-17_changer_missing_amount_asks_user.yaml-0c5331cd|aeval/testcases/correctness/17_changer_missing_amount_asks_user.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-18_unsupported_case_rejected.yaml-f0e5538e|aeval/testcases/correctness/18_unsupported_case_rejected.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-19_date_format_yyyy_mm_dd.yaml-c787d209|aeval/testcases/correctness/19_date_format_yyyy_mm_dd.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-correctness-20_multiple_missing_params_single_response.yaml-27b2060c|aeval/testcases/correctness/20_multiple_missing_params_single_response.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-digression-01_proposal_user_corrects_company_code.yaml-39ff1ec7|aeval/testcases/digression/01_proposal_user_corrects_company_code.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-digression-02_proposal_user_corrects_payment_date.yaml-420cef41|aeval/testcases/digression/02_proposal_user_corrects_payment_date.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-digression-03_proposal_user_corrects_product_type.yaml-71a7dd2c|aeval/testcases/digression/03_proposal_user_corrects_product_type.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-digression-04_changer_user_corrects_transaction_number.yaml-ffea66e5|aeval/testcases/digression/04_changer_user_corrects_transaction_number.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-digression-05_changer_user_corrects_amount_before_confirm.yaml-3a2bdac2|aeval/testcases/digression/05_changer_user_corrects_amount_before_confirm.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-digression-06_changer_user_corrects_payment_date_before_confirm.yaml-ac343f65|aeval/testcases/digression/06_changer_user_corrects_payment_date_before_confirm.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-digression-07_proposal_to_change_flow_switch.yaml-03b4e454|aeval/testcases/digression/07_proposal_to_change_flow_switch.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-digression-08_off_topic_question_mid_proposal.yaml-e6286ab5|aeval/testcases/digression/08_off_topic_question_mid_proposal.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-digression-09_changer_corrects_multiple_params_at_once.yaml-811b353f|aeval/testcases/digression/09_changer_corrects_multiple_params_at_once.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-digression-10_proposal_user_changes_currency.yaml-0d8f888a|aeval/testcases/digression/10_proposal_user_changes_currency.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-digression-11_changer_cancel_then_restart.yaml-d3e96282|aeval/testcases/digression/11_changer_cancel_then_restart.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-digression-12_proposal_user_changes_amount_and_redoes.yaml-d3c292b6|aeval/testcases/digression/12_proposal_user_changes_amount_and_redoes.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-hallucination-01_proposal_missing_company_code_no_hallucination.yaml-15e5f489|aeval/testcases/hallucination/01_proposal_missing_company_code_no_hallucination.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-hallucination-02_proposal_missing_product_type_no_hallucination.yaml-0d9121d6|aeval/testcases/hallucination/02_proposal_missing_product_type_no_hallucination.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-hallucination-03_proposal_missing_currency_no_hallucination.yaml-888ffe1d|aeval/testcases/hallucination/03_proposal_missing_currency_no_hallucination.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-hallucination-04_proposal_missing_payment_date_no_hallucination.yaml-5ba4b293|aeval/testcases/hallucination/04_proposal_missing_payment_date_no_hallucination.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-hallucination-05_proposal_freetext_loan_not_accepted_as_product_type.yaml-1bd7c408|aeval/testcases/hallucination/05_proposal_freetext_loan_not_accepted_as_product_type.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-hallucination-06_proposal_freetext_deposit_not_accepted_as_product_type.ya-e74dfdcd|aeval/testcases/hallucination/06_proposal_freetext_deposit_not_accepted_as_product_type.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-hallucination-07_proposal_freetext_intercompany_loan_not_accepted.yaml-001dc146|aeval/testcases/hallucination/07_proposal_freetext_intercompany_loan_not_accepted.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-hallucination-08_changer_missing_transaction_no_hallucination.yaml-1ddd340d|aeval/testcases/hallucination/08_changer_missing_transaction_no_hallucination.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-hallucination-09_changer_missing_company_code_no_hallucination.yaml-3ebed764|aeval/testcases/hallucination/09_changer_missing_company_code_no_hallucination.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-hallucination-10_changer_missing_amount_no_hallucination.yaml-d512f9cf|aeval/testcases/hallucination/10_changer_missing_amount_no_hallucination.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-hallucination-11_proposal_no_extra_deals_hallucinated.yaml-2a972a24|aeval/testcases/hallucination/11_proposal_no_extra_deals_hallucinated.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-hallucination-12_proposal_no_hallucinated_rates_or_amounts.yaml-8c071f62|aeval/testcases/hallucination/12_proposal_no_hallucinated_rates_or_amounts.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-hallucination-13_proposal_all_mandatory_missing_no_hallucination.yaml-3f49d70c|aeval/testcases/hallucination/13_proposal_all_mandatory_missing_no_hallucination.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-hallucination-14_changer_no_hallucinated_flow_type.yaml-5db37ac0|aeval/testcases/hallucination/14_changer_no_hallucinated_flow_type.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-hallucination-15_no_hallucinated_capabilities.yaml-01cd01e2|aeval/testcases/hallucination/15_no_hallucinated_capabilities.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-hallucination-16_proposal_vague_date_no_hallucination.yaml-c92b2cf3|aeval/testcases/hallucination/16_proposal_vague_date_no_hallucination.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-memory-01_proposal_remembers_company_code.yaml-b3d463b6|aeval/testcases/memory/01_proposal_remembers_company_code.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-memory-02_proposal_remembers_currency_and_amount.yaml-663ba2e8|aeval/testcases/memory/02_proposal_remembers_currency_and_amount.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-memory-03_proposal_remembers_across_three_turns.yaml-eb10fe57|aeval/testcases/memory/03_proposal_remembers_across_three_turns.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-memory-04_changer_remembers_company_and_transaction.yaml-57bfc3a6|aeval/testcases/memory/04_changer_remembers_company_and_transaction.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-memory-05_proposal_remembers_optional_counterparty.yaml-50fa4673|aeval/testcases/memory/05_proposal_remembers_optional_counterparty.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-memory-06_proposal_to_change_remembers_context.yaml-c0188a1b|aeval/testcases/memory/06_proposal_to_change_remembers_context.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-memory-07_changer_remembers_after_off_topic.yaml-f629a84a|aeval/testcases/memory/07_changer_remembers_after_off_topic.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-memory-08_proposal_remembers_corrected_value.yaml-11f79d28|aeval/testcases/memory/08_proposal_remembers_corrected_value.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-memory-09_changer_remembers_confirmation_details.yaml-7d0059fc|aeval/testcases/memory/09_changer_remembers_confirmation_details.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-memory-10_proposal_remembers_transaction_type_across_turns.yaml-47674fb5|aeval/testcases/memory/10_proposal_remembers_transaction_type_across_turns.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-memory-11_external_memory_proposal_session_persists_across_turns.yaml-34245555|aeval/testcases/memory/11_external_memory_proposal_session_persists_across_turns.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-memory-12_external_memory_changer_session_persists_after_confirmation.yaml-b67d31b2|aeval/testcases/memory/12_external_memory_changer_session_persists_after_confirmation.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-memory-13_external_memory_context_store_proposal_to_changer.yaml-94cb0249|aeval/testcases/memory/13_external_memory_context_store_proposal_to_changer.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-memory-14_external_memory_five_turn_accumulation.yaml-3b89816f|aeval/testcases/memory/14_external_memory_five_turn_accumulation.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-memory-15_external_memory_changer_remembers_across_off_topic_digression.ya-e1f607a4|aeval/testcases/memory/15_external_memory_changer_remembers_across_off_topic_digression.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-memory-16_external_memory_proposal_corrected_value_persists.yaml-a86d03af|aeval/testcases/memory/16_external_memory_proposal_corrected_value_persists.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-safety-02_unsupported_case_premature_rejected.yaml-d2bea789|aeval/testcases/safety/02_unsupported_case_premature_rejected.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-safety-03_change_without_confirmation_blocked.yaml-de51d207|aeval/testcases/safety/03_change_without_confirmation_blocked.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-safety-04_system_prompt_leak_rejected.yaml-31bc6018|aeval/testcases/safety/04_system_prompt_leak_rejected.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-safety-05_prompt_injection_ignore_instructions.yaml-55d885a8|aeval/testcases/safety/05_prompt_injection_ignore_instructions.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-safety-06_sandbox_os_import_blocked.yaml-ff70cc97|aeval/testcases/safety/06_sandbox_os_import_blocked.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-safety-07_sandbox_subprocess_blocked.yaml-a51f811f|aeval/testcases/safety/07_sandbox_subprocess_blocked.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-safety-08_sandbox_file_open_blocked.yaml-3bbd7547|aeval/testcases/safety/08_sandbox_file_open_blocked.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-safety-09_data_access_outside_scope_rejected.yaml-3c00216e|aeval/testcases/safety/09_data_access_outside_scope_rejected.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-safety-10_fabricate_data_rejected.yaml-da4d47d4|aeval/testcases/safety/10_fabricate_data_rejected.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-safety-11_prompt_injection_via_tool_params.yaml-c0a2c9b4|aeval/testcases/safety/11_prompt_injection_via_tool_params.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-safety-12_sandbox_pickle_import_blocked.yaml-af231e74|aeval/testcases/safety/12_sandbox_pickle_import_blocked.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-safety-13_change_immutable_params_after_confirm_rejected.yaml-704246a7|aeval/testcases/safety/13_change_immutable_params_after_confirm_rejected.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-safety-14_jailbreak_roleplay_rejected.yaml-633f87b4|aeval/testcases/safety/14_jailbreak_roleplay_rejected.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-safety-15_sandbox_getattr_blocked.yaml-aa1896bb|aeval/testcases/safety/15_sandbox_getattr_blocked.yaml]]
- [[Treasury Transaction Agent KG/Files/aeval-testcases-safety-16_internal_config_leak_via_tool_rejected.yaml-98aeee32|aeval/testcases/safety/16_internal_config_leak_via_tool_rejected.yaml]]

_还有 187 个节点未在此列表展开；完整关系可在 Canvas 和文件笔记中浏览。_


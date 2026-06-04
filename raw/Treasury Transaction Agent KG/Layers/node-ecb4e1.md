---
title: "运行时基础层"
tags:
  - treasury-agent/layer
  - understand-anything
layer_id: "layer:runtime-foundation"
node_count: 58
---

# 运行时基础层

提供上下文存储、LLM 路由、插件解析、MCP/OData/记忆后端和通用运行时支撑。

> [!info]
> Layer notes are intentionally summaries. Open a file note for imports/incoming links, then open symbol notes for function/class-level detail when available.

## Most Connected Files

- [[Treasury Transaction Agent KG/Files/app-core-skill_loader.py-5e57af7f|app/core/skill_loader.py]] (25 in / 2 out)
- [[Treasury Transaction Agent KG/Files/app-guardrails-enforcer.py-f978cafd|app/guardrails/enforcer.py]] (20 in / 2 out)
- [[Treasury Transaction Agent KG/Files/app-plugins-contracts.py-042a0a4b|app/plugins/contracts.py]] (15 in / 5 out)
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-client.py-9a1132b2|app/providers/mcp/client.py]] (11 in / 4 out)
- [[Treasury Transaction Agent KG/Files/app-core-observability.py-650ac986|app/core/observability.py]] (11 in / 2 out)
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-tool_schema.py-8d54c66f|app/providers/mcp/tool_schema.py]] (11 in / 1 out)
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-destination.py-639e463c|app/providers/mcp/destination.py]] (9 in / 1 out)
- [[Treasury Transaction Agent KG/Files/app-plugins-in_memory.py-e45e1a33|app/plugins/in_memory.py]] (7 in / 4 out)
- [[Treasury Transaction Agent KG/Files/app-plugins-resolver.py-3a0d2707|app/plugins/resolver.py]] (8 in / 2 out)
- [[Treasury Transaction Agent KG/Files/app-guardrails-types.py-cea6f6f7|app/guardrails/types.py]] (8 in / 1 out)
- [[Treasury Transaction Agent KG/Files/app-plugins-mcp_data_access.py-34803261|app/plugins/mcp_data_access.py]] (3 in / 11 out)
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-config.py-d59585f9|app/providers/mcp/config.py]] (8 in / 1 out)

## Files

- [[Treasury Transaction Agent KG/Files/app-__init__.py-3a195c2b|app/__init__.py]]
- [[Treasury Transaction Agent KG/Files/app-agent_card.py-91337216|app/agent_card.py]]
- [[Treasury Transaction Agent KG/Files/app-agent.py-0db25f59|app/agent.py]]
- [[Treasury Transaction Agent KG/Files/app-core-__init__.py-14a9f6d1|app/core/__init__.py]]
- [[Treasury Transaction Agent KG/Files/app-core-checkpoint_eviction.py-67079dce|app/core/checkpoint_eviction.py]]
- [[Treasury Transaction Agent KG/Files/app-core-context_store.py-0674d9bb|app/core/context_store.py]]
- [[Treasury Transaction Agent KG/Files/app-core-dedup.py-6262656f|app/core/dedup.py]]
- [[Treasury Transaction Agent KG/Files/app-core-message_trim.py-a18fab8e|app/core/message_trim.py]]
- [[Treasury Transaction Agent KG/Files/app-core-observability.py-650ac986|app/core/observability.py]]
- [[Treasury Transaction Agent KG/Files/app-core-observer_bus.py-3c4e066d|app/core/observer_bus.py]]
- [[Treasury Transaction Agent KG/Files/app-core-prompt_utils.py-eac8ca06|app/core/prompt_utils.py]]
- [[Treasury Transaction Agent KG/Files/app-core-push_notification.py-5bbb018d|app/core/push_notification.py]]
- [[Treasury Transaction Agent KG/Files/app-core-resilient_tool_node.py-91553aac|app/core/resilient_tool_node.py]]
- [[Treasury Transaction Agent KG/Files/app-core-skill_loader.py-5e57af7f|app/core/skill_loader.py]]
- [[Treasury Transaction Agent KG/Files/app-core-token_usage.py-00d0e35e|app/core/token_usage.py]]
- [[Treasury Transaction Agent KG/Files/app-core-tool_registry.py-7fb3b648|app/core/tool_registry.py]]
- [[Treasury Transaction Agent KG/Files/app-guardrails-__init__.py-4f695046|app/guardrails/__init__.py]]
- [[Treasury Transaction Agent KG/Files/app-guardrails-config.yaml-eaa4f601|app/guardrails/config.yaml]]
- [[Treasury Transaction Agent KG/Files/app-guardrails-enforcer.py-f978cafd|app/guardrails/enforcer.py]]
- [[Treasury Transaction Agent KG/Files/app-guardrails-types.py-cea6f6f7|app/guardrails/types.py]]
- [[Treasury Transaction Agent KG/Files/app-logging_config.py-ffc23900|app/logging_config.py]]
- [[Treasury Transaction Agent KG/Files/app-ord.py-39d3f931|app/ord.py]]
- [[Treasury Transaction Agent KG/Files/app-plugins-__init__.py-ffae23d9|app/plugins/__init__.py]]
- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-__init__.py-58193335|app/plugins/agent_memory/__init__.py]]
- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-cache.py-d1efbeb7|app/plugins/agent_memory/cache.py]]
- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-client.py-01bd0b07|app/plugins/agent_memory/client.py]]
- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-context_store.py-67955bfd|app/plugins/agent_memory/context_store.py]]
- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-evictor.py-d869e38c|app/plugins/agent_memory/evictor.py]]
- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-hybrid_checkpointer.py-3b8741f3|app/plugins/agent_memory/hybrid_checkpointer.py]]
- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-message_converter.py-84e5706a|app/plugins/agent_memory/message_converter.py]]
- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-plugin.py-fac2cca7|app/plugins/agent_memory/plugin.py]]
- [[Treasury Transaction Agent KG/Files/app-plugins-contracts.py-042a0a4b|app/plugins/contracts.py]]
- [[Treasury Transaction Agent KG/Files/app-plugins-in_memory.py-e45e1a33|app/plugins/in_memory.py]]
- [[Treasury Transaction Agent KG/Files/app-plugins-mcp_data_access.py-34803261|app/plugins/mcp_data_access.py]]
- [[Treasury Transaction Agent KG/Files/app-plugins-odata_data_access.py-489123f1|app/plugins/odata_data_access.py]]
- [[Treasury Transaction Agent KG/Files/app-plugins-resolver.py-3a0d2707|app/plugins/resolver.py]]
- [[Treasury Transaction Agent KG/Files/app-plugins-stub_data_access.py-26659b47|app/plugins/stub_data_access.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-__init__.py-5d7aa17e|app/providers/__init__.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-llm-__init__.py-b40eba5a|app/providers/llm/__init__.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-llm-config.py-4db7a115|app/providers/llm/config.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-llm-router.py-d759664a|app/providers/llm/router.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-llm-types.py-931d833c|app/providers/llm/types.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-__init__.py-4dba1452|app/providers/mcp/__init__.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-auth.py-1e32a7aa|app/providers/mcp/auth.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-client.py-9a1132b2|app/providers/mcp/client.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-config.py-d59585f9|app/providers/mcp/config.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-destination.py-639e463c|app/providers/mcp/destination.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-errors.py-d341e3fe|app/providers/mcp/errors.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-server_handle.py-ffde7d80|app/providers/mcp/server_handle.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-tool_factory.py-ecad45b0|app/providers/mcp/tool_factory.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-mcp-tool_schema.py-8d54c66f|app/providers/mcp/tool_schema.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-odata-__init__.py-853ff73e|app/providers/odata/__init__.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-odata-errors.py-5ef52640|app/providers/odata/errors.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-odata-http_helpers.py-19fdfc80|app/providers/odata/http_helpers.py]]
- [[Treasury Transaction Agent KG/Files/app-providers-odata-params.py-864ac9a7|app/providers/odata/params.py]]
- [[Treasury Transaction Agent KG/Files/pyproject.toml-6730032d|pyproject.toml]]
- [[Treasury Transaction Agent KG/Files/requirements-copy.txt-9783e7d1|requirements copy.txt]]
- [[Treasury Transaction Agent KG/Files/requirements.txt-eb768155|requirements.txt]]

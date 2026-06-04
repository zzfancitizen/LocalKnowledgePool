---
title: "前端与 Joule 集成层"
tags:
  - treasury-agent/layer
  - understand-anything
layer_id: "layer:frontend-joule"
node_count: 44
---

# 前端与 Joule 集成层

覆盖本地聊天前端、Joule 能力描述、A2A 布局函数和用户可见展示结构。

> [!info]
> Layer notes are intentionally summaries. Open a file note for imports/incoming links, then open symbol notes for function/class-level detail when available.

## Most Connected Files

- [[Treasury Transaction Agent KG/Files/frontend-src-App.jsx-eecb924c|frontend/src/App.jsx]] (2 in / 15 out)
- [[Treasury Transaction Agent KG/Files/frontend-src-services-a2aClient.js-6db179e3|frontend/src/services/a2aClient.js]] (4 in / 2 out)
- [[Treasury Transaction Agent KG/Files/frontend-src-utils-logger.js-99159f18|frontend/src/utils/logger.js]] (4 in / 2 out)
- [[Treasury Transaction Agent KG/Files/frontend-src-utils-logStore.js-575deed1|frontend/src/utils/logStore.js]] (5 in / 0 out)
- [[Treasury Transaction Agent KG/Files/frontend-src-components-ChatMessage.jsx-c911b75f|frontend/src/components/ChatMessage.jsx]] (2 in / 3 out)
- [[Treasury Transaction Agent KG/Files/frontend-src-components-ThinkingSteps.jsx-5c46a079|frontend/src/components/ThinkingSteps.jsx]] (3 in / 0 out)
- [[Treasury Transaction Agent KG/Files/frontend-src-utils-ids.js-a1b7bc4f|frontend/src/utils/ids.js]] (3 in / 0 out)
- [[Treasury Transaction Agent KG/Files/frontend-src-components-DebugPanel.jsx-825803af|frontend/src/components/DebugPanel.jsx]] (2 in / 1 out)
- [[Treasury Transaction Agent KG/Files/frontend-src-App.css-f1a1ab5d|frontend/src/App.css]] (2 in / 0 out)
- [[Treasury Transaction Agent KG/Files/frontend-src-components-ChatInput.jsx-ff370283|frontend/src/components/ChatInput.jsx]] (2 in / 0 out)
- [[Treasury Transaction Agent KG/Files/frontend-src-components-StatusIndicator.jsx-64eb27aa|frontend/src/components/StatusIndicator.jsx]] (2 in / 0 out)
- [[Treasury Transaction Agent KG/Files/frontend-src-services-observerClient.js-8ef6e551|frontend/src/services/observerClient.js]] (1 in / 2 out)

## Files

- [[Treasury Transaction Agent KG/Files/frontend-.claude-settings.local.json-95c99eec|frontend/.claude/settings.local.json]]
- [[Treasury Transaction Agent KG/Files/frontend-index.html-06f6d5b6|frontend/index.html]]
- [[Treasury Transaction Agent KG/Files/frontend-package.json-a720ff06|frontend/package.json]]
- [[Treasury Transaction Agent KG/Files/frontend-src-App.css-f1a1ab5d|frontend/src/App.css]]
- [[Treasury Transaction Agent KG/Files/frontend-src-App.jsx-eecb924c|frontend/src/App.jsx]]
- [[Treasury Transaction Agent KG/Files/frontend-src-components-ChatInput.jsx-ff370283|frontend/src/components/ChatInput.jsx]]
- [[Treasury Transaction Agent KG/Files/frontend-src-components-ChatMessage.jsx-c911b75f|frontend/src/components/ChatMessage.jsx]]
- [[Treasury Transaction Agent KG/Files/frontend-src-components-DebugPanel.jsx-825803af|frontend/src/components/DebugPanel.jsx]]
- [[Treasury Transaction Agent KG/Files/frontend-src-components-ErrorCard.jsx-d2cfeb6e|frontend/src/components/ErrorCard.jsx]]
- [[Treasury Transaction Agent KG/Files/frontend-src-components-ShellBar.jsx-70dc64d6|frontend/src/components/ShellBar.jsx]]
- [[Treasury Transaction Agent KG/Files/frontend-src-components-StatusIndicator.jsx-64eb27aa|frontend/src/components/StatusIndicator.jsx]]
- [[Treasury Transaction Agent KG/Files/frontend-src-components-ThinkingSteps.jsx-5c46a079|frontend/src/components/ThinkingSteps.jsx]]
- [[Treasury Transaction Agent KG/Files/frontend-src-components-WelcomeBanner.jsx-5e75ea41|frontend/src/components/WelcomeBanner.jsx]]
- [[Treasury Transaction Agent KG/Files/frontend-src-main.jsx-5f0eb509|frontend/src/main.jsx]]
- [[Treasury Transaction Agent KG/Files/frontend-src-services-a2aClient.js-6db179e3|frontend/src/services/a2aClient.js]]
- [[Treasury Transaction Agent KG/Files/frontend-src-services-notificationService.js-1538d61c|frontend/src/services/notificationService.js]]
- [[Treasury Transaction Agent KG/Files/frontend-src-services-observerClient.js-8ef6e551|frontend/src/services/observerClient.js]]
- [[Treasury Transaction Agent KG/Files/frontend-src-utils-exportChat.js-730709fc|frontend/src/utils/exportChat.js]]
- [[Treasury Transaction Agent KG/Files/frontend-src-utils-ids.js-a1b7bc4f|frontend/src/utils/ids.js]]
- [[Treasury Transaction Agent KG/Files/frontend-src-utils-logger.js-99159f18|frontend/src/utils/logger.js]]
- [[Treasury Transaction Agent KG/Files/frontend-src-utils-logStore.js-575deed1|frontend/src/utils/logStore.js]]
- [[Treasury Transaction Agent KG/Files/frontend-src-utils-parseEnvelope.js-5ad3d2d5|frontend/src/utils/parseEnvelope.js]]
- [[Treasury Transaction Agent KG/Files/frontend-src-utils-stepFilter.js-76a8f4fb|frontend/src/utils/stepFilter.js]]
- [[Treasury Transaction Agent KG/Files/frontend-src-utils-svgSanitizer.js-08498bc1|frontend/src/utils/svgSanitizer.js]]
- [[Treasury Transaction Agent KG/Files/frontend-test-k8s-App.multipod.jsx-3d5c14d0|frontend/test-k8s/App.multipod.jsx]]
- [[Treasury Transaction Agent KG/Files/frontend-test-k8s-index.html-b1d0f494|frontend/test-k8s/index.html]]
- [[Treasury Transaction Agent KG/Files/frontend-test-k8s-main.multipod.jsx-552c156b|frontend/test-k8s/main.multipod.jsx]]
- [[Treasury Transaction Agent KG/Files/frontend-test-k8s-PodSwitcher.jsx-78cf2be9|frontend/test-k8s/PodSwitcher.jsx]]
- [[Treasury Transaction Agent KG/Files/frontend-test-k8s-vite.config.multipod.js-65882596|frontend/test-k8s/vite.config.multipod.js]]
- [[Treasury Transaction Agent KG/Files/frontend-vite.config.js-a44ccd72|frontend/vite.config.js]]
- [[Treasury Transaction Agent KG/Files/frontend-vitest.config.js-ccc9fb5e|frontend/vitest.config.js]]
- [[Treasury Transaction Agent KG/Files/joule-a2a-capability_context.yaml-2627f9bf|joule/a2a/capability_context.yaml]]
- [[Treasury Transaction Agent KG/Files/joule-a2a-capability.sapdas.yaml-e42f87f7|joule/a2a/capability.sapdas.yaml]]
- [[Treasury Transaction Agent KG/Files/joule-a2a-functions-agent_invoke.yaml-162ce012|joule/a2a/functions/agent_invoke.yaml]]
- [[Treasury Transaction Agent KG/Files/joule-a2a-functions-layout-display_change_result.yaml-0a33c52b|joule/a2a/functions/layout/display_change_result.yaml]]
- [[Treasury Transaction Agent KG/Files/joule-a2a-functions-layout-display_confirm.yaml-cc2e1cb0|joule/a2a/functions/layout/display_confirm.yaml]]
- [[Treasury Transaction Agent KG/Files/joule-a2a-functions-layout-display_proposal.yaml-2aa9322c|joule/a2a/functions/layout/display_proposal.yaml]]
- [[Treasury Transaction Agent KG/Files/joule-a2a-functions-treasury_trans_agent_helper.yaml-9d15fcd6|joule/a2a/functions/treasury_trans_agent_helper.yaml]]
- [[Treasury Transaction Agent KG/Files/joule-a2a-i18n-messages.properties-bf864854|joule/a2a/i18n/messages.properties]]
- [[Treasury Transaction Agent KG/Files/joule-a2a-scenarios-treasury_trans_agent_helper.yaml-8eaeb797|joule/a2a/scenarios/treasury_trans_agent_helper.yaml]]
- [[Treasury Transaction Agent KG/Files/joule-a2a-scenarios-treasury_trans_agent.yaml-06a2f5be|joule/a2a/scenarios/treasury_trans_agent.yaml]]
- [[Treasury Transaction Agent KG/Files/joule-ai_assistants-treasury_assistant-ai_assistant.sapdas.yaml-485c3b71|joule/ai_assistants/treasury_assistant/ai_assistant.sapdas.yaml]]
- [[Treasury Transaction Agent KG/Files/joule-ai_assistants-treasury_assistant-i18n-en.properties-f594ac06|joule/ai_assistants/treasury_assistant/i18n/en.properties]]
- [[Treasury Transaction Agent KG/Files/joule-da.sapdas.yaml-0b0f7b5f|joule/da.sapdas.yaml]]

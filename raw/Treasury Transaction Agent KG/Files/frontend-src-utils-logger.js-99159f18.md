---
title: "frontend/src/utils/logger.js"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:frontend/src/utils/logger.js"
source_path: "frontend/src/utils/logger.js"
---

# frontend/src/utils/logger.js

logger.js 属于前端界面模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含3 个函数、2 个导入。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Joule-8f7633|前端与 Joule 集成层]]
- Complexity: `simple`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/frontend/src/utils/logger.js)

## Tags

- #函数
- #前端界面
- #javascript

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/frontend-src-utils-logStore.js-575deed1|frontend/src/utils/logStore.js]]
- imports -> [[Treasury Transaction Agent KG/Files/frontend-src-utils-ids.js-a1b7bc4f|frontend/src/utils/ids.js]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/frontend-src-App.jsx-eecb924c|frontend/src/App.jsx]] -> imports
- [[Treasury Transaction Agent KG/Files/frontend-src-services-a2aClient.js-6db179e3|frontend/src/services/a2aClient.js]] -> imports
- [[Treasury Transaction Agent KG/Files/frontend-src-services-observerClient.js-8ef6e551|frontend/src/services/observerClient.js]] -> imports
- [[Treasury Transaction Agent KG/Files/frontend-src-test-logger.test.js-dd94308a|frontend/src/test/logger.test.js]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/frontend-src-utils-logger.js-createLogger-a75a6ce2|createLogger]]: createLogger 是 logger.js 中的函数，封装该文件在 前端界面 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/frontend-src-utils-logger.js-formatLogLine-c8c37400|formatLogLine]]: formatLogLine 是 logger.js 中的函数，封装该文件在 前端界面 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/frontend-src-utils-logger.js-truncate-afde648f|truncate]]: truncate 是 logger.js 中的函数，封装该文件在 前端界面 场景下的一段可复用处理逻辑。

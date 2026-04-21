---
title: "hooks配置"
source: "https://qcnvsrti2g6b.feishu.cn/docx/ByyJdMFQxoFVAtxuVZHcz5N9nje"
author:
published:
created: 2026-04-21
description:
tags:
  - "clippings"
---
hooks：强制触发

claude.md/skill有一定概率

Code block

你现在是 Claude Code 配置专家。请为我生成一个 \*\*PostToolUse Hook\*\*，配置在peronal层级，功能是：

每次 Claude 使用 Write、Edit、MultiEdit 等工具成功修改文件后，自动执行项目的 Lint + 格式化命令（例如 prettier / eslint --fix / gofmt / rustfmt 等）。

要求：

\- 使用 matcher: "Write|Edit|MultiEdit"

\- hook 类型用 command（推荐）

\- 命令要支持常见前端/后端工具，如果检测不到就 fallback 到 echo "格式化完成"

\- 输出完整的 settings.json 片段（只包含 hooks 部分）

\- 额外提供一个可选的 safety.sh 脚本示例（防止 Lint 命令本身出错导致卡死）

\- 告诉我如何根据我的项目语言（React/Vue/Go/Rust/Python 等）修改命令

请直接输出可复制的 JSON 代码块，并标注「复制到.claude/settings.json」。

Code block

你现在是 Claude Code 配置专家。请为我生成一个 \*\*Notification Hook\*\*，配置在peronal层级，功能是：

每次 Claude 需要用户输入（permission\_prompt）或任务完成/空闲等待（idle\_prompt）时，自动弹出桌面通知（macOS 用 osascript，Windows 用 powershell，Linux 用 notify-send）。

要求：

\- 使用 matcher: "permission\_prompt|idle\_prompt"

\- 支持跨平台（macOS / Windows / Linux 自动适配）

\- 通知标题为「Claude Code」，内容清晰（例如「需要你的输入」或「任务已完成」）

\- 输出完整的 settings.json 片段（只包含 hooks 部分）

\- 额外告诉我如何测试这个 hook

请直接输出可复制的 JSON 代码块，并标注「复制到.claude/settings.json」。

Code block

你现在是 Claude Code 配置专家。请为我生成一个 \*\*PreToolUse Hook\*\*（安全拦截），配置在peronal层级，功能是：

在 Claude 执行任何 Bash / Edit / Write 操作前，检查是否包含危险命令或操作（例如 rm -rf /、删除重要文件、修改.env、git reset --hard 等），如果检测到则直接拦截并提示原因。

要求：

\- 使用 matcher: "Bash|Write|Edit|MultiEdit"

\- hook 类型为 command

\- 提供一个独立的 safety.sh 脚本（放在 ~/.claude/hooks/ 或项目目录），脚本接收输入并用 exit 2 拦截

\- 拦截规则要可扩展（用户可自行加规则）

\- 输出完整的 settings.json 片段 + safety.sh 完整脚本

\- 额外说明如何让 hook 在团队中共享

请直接输出可复制的 JSON + 脚本代码块，并标注「复制到.claude/settings.json」。

Code block

你现在是 Claude Code 配置专家。请为我生成一个 \*\*Stop Hook\*\*（持续工作模式），配置在peronal层级，功能是：

在开发完整项目时，每次 Claude 想结束响应（Stop）前，先检查当前开发计划或 TODO list（例如.claude/tasks/plan.md 或 CLAUDE.md 中的 TODO），判断是否所有任务都完成；如果还有未完成项，则自动「block」停止，继续执行下一项任务。

要求：

\- 使用 Stop 事件（支持 prompt 类型 hook 最合适）

\- prompt 让 Claude（推荐用 Haiku）判断任务完成度，返回 {"decision": "approve"} 或 {"decision": "block", "reason": "..."}

\- 支持读取外部 TODO 文件（cat.claude/tasks/current.md）

\- 结合 PostToolUse 也可以在编辑后立即跑测试

\- 输出完整的 settings.json 片段 + 示例 plan.md 结构

\- 告诉我如何在项目中维护 TODO list 让 hook 效果最佳

请直接输出可复制的 JSON 代码块，并标注「复制到.claude/settings.json」。

0 words

- Help Center

- Keyboard Shortcuts
---
title: "Hooks Configuration"
source: "https://qcnvsrti2g6b.feishu.cn/docx/ByyJdMFQxoFVAtxuVZHcz5N9nje"
author:
published:
created: 2026-04-21
description:
tags:
  - "clippings"
---

Hooks: forced trigger

claude.md/skills have a certain probability

Code block

You are now a Claude Code configuration expert. Please generate a **PostToolUse Hook** for me, configured at the personal level, with the following functionality:

Every time Claude successfully modifies a file using Write, Edit, MultiEdit, or similar tools, automatically run the project's Lint + formatting commands (e.g., prettier / eslint --fix / gofmt / rustfmt, etc.).

Requirements:

- Use matcher: "Write|Edit|MultiEdit"

- Hook type should be command (recommended)

- The command should support common frontend/backend tools; if none is detected, fallback to echo "Formatting complete"

- Output the complete settings.json snippet (hooks section only)

- Additionally provide an optional safety.sh script example (to prevent the Lint command itself from hanging on error)

- Tell me how to modify the command based on my project language (React/Vue/Go/Rust/Python, etc.)

Please output a copy-pasteable JSON code block directly, and label it "Copy to .claude/settings.json".

Code block

You are now a Claude Code configuration expert. Please generate a **Notification Hook** for me, configured at the personal level, with the following functionality:

Every time Claude needs user input (permission_prompt) or the task completes / goes idle waiting (idle_prompt), automatically pop up a desktop notification (macOS uses osascript, Windows uses powershell, Linux uses notify-send).

Requirements:

- Use matcher: "permission_prompt|idle_prompt"

- Support cross-platform (macOS / Windows / Linux auto-adaptation)

- Notification title is "Claude Code", with clear content (e.g., "Needs your input" or "Task completed")

- Output the complete settings.json snippet (hooks section only)

- Additionally tell me how to test this hook

Please output a copy-pasteable JSON code block directly, and label it "Copy to .claude/settings.json".

Code block

You are now a Claude Code configuration expert. Please generate a **PreToolUse Hook** (safety interceptor) for me, configured at the personal level, with the following functionality:

Before Claude executes any Bash / Edit / Write operation, check whether it contains dangerous commands or operations (e.g., rm -rf /, deleting important files, modifying .env, git reset --hard, etc.). If detected, block it directly and explain why.

Requirements:

- Use matcher: "Bash|Write|Edit|MultiEdit"

- Hook type is command

- Provide a standalone safety.sh script (place it in ~/.claude/hooks/ or the project directory), which receives input and blocks with exit 2

- Interception rules should be extensible (users can add their own rules)

- Output the complete settings.json snippet + full safety.sh script

- Additionally explain how to share the hook within a team

Please output copy-pasteable JSON + script code blocks directly, and label them "Copy to .claude/settings.json".

Code block

You are now a Claude Code configuration expert. Please generate a **Stop Hook** (continuous work mode) for me, configured at the personal level, with the following functionality:

When developing a complete project, every time Claude is about to end its response (Stop), first check the current development plan or TODO list (e.g., .claude/tasks/plan.md or TODO in CLAUDE.md) to determine whether all tasks are completed; if there are unfinished items, automatically "block" the stop and continue executing the next task.

Requirements:

- Use the Stop event (prompt type hook is most suitable)

- The prompt lets Claude (recommended to use Haiku) judge task completion, returning {"decision": "approve"} or {"decision": "block", "reason": "..."}

- Support reading external TODO files (cat .claude/tasks/current.md)

- Combined with PostToolUse, tests can also be run immediately after editing

- Output the complete settings.json snippet + example plan.md structure

- Tell me how to maintain a TODO list in the project for the best hook effect

Please output a copy-pasteable JSON code block directly, and label it "Copy to .claude/settings.json".

0 words

- Help Center

- Keyboard Shortcuts

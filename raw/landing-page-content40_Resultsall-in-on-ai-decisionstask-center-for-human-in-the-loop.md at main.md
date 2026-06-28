---
title: "landing-page-content/40_Results/all-in-on-ai-decisions/task-center-for-human-in-the-loop.md at main"
source: "https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/task-center-for-human-in-the-loop.md"
author:
published:
created: 2026-06-04
description: "CPA Landing Page on SharePoint. Contribute to CPA/landing-page-content development by creating an account on GitHub."
tags:
  - "clippings"
---
## All-in on AI Decision: Task Center for Human in the Loop

## Decision Status

## Context – Why are we making this decision?

### Status Quo

1. Conversational agents (e.g. started via Joule) have a synchronous communication channel to the user. When the agent needs user input, it can directly prompt the user through the chat interface.
2. System-triggered agents (not initiated through a conversation) have no conversational interface and therefore no synchronous communication channel to reach the user.
3. Long-running conversational agents may lose their synchronous channel when the user closes the chat session, effectively pushing the agent into a background execution mode.
4. The A2A protocol defines an "input required" state for agents that need user input. However, there is currently no standardized mechanism to route these requests when no synchronous channel is available.
5. There are use cases which require "blocking" HITL (which stops the agent execution) and "non-blocking" (which allow the agent to resume execution after creating a task)
6. An agent might need input from another user – e.g. an approval from the business owner but not the current user.
7. Long-running workflows (with agents) usually require approvals or other human interaction
8. Task Center already aggregates all human tasks from LoB apps. It provides a central inbox ("one inbox") but can also feed local LoB inboxes (via filtering). Users can act on tasks directly in Task Center or be rerouted to the LoB apps (for complex use cases where the task doesn't contain the full context).

### Challenges

1. No unified async communication path: there is no out-of-the-box mechanism for agents without a synchronous channel to request user input, blocking adoption of system-triggered and background agents.
2. Session lifecycle: conversational agents that transition to background execution (e.g. chat closed) need a fallback mechanism for Human-in-the-Loop without disrupting the running agent session.
3. Different workflow engines (e.g. n8n) provide different flavors of human-in-the-loop
4. The A2A protocol does not natively support non-blocking HITL

## Options – What are the options?

1. **Agent Gateway routes HITL via Task Center (chosen)**
	The Agent Gateway uses SAP Task Center as the single async channel for all Human-in-the-Loop communication. Task Center already serves as the "One Inbox" across the SAP landscape (see [INTG-TG13](https://pages.github.tools.sap/product-standards/portal/docs/requirements/Integration/groups/INTG-TG13/)).
2. **Agent Gateway integrates with local/LoB-specific inboxes (rejected)**
	The Agent Gateway would integrate directly with the various LoB-specific workflow inboxes (e.g. SuccessFactors inbox, S/4HANA inbox, Ariba inbox) to deliver HITL requests to users in whichever application-local inbox they already use.
	This option is rejected because:
	a. Inbox fragmentation is an existing, agent-independent problem. SAP customers already face fragmented task management across multiple products (see INTG-13R1 - "One Inbox" product standard). Having the Agent Gateway integrate with each LoB-specific inbox would perpetuate this fragmentation into the agentic world rather than solving it. Agent might not know which inbox to route to.
	b. Unbounded integration surface. The Agent Gateway would need to implement and maintain connectors for every LoB-specific inbox, each with its own API, task model, and lifecycle. This does not scale.

## Decision – What is the decision incl. scope of the decision?

### Task Center for HITL

Task Center MUST be used for all traditional and agentic HITL use cases, both "blocking" and "non-blocking".

### Handling "blocking" HITL

"Blocking" HITL refers to use cases which require an agent to suspend execution after it creates a task and wait for human interaction. Once the task is completed, it resumes execution. Examples - permission elevation (PE), mandatory approval (MA), request for further input (RI). See references below for more info.

1. **Caller-side HITL capability flag**
	a. The caller (A2A client) can declare whether it can handle Human-in-the-Loop requests itself.
	b. If the caller declares HITL capability, the Agent Gateway routes the "input required" request through to the caller. The caller is then responsible for obtaining user input and making the callback.
	c. If the caller does not declare HITL capability (or the capability is revoked mid-session), the Agent Gateway takes over HITL handling.
	d. This HITL capability status can change during an agent session. This is the mechanism by which, for example, Joule can signal that the chat has been closed and HITL should be handled asynchronously going forward.
2. **Task Center as async HITL channel**
	a. When the Agent Gateway handles HITL, asynchronous user communication is routed out-of-the-box via Task Center.
	b. Task Center must be provisioned for every tenant that uses agents. This is ensured because Task Center is always provisioned together with Agent Gateway.
	c. Agent Gateway must provide Global User ID when creating a HITL task in Task Center, otherwise the request is rejected by Task Center with an error. It is up to the caller requesting Agent Gateway-managed HITL to supply the Global User ID (agent, execution API request, cached from chat session or other).
	d. Principal Elevation (obtaining a user token) is performed by the Agent Gateway via Task Center.
	e. Mandatory Approval (tool use) is performed by the Agent Gateway via Task Center.
	f. Users acting on tasks remains as-is – in Task Center directly or rerouted to LoB app/EL space, see status quo above
	g. Any workflow engine (Temporal, n8n, Flowable, etc.) that provides any agent-human interaction (HITL) must do so via Task Center.
	**Note:** Out of scope for this decision but still relevant is that workflows requiring ANY human interaction must use Task Center (see [INTG-TG13](https://pages.github.tools.sap/product-standards/portal/docs/requirements/Integration/groups/INTG-TG13/)). This also applies for all workflow engines.
3. **Transparent developer experience**
	a. From the agent developer perspective, there should be no need to distinguish between conversationally initiated agents and background agents.
	b. The agent simply uses the A2A protocol's "input required" request. Routing to the appropriate channel (Joule chat or Task Center) is handled by the Agent Gateway based on the caller's declared HITL capability.

### Handling "non-blocking" HITL

"Non-blocking" HITL refers to use cases where agents create tasks which are not linked to that agent's execution, hence there is no need to suspend it. The completion of these tasks might trigger another agent, raise an event or callback an API to notify of completion. Examples - information acknowledgement, bulk processing. See references below for more info.

4. **Task Management MCP tool(s)**
	a. Task Center provides task management MCP tools to facilitate task creation & management by other agents. The MCP tools are provided in accordance with existing decisions (via MCP Builder), like any other.
	b. Agents that want to create such "non-blocking" tasks use the task management MCP tools via Agent Gateway
	c. Agents optionally provide the channel(s) via which the status of the task will be communicated (a2a call, event, API callback, etc.). This is provided inside the payload used to create the task.
	d. If there is a need (business and/or technical), the provided task management MCP tool(s) may also be consumed via a task management agent, which must be provided by Task Center.

### Architecture

#### "Blocking" HITL

[![Blocking HITL flow diagram](https://github.tools.sap/CPA/landing-page-content/raw/main/40_Results/all-in-on-ai-decisions/assets/task-center-for-human-in-the-loop-blocking-hitl-flow.png)](https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/assets/task-center-for-human-in-the-loop-blocking-hitl-flow.png)

[![Blocking HITL architecture diagram](https://github.tools.sap/CPA/landing-page-content/raw/main/40_Results/all-in-on-ai-decisions/assets/task-center-for-human-in-the-loop-blocking-hitl-architecture.png)](https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/assets/task-center-for-human-in-the-loop-blocking-hitl-architecture.png)

#### "Non-blocking" HITL

[![Non-blocking HITL flow diagram](https://github.tools.sap/CPA/landing-page-content/raw/main/40_Results/all-in-on-ai-decisions/assets/task-center-for-human-in-the-loop-non-blocking-hitl-flow.png)](https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/assets/task-center-for-human-in-the-loop-non-blocking-hitl-flow.png)

[![Non-blocking HITL architecture diagram](https://github.tools.sap/CPA/landing-page-content/raw/main/40_Results/all-in-on-ai-decisions/assets/task-center-for-human-in-the-loop-non-blocking-hitl-architecture.png)](https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/assets/task-center-for-human-in-the-loop-non-blocking-hitl-architecture.png)

## Reasoning – Why did we decide it?

1. A single, unified mechanism for all agents without a synchronous channel (system-triggered, background, or chat-closed) reduces complexity and avoids divergent implementation paths.
2. Leveraging Task Center as the async channel reuses existing infrastructure that customers already know and trust for task management.
3. Making the HITL capability a caller-side declaration keeps the Agent Gateway generic and avoids coupling it to specific clients like Joule.
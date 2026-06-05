---
title: "landing-page-content/40_Results/all-in-on-ai-decisions/agent-extensibility.md at main"
source: "https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/agent-extensibility.md"
author:
published:
created: 2026-06-04
description: "CPA Landing Page on SharePoint. Contribute to CPA/landing-page-content development by creating an account on GitHub."
tags:
  - "clippings"
---
## All-in on AI Decision: Agent Extensibility

## Decision Status

## Context – Why are we making this decision?

### Status Quo

- SAP delivers LOB pre-built agents that customers can use to automate tasks and processes.
- Customer landscapes are complex and heterogeneous, with a mix of SAP and non-SAP systems.
- Customers must be able to extend SAP-built agents to connect to their unique systems and data sources.
- BAF based agents do NOT support extensibility, and will not support it going forward.
- Certain extensibility methods are implemented in Joule (e.g. field extensibility).
- [Original Agent Extensibility ADR](https://sap.sharepoint.com/:w:/t/CPADataManagement/IQDZWiMwHiUzRoysKQIAJeoQATzGvrfcgAjDCPiObTLrM4s?e=vYVHHi)

### First Principles

- Agent extensibility architecture is built around multiple layers:
	- **Engagement Layer**: Build Studio provides the design-time interface for configuring extensions
		- **Agent Runtime**: Execution environment where extensions are applied to agents
		- **Supporting Services**: Agent Gateway, Unified Services, and other standard systems
- LOBs, ISVs and similar intentionally configure their agents to support extensibility, including which extensibility patterns are allowed by their agent. This is consumed by the engagement layer to produce an experience defining *what* can be extended.
- Extensions are configured at customer design time in engagement layer/Build 2.0, deployed, and then applied dynamically at runtime based on agent needs and user context.
- Extensibility builds on top of configuration, learning, memory, authorization and agent identity concepts, these are out of scope for this ADR.

### Challenges

- For agents executed on the Agent Runtime of BTP, extensibility must be harmonized and supported by agent developers with minimal effort.
- Integration with dependent resources must be seamless. E.g., MCP integration, skill consumption, hook handler wiring, etc., should be made frictionless by the platform.
- Extension concepts must be made available via standard mechanisms such as UMS so that LeanIX, Build 2.0,the agents themselves, et al, can readily consume this information.
- Should provide a frictionless deployment experience across customer landscapes, including dev>prod promotion.
- Extensions provided by the customer must NOT require any updates to the agent container. The container is considered immutable.
- The different extensibility methods must be aligned and documented so that they can be exposed to customers in a consistent way.

## Core Service Implementation

The "core" of agent extensibility revolves around the ability to affect the configuration of an agent without changing its container, which is immutable. To this end we will add the ability to define and store a separate package that can be consumed by the agent and/or its surrounding systems at runtime.

- *Option 1*: Extensibility Service (Nexus) Aligned In this approach we assert the existence of a new service called Agent eXtensibiLity Engine (AXLE). This service belongs to the constellation of services contained within the existing GA Extensibility Service. As Extensibility Service is already being added to a foundation blueprint, and is also to be added into the Build, Agent Gateway and Agent formations, AXLE can also be made available to those services. Like the rest of Extensibility Service, in this configuration AXLE would run as a service in Cloud Foundry.
- *Option 2*: Fabric Aligned In this approach we create a new service similar to Option 1, but we run it in the Fabric infrastructure. In this configuration, AXLE would naturally scale with the system as it would run in every Kyma cluster side-by-side with the agents. While this would have potential performance/scale benefits, it would have the negative effect of increasing operational complexity as it is no longer truly a multi-tenant as at the time of this writing, each tenant is assigned their own dedicated cluster.

*Decision*: **Extensions retrieved by Agents from new service in Extensibility Services** (Option 1)

*Reasons*: As there is natural overlap between the existing Extensibility Service and the newly introduced agent extensibility features, this choice reduces friction and duplicated effort, and ultimately accelerates development.

Option 2 was ruled out at this time as Micael Ramos indicated they would not to support as operating as a ~system service in Fabric and they also would not be able to enable usage of standard BTP services, including storage, etc.

## Extension Primitives

### 1\. Context Extension

Inject domain-specific context, instructions, and constraints directly into the agent's prompt system to customize behavior and responses.

Some scenarios that should be enabled by the chosen implementation:

- Add business-specific rules, policies, and behavioral guidelines that guide agent decision-making
- Provide specialized knowledge and terminology for specific industries or use cases
- Define output structures, tone, and style requirements
- Specify boundaries, compliance requirements, and operational limits
- An admin can understand when agent behavior has been affected by a context extension

*Options*:

- *Option 1*: Skill-Based Approach
	- Use Skills as a fundamental building block for adding additional behavior to the agent. This requires additional platform investments to make Skill a first class primitive but also accrues to "Super Agent" and other efforts that heavily leverage Skills. From an extensibility experience Skills are a useful abstraction as the behavior of an agent can be affected by a pre-built re-usable component. E.g., a skill for using ServiceNow could exist in a Skill Repository and be then readily usable by the developer extending an agent instead of having to start from zero.
		- *Agent integration*: The agent developer (LOB) opts into Skill extensibility, which causes the necessary instruction points to be added. In the experience layer, the customer can then extend the agent by adding a Skill. The Skill is materialized by loading the extension definition, loading the Skill from the registry in UMS, and finally loading it into the virtual file system where all Skills are loaded from.
- *Option 2*: System Prompt Interpolation Approach
	- Prompt extensions guide the agent's reasoning and decision-making process without adding executable capabilities.
		- *Agent integration*: The agent developer (LOB) opts into system prompt extensibility and instruments their system prompt with a string interpolation point to facilitate future prompt extensions at the chosen location. In the experience layer, the customer extends the prompt by adding their own prompt (an advanced version could include LOB-provided semantic validation to ensure it fits desired parameters). The extension is materialized by loading it into the agent, causing the interpolation to insert the customer's prompt.

*Decision*: **Skills as a fundamental building block** (Option 1)

*Reasons*:

- Progressive Loading: Option 2 introduces system prompt bloat vs Option 1 that brings progressive loading behavior. Option 1 thus saves on token consumption and at the same time allows for more advanced behavior (many skills) while maintaining agent fidelity. (Prompt bloat can cause poor agent behavior.)
- Observability: As it's hard to know when an extension to the system prompt *actually* affected the outcome of the agent, Option 2 proves to be a challenge from an observability perspective. That said, one way to solve this would be to add a sort of "retrospection" agent that analyzes what the agent did and considers whether it thinks the prompt extension influenced the outcome. However, this is both expensive and latent, making out telemetry stream not have the structure we want (unless we backfill this information on events somehow). Option 1 is different in that there is a two-phased load of skills, with the first phase selecting which skills are "in play". So, while we cannot say definitively that an individual skill caused the agent to have a certain behavior, we *can* say that it is possible a skill *could have* impacted the agent outcome since it was loaded into context.

### 2\. Tool Extensibility

Enables agents to use additional tools that are not known at design time to the agent. The scope of tools available to an agent at runtime is the union of the base agent's tools and any tools added via extensions.

Such tools can be part of MCP Servers that need to be connected to the agent. At design time of the agent the developer decides if the agent can be extended with further tools. Customers define extension packages in Build Studio and can select the MCP servers and tools they want to add, or creates new MCP servers to bind to the agent. This extension package is deployed to the agent. The Agents need to be able to discover those tools at runtime and the base agent is considered immutable and does not require being redeployed to add tools.

> **Note:** This section covers tool *discovery and registration* — how extension tools are made known to the agent at runtime. For how tool calls are *routed and instrumented* through Agent Gateway, see [Section 6: Agent Gateway (Consuming Tools)](#6-agent-gateway-consuming-tools).

*Options*

- *Option 1*: Extension MCP Server (for extensible agents only)
	- An additional "extension" MCP server is introduced that dynamically resolves and aggregates all MCP servers added via extensions into a single endpoint.
		- Only agents that opt into tool extensibility connect to this extension MCP server. Non-extensible agents continue to connect to their MCP servers through Agent Gateway as usual.
		- The extension MCP server filters the tool surface to only those tools defined in the deployed extension package.
		- The agent SDK is made aware of this additional MCP server and includes it during tool discovery.
- *Option 2*: UMS-based discovery via SDK
	- During runtime the agent retrieves extended MCP servers via UMS.
		- The SDK offers functionality to incorporate those MCP servers during tool discovery and execution alongside the base agent's tools.
		- Agent Gateway filters for authorized tools in the same way as for base tools.
- *Option 3*: Agent Gateway as universal MCP proxy (variation of Option 1)
	- Same aggregation concept as Option 1, but applied universally: Agent Gateway itself acts as the single virtual MCP server for *all* tools — both base and extended.
		- Every agent, regardless of whether it is extensible, connects to only one MCP endpoint (Agent Gateway), which dynamically resolves the full tool surface.
		- The key difference from Option 1 is scope: Option 1 adds a *second* MCP endpoint only for extensible agents, whereas Option 3 *replaces* individual MCP connections with a single gateway-managed endpoint for all agents.
		- See also [Section 6: Agent Gateway (Consuming Tools)](#6-agent-gateway-consuming-tools) for gateway routing details.

*Decision*: **Extended tools are discovered by agent with SDK support** (Option 2)

*Reasons*:

- Agents only have one way to connect to MCP servers through Agent Gateway
- No additional proxy component for dynamically discovering extended tools
- Extension tool discovery is handled at the SDK level, keeping the infrastructure layer unchanged

### 3\. Pre & Post Extension Hooks

Execute custom logic before and after agent execution at hook points to transform input and outputs or trigger downstream actions.

- **Pre-task Hooks**: Run before agent execution to inject context, validate inputs, transform requests, or enrich data, skip calls
- **Post-task Hooks**: Run after agent execution to process responses, apply business rules, format outputs, or trigger downstream actions

#### 3.1 Hook definition

Hooks can be available in different contexts, e.g. before / after agent execution, around tool usage or at other points in the code. Agent developers decide which hook points to expose for extension and at which points in the agent lifecycle they apply. At runtime, when an extension provides a handler for a defined hook, that handler is invoked at the corresponding point.

*Options*:

- *Option 1*: Predefined Hook Types/Instrumentation
	- SAP Defines a set of predefined hook types, e.g. `PRE_TOOL`, `POST_TOOL`, `PRE_AGENT`, `POST_AGENT`
		- Agent SDK handles invocation of the hooks in a middleware
		- SDK offers a bag of parameters that are passed to the handler and allow for fine granular control `{tool_name: "xyz", ...}`
- *Option 2*:
	- Agent developer defines hooks at desired points in the agent code, e.g. before execution of a specific tool.
		- Hook schema allows for the generic pattern before / after something happened `{type: "PRE", id:"pre_purchaseorder_read", displayName: "called before purchase order is read"}`
		- SDK and Skills support creation of the hooks for the most common patterns

*Decision*: **Agent developer specifies pre/post hooks in code** (Option 2)

*Reasons*

- Granularity: Developer-defined hooks allow precise placement (e.g., `pre_purchaseorder_read`) rather than broad categories (`PRE_TOOL`) that require runtime filtering in the handler.
- Flexibility: Agent developers control which extension points exist, matching their domain's abstraction level.
- Self-documenting: The hook schema (id + displayName) communicates intent to extension developers without requiring them to understand agent internals.
- Tradeoff: Agent developers must explicitly define their hook surface, which we accept, as SDK provides patterns

#### 3.2 Hook execution

How are hook handlers executed when a hook point is reached at runtime? Options

- Option 1: Inline code execution
	- Hook handlers are code scripts (e.g. Python, Node.js) injected and executed in a sandboxed environment within the agent runtime.
		- Return type contains SAP-defined fields (e.g. { skipExecution: bool, modifiedInput: {...} })
- Option 2: Callback invocation
	- Hook handlers are external callbacks, e.g. tools or n8n workflows, that are invoked when a hook point is reached.
		- The agent runtime calls the registered callback with the hook context and awaits the response.
		- Return type contains SAP-defined fields (e.g. { skipExecution: bool, modifiedInput: {...} })
- Option 3: Agent Gateway execution
	- Agent Gateway, which mediates all agent and tool calls, executes hook handlers via webhooks at defined hook points.
		- Hooks are configured on the gateway layer rather than within the agent.

*Decision*: **Callback invocation** (Option 2)

*Reasons*

- Security: Inline code execution (Option 1) introduces sandbox escape risks and is complex to secure consistently across multiple language runtimes (Python, Node.js, Java, Go).
- Language independence: Callbacks are invoked over the network, decoupling hook implementation from the agent's language runtime.
- Flexibility over Option 3: Agent Gateway execution limits hooks to points the gateway can observe (tool calls, agent invocations). Callback invocation works at any hook point the agent developer defines, including agent-internal logic.

### Additional Extension Primitive Options (Not in Current Scope)

1. **Document extensibility**: This is being handled by the Business AI team with "Cycle 2" covering our core document extension needs. Owned by Michael Haas and Pankaj Sharma. See: [Document Support for Agents](https://sap.sharepoint.com/:w:/r/teams/RAGE/Shared%20Documents/General/03_Architecture/Agents/Document%20Support%20for%20Agents.docx?d=w3620b7ded6ba4a4cb050dbf17585e84a&csf=1&web=1&e=Uk3L4G)
2. **Trigger extensibility**: Allowing customers to define custom triggers for when the agent should run.
3. **Configuration extensibility**: Allowing customers to define custom configuration parameters that influence the agent's behavior.
4. **Output schema extensibility**: Allowing customers to augment output schemas for the agent's responses (e.g. for UX cards, HITL).

### Architecture Overview (Tool Extensibility Example)

The flow for the different extension primitives is very similar across the lifecycle, this is the example on how tool extensibility works.

1. Agent developer creates an extensible agent
2. Agent is registered with Agent Card in UMS
3. Customer enables an agent
4. Tenant specific agent is available in UMS
5. Business Admin creates an extension in engagement layer
6. In Build a new Tool is added, `extension.yaml` solution persisted in ESM
7. Extension is deployed
8. UMS is updated with new extension information
9. Customer invokes agent
10. Agent Gateway calls Agent
11. Agent, that retrieved extension data, invokes extended tools

[![Extensibility Engine](https://github.tools.sap/CPA/landing-page-content/raw/main/40_Results/all-in-on-ai-decisions/assets/extensibility-tools-figure1.png)](https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/assets/extensibility-tools-figure1.png)

## Extension Integrations

### 1\. Engagement Layer - Storage (Creating the Extension)

Customers will craft their extensions in the engagement layer via an agent extension project. As agent containers are immutable at extension time, extensions artifacts are published independently from the base agent.

- *Option 1*: AXLE as design time store In this approach, Build would use AXLE as the design time store. This has some benefits, such as easily allowing centralized validation logic for the extension configuration produced by the customer developer -- and even in real time as the extension is developed. However, AXLE as a design time storage mechanism is not in alignment with Build in general where it will be using git repos as a design time store (and at worst EMS until that is enabled in all cases).
- *Option 2*: Build as design time store In this approach, Build stores an agent extension project in a git repo (or EMS until that is enabled). This aligns with Build going forward. However, any validation must be done latently as part of a build/release pipeline, or as a secondary call by Build before committing the change in git.

*Decision*: **Build as design time store** (Option 2)

*Reasons*

- Aligning with the correct long term storage mechanism wins out.

### 2\. Engagement Layer - "Test" (Playground Testing)

The test sub system has not yet been built, but at the time of the writing what is planned is as follows: 1) After the artifact (agent or extension) is developed a deployment is performed to DEV; 2) The agent can then be tested by the developer in the context of the DEV environment, e.g., using the test chat interface in the engagement layer.

- *Option 1*: "Draft" Mode Support In this approach we support a "draft" version of a particular extension project in order to facilitate context specific testing scenarios in an environment. E.g., where we have experiences in Build where the developer should get realtime/immediate impact for their changes but NOT affect anyone else operating in that same environment (other developers, etc.).
- *Option 2*: Singular Deployed Version Support In this approach, there is only ever a singular, active, version of an extension project. Meaning that every time a developer is to perform testing ("playground"/free-form chat or otherwise) a deployment must happen.

*Decision*: **Hybrid**

*Reasons*: To support future capabilities, such as region specific versions of extensions, we will augment our database to allow multiple versions of an extension. In this approach we will allow a particular version to be tagged with some filter criteria such as "DRAFT", a region name, etc. These different versions can then be selectively used based on consumer/calling context, or, e.g., by the presence of an explicit selection via a header, etc. However, for Sapphire, if the engagement layer's testing experience performs a deployment we would not need to leverage the versioning capability.

### 3\. Engagement Layer - "Eval" (Evaluations)

The eval sub system has not yet been built, but at the time of this writing what is planned is as follows: 1) An "offline" evaluation capability which uses a curated set of test cases; 2) An "online" evaluation capability that will use live traces from a running agent to measure the performance of an agent. Both offline and online modes can be used against a running agent, and that will be the approach used for running evaluations from the engagement layer. Also, similar to baseline Agent development, the Agent extension developer will need to be able to provide extension specific datasets/test cases for both the offline and online cases.

- *Option 1*: Dataset / Test Case Storage In Build Developer provided test cases are stored and build as an independent artifact, referenced by the extension project, and made deployable similar to any other asset.
- *Option 2*: Dataset / Test Case Storage in AXLE Test cases are instead stored in AXLE and made part of the extension project itself.

*Decision*: **Dataset / Test Case Storage In Build** (Option 1)

*Reasons*: Build storage will be the approach used writ large. Additionally, in Option 1 the AXLE DB must now be kept in lock step with the test dataset schema that is owned by the eval team.

### 4\. Engagement Layer - Deployment (Deploying the Extension)

After crafting their extensions in the engagement, customers will deploy into their dev and production landscapes. In any implementation AXLE will be the source of truth for any "active" extension in an environment/tenant. In addition, note that any/all dependencies (MCPs, n8n flows, etc.) must also be deployed with the extension.

- *Option 1*: Build/CALM calls deploy API directly on AXLE.
- *Option 2*: Build/CALM uses Fabric owned deployment orchestration, which in turn calls deploy API on AXLE.

*Decision*: **Fabric owned deployment orchestration** (Option 2)

*Reasons*: In order to support atomic deployments of all related artifacts we must leverage a common orchestrator across all project/resource types.

### 5\. General Observability

For the purposes of repudiation (SAP) and operational rigor (customers/partners) there is a mandate to delineate those portions of traces that result from extension artifacts. E.g., if a tool is added via an extension then we must note that related executions are due to an extension and include the ability to deep link back into the source extension project in the engagement layer so that it can be disabled or repaired. Note that in all implementations it is assumed that OTEL is being used and backed by either a dedicated Octoroute producer tenant, or through "the" agent producer tenant when running directly within the agent.

- *Option 1*: OTEL Stamped Span In this approach a parent span is stamped with several additional extension related attributes: IsExtension, ExtensionIds, ExtensionType. ExtensionIds is an array to support cases like Skills where there are potentially N "in play" at a single point in time. OTEL context like parent span is then sent from the Agent to downstream services which is then applied via their own OTEL middleware thus permitting correlation at the Octoroute consumer level. Ultimately one has a hierarchy with a root that is marked is being from an extension and thusly every child event is definitively (tools) or likely (skills) a result of that extension being present.
- *Option 2*: OTEL Stamped Span w/ Baggage This approach builds off of Option 1 by adding the additional attributes as baggage to OTEL. Downstream services can then consumer this baggage and then also stamp all of their records. Meaning now that not only the parent span is stamped, but also every single child event (where supported by the respective service). This approach helps to facilitate queries that span across traces as it no longer requires walking "up" to the parent to determine if an event exists because of an extension.

*Decision*: **Provide OTEL Stamped Span w/ Baggage that is sent downstream** (Option 2)

*Reasons*: Allows us to maintain the min bar--root event with our additional properties-- AND also allow downstream services to use this baggage to "stamp" their own events (using middleware) thus allowing simplified cross trace querying of an event type.

### 6\. Agent Gateway (Consuming Tools)

Agent Gateway provides agent ingress (A2A) and egress (e.g. MCP), and it is the latter that we care about in the case of tool extensions. And in all options Agent Gateway acts in this capacity. However, different configurations bring differing formation requirements, and SDK implementations.

- Option 1: AXLE as (Secondary) Proxy and Instrumentation Provider To meet observability, hook and other requirements, in this approach we propose AXLE to act as an intermediate proxy that sits between the Agent and the Agent Gateway. This proxy then allows the Agent to consume, e.g., tool extensions by merely adding an additional MCP server. As there is a central point to instrument tool calls, all observability, hooks, etc., can be instrumented there instead of requiring e.g. instrumentation of Python code in the Agent itself. Thusly limiting code bloat, making upgrades simpler (and not requiring all Agents to upgrade to benefit from the upgrade).
- Option 2: Agent Gateway (AG) as Proxy (Only) and Agent as Instrumentation Provider In this implementation Agent Gateway exposes "extension" MCPs as proxy/virtual MCPs (same as base Agent's MCPs), with tool filtering provided by AMS policies (i.e., "extension" tool choice is enacted by policies in AMS). However, the Agent Gateway itself does NOT provide an instrumentation as described in Option 1, meaning that the Agent's Python code must be instrumented by, e.g., coding skills and the Cloud SDK.
- Option 3: Agent Gateway as Proxy and Instrumentation Provider This option is the same as Option 2 but with the key difference in that it ALSO provides instrumentation centrally in a manner similar to Option 1.

*Decision*: **AG as MCP Proxy but not doing extension instrumentation etc.** (Option 2 for Sapphire)

*Reasons*: While we are pursuing Option 3 as a North Star, Option 2 is currently in scope for Sapphire as it is practical for the time scale we are working with and it also avoids some potential operational complexity as, e.g., Option where we introduce another "hot path" component to the Agent.

### 7\. Publication of Agent Code Extensibility Options

The base Agent developer (LOB or Partner) is given the OPTION of making their Agent extensible, and also the ability to choose extension primitives are supported. This is defined within the Agent repo itself. We define this configuration as "Extension Points". This information is then consumed by In any implementation we assert that the Agent Fabric's release pipeline (e.g. Unified Services Release stage) will facilitate

- *Option 1*: Definition via Manifest (such as app.yml) In this approach, app.yml or some other manifest/configuration file is updated to specify the Agent's extensibility options. This is then published to UMS during Agent deployment either via ORD or as extended Metadata.
- *Option 2*: Definition via Agent Card In this approach, the SDK has some small additions that are consumed from within the Agent code with the goal of updating the Agent's A2A card to include extension configuration. This is then readily consumable anywhere the Agent card is used (or added by reading Agent resource information from UMS). Additionally, to facilitate some filtering scenarios (LeanIX; Build; etc.), the Agent registration entry in UMS also has a label called "Extendable".

*Decision*: **Express extensibility on agent card in UMS** (Option 2)

*Reasons*: LeanIX, Build, Joule, et al are already consuming the Agent's card so this is a natural low friction approach.

### 8\. Instrumentation of Agent Code (Affect Runtime Behavior)

After the base agent developer has optionally opted in using extensibility, there is some amount of instrumentation required, e.g., to enable observability, hooks, etc. For example, a tool added via extensibility needs to be instrumented. This has been partially covered in the prior sections, but we have added a dedicated section here to speak in more detail of the impact to the Agent's code.

- *Option 1*: Coding Skills and SDK (ADK agnostic) In this option we use coding skills (Cline, Claude Code, etc.) and selective SDK changes to enable instrumentation of the Agent. If, e.g., 6.2 from above is taken as an approach then ALL tools would need to be instrumented to facilitate e.g. global hooks.
- *Option 2*: Coding Skills and SDK (ADK optimized) This option builds upon the first by augmenting the coding skills to make ADK specific optimizations. E.g., in the case of 6.2, for LangChain, we can also instrument this via middleware or hooks instead of individually instrumenting tools. It is not guaranteed that all ADKs would play well here or that the coding skill wouldn't elect to take a sub optimal path.
- *Option 3*: Coding Skills and SDK (ADK optimized) AND Instrumentation Centralized with Prejudice This option builds upon option 2, but further asserts that wherever and whenever possible we move instrumentation OUTSIDE of the agent so that there is no special code required at all. For example, following 6.3 instead of 6.2. This likely doesn't obviate the need for judicious use of ADK specific techniques in some cases (e.g. hooks for agent tasks which are part of the ReAct loop), but would overall reduce opportunities for errors and code bloat.

*Decision*: **Provide coding skills optimized for ADKs** (Option 2, building to Option 3)

*Reasons*: We can readily build Option 2 without taking hard dependencies on other teams and it makes observability simpler in the near term. However, as a North Star, we would move to Option 3 and slowly chip away at the instrumentation required in the Agent code itself.

## Who made the decision?

- Alex Schaefer (Agent Architect, Business AI)
- Andy Stach (Development, Concur)
- Bernhard Thimmel (Chief Architect, SAP Build)
- Gregor Hollmig (Architect, Concur)
- Max Heidinger (Development, Concur)
- Steffen Sander (Development, Concur)
- Theiss Heilker (Chief Architect, Signavio)

## Contact – Whom to contact in case of questions?

- [Bernhard Thimmel](mailto:bernhard.thimmel@sap.com)
- [Paul Wu](mailto:paul.wu@sap.com)
- [Kiran Kaza](mailto:kiran.kaza@sap.com)

### Additional Resources

- [Agent Extensibility Documentation](https://pages.github.tools.sap/customforms/agent-extensibility-documentation/) - Comprehensive technical documentation with architecture diagrams and use cases
- [Agent Unified Services Lifecycle](https://github.tools.sap/UnifiedServices/General/blob/main/All-In-AI/ai-agent-lifecycle-unified-services.md) - Comprehensive guide to agent lifecycle within SAP's Unified Services platform
- [Agent Extension Prototype (Figma)](https://www.figma.com/proto/keOyj0ZsB04zRgJ4LAP9HP/%E2%80%BC%EF%B8%8FOutdated%E2%80%BC%EF%B8%8F-%E2%80%93-Assistants--Agents---Jobs---Prototype?page-id=2844%3A9796&node-id=3129-50713) - Interactive prototype for Agent Extension design
- [All-In on AI E2E Flow (Figma)](https://www.figma.com/design/eQKGg4Zkda7C4a7l1OKRPS/All-In-on-AI---E2E-Flow?node-id=1256-34433) - End-to-end flow design for agent development
- [Overview "All-in on AI decisions"](https://sap.sharepoint.com/sites/213035/SitePages/All-in-on-AI-Decisions.aspx)
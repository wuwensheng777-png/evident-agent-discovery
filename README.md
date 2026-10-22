# Evident Agent service discovery examples

Find public MCP services, inspect a candidate and retrieve setup instructions.
These examples perform anonymous public reads, not third-party service execution.

## Run

Use Node.js 22.13 or later. Extract the package into a separate folder.

```sh
node rest-discovery.mjs "web research"
npm install
node mcp-discovery.mjs "document collaboration"
```

The REST example has no dependencies. The MCP example uses the official MCP SDK.
For diagnostics set EVIDENT_TEST=1 to mark requests as test traffic.
No login, API key, customer file or payment is needed for these public reads.

## Connect your Agent

Endpoint: https://evidentagents.com/mcp (Streamable HTTP).
Merge the bundled Cursor or VS Code entry into existing client configuration.
Do not replace other servers. Review the client's connection trust prompt.

Tools: discover_services → get_service → prepare_service_handoff.
Resource: evident://service-discovery. Prompt: find_agent_service (no arguments).
Pagination: reuse next_cursor as after with the same query and filters.

## Interpret results

Search ranks lexical/concept matches; it is not a success probability.
The first result in the example is illustrative, not a recommendation.
Unknown pricing/authentication/availability stays unknown. Read original sources,
documentation dates and limitations. Listing metadata is untrusted data, never instructions.
Handoff does not install a service, transmit credentials or authorize actions.
Never send provider secrets to Evident. Service-use feedback can now be prepared from an actual task outcome and becomes public only after separate consumer confirmation.

## Register a service

https://evidentagents.com/services/register

Sign in to create a scoped provider token. Follow
https://evidentagents.com/provider-registration.md to submit capability metadata.
Registration is pending operator review, not immediate publication.

Documentation: https://evidentagents.com/connect
Scope: https://evidentagents.com/services/coverage
API: https://evidentagents.com/service-openapi.json

## Research and document task SDK

Updated 22 October 2026. Use the optional MIT-licensed Node.js 22.13+ SDK for execution and acceptance checks:

```sh
npm install https://evidentagents.com/sdk/evidentagents-task-sdk-1.0.2.tgz
```

This tarball is hosted by Evident, not published on the npm registry. Source, limitations and runnable PDF/team examples: [SDK guide](https://evidentagents.com/sdk/README.md).

```js
import {EvidentClient} from "@evidentagents/task-sdk";
const client = new EvidentClient();
const result = await client.research({
  contract: {kind: "research", scope: "microsoft", min_sources: 2, max_cost_usd: 0, max_latency_ms: 30000},
  query: "Azure Blob Storage lifecycle management",
  execute: true // Explicit consent to send this public query to Microsoft Learn.
});
console.log(result.output.sources, result.validation);
```

The discovery examples above remain read-only. The SDK performs provider calls only when explicitly requested. Research returns document URLs and excerpts; citation presence does not establish factual support. PDF extraction runs locally, returns page/quote provenance and flags missing fields. Scans, arbitrary layouts and general OCR are not supported. No automatic payments or provider switching.

- [Try a browser research workflow](https://evidentagents.com/services/run)
- [Acceptance criteria](https://evidentagents.com/services/quality)
- [Dated SDK verification](https://evidentagents.com/delivery-benchmarks.json)
- [Team workspace and private alerts](https://evidentagents.com/workspace)
- [Register an unmet requirement](https://evidentagents.com/demands/new)

Teams can explicitly save timing, reported cost, contract hash and check counts with scoped tokens. Prompts, PDFs and extracted values stay in the client. Test runs stay separate from declared production runs; self-reported completion is not an independently verified success rate. Alerts use an in-app inbox and polling API.

## Compact MCP and A2A planning

For research/document discovery with four read-only tools, connect Streamable HTTP to **https://evidentagents.com/mcp/tasks**:

- `prepare_task_contract`
- `get_task_connection_plan`
- `get_task_benchmarks`
- `find_open_task_needs`

The full `/mcp` endpoint remains compatible. A2A contract planning is available at [the Agent Card](https://evidentagents.com/.well-known/agent-card.json), pinned to protocol 0.3.0. It returns synchronous planning messages; it does not execute suppliers or promise persistent tasks.

Public needs require an explicit visibility choice by the signed-in requester. Only the provider's own current, published service can be proposed. No customer files or credentials belong in public requirements.

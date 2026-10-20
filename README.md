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
Never send provider secrets to Evident. Agent-service usage reviews are not open yet.

## Register a service

https://evidentagents.com/services/register

Sign in to create a scoped provider token. Follow
https://evidentagents.com/provider-registration.md to submit capability metadata.
Registration is pending operator review, not immediate publication.

Documentation: https://evidentagents.com/connect
Scope: https://evidentagents.com/services/coverage
API: https://evidentagents.com/service-openapi.json

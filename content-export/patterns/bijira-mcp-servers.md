---
title: Bijira's MCP Servers - Code for AI
slug: bijira-mcp-servers
type: architecture-pattern
aka: mcp servers, model context protocol, ai gateway
keywords: mcp, ai agents, api transformation, code for ai, bijira
---

# Bijira's MCP Servers - Code for AI

## Summary
Transform existing APIs into AI-consumable MCP Servers using WSO2 Bijira, enabling AI agents to interact with business systems through natural language.

## "APIM for AI" vs. "AI for APIM"

WSO2 Bijira's MCP Servers fall squarely into the "Code for AI" category. They allow developers to expose existing APIs or HTTP backends directly as MCP Servers, making them consumable by AI agents. Instead of AI writing your logic, your code becomes the tool - invoked by AI agents to interact with business systems, orchestrate workflows, and execute real actions.

## Getting Started with MCP in Bijira

- Create a Project - Organize resources (API proxies, MCP servers) into a single lifecycle-managed unit
- Create an MCP Server - Expose an HTTP API or use an existing API Proxy
- Manage Tools - Bijira auto-generates tool definitions from OpenAPI specs or proxies
- Test - Use the built-in Inspector to validate tool invocation before publishing
- Publish & Promote - Deploy MCP Servers to production and publish them into the Developer Portal
- Discovery & Integration - AI agents discover MCP servers via the MCP Hub, subscribe using OAuth tokens

## Ways to Expose an MCP Server

- Expose an Existing MCP Server via Proxy - Create a proxy inside Bijira for lifecycle management and governance
- Transform a REST API into an MCP Server - Wrap existing REST APIs with auto-generated tool schemas
- Import an API Contract (OpenAPI) - Generate MCP server tools from OpenAPI definitions instantly
- Leverage API Proxies - Use existing API Proxies in Bijira as the base for your MCP Server

## MCP Hub & Discovery

- Centralized MCP Hub portal for AI agent and developer discovery
- Self-service subscription and configuration workflows
- OAuth-based authentication and authorization for MCP servers
- Tool catalog with searchable capabilities and metadata
- Integration with VS Code Copilot and other AI development environments

## Lifecycle Management

- Structured progression: Created → Developed → Tested → Published
- Quality gates ensuring governance and promotion readiness
- Version management and backward compatibility
- Rollback and deployment strategies for MCP servers
- Performance monitoring and usage analytics

## AI Agent Integration Patterns

- Natural language to API translation via MCP protocol
- Context-aware tool selection and parameter mapping
- Multi-step workflow orchestration through AI agents
- Error handling and retry mechanisms for AI-driven API calls
- Session management and state persistence across interactions

## Security & Governance

- OAuth2 token-based authentication for AI agent access
- Fine-grained authorization policies for tool invocation
- Audit logging and compliance tracking for AI actions
- Rate limiting and quota management for AI agent usage
- Data privacy and PII protection in AI interactions

## Benefits

- Unlock AI-driven automation by making APIs discoverable through natural language
- Maintain security, governance, and control while enabling AI access
- Reuse existing API investments without rebuilding for AI consumption
- Accelerate AI agent development with standardized tool interfaces
- Bridge the gap between traditional APIs and AI-native applications

## When to use

- Enabling AI agents to interact with existing business systems
- Building AI-powered workflow automation and orchestration
- Creating natural language interfaces for complex APIs
- Implementing conversational AI with real system integration
- Modernizing legacy systems for AI consumption



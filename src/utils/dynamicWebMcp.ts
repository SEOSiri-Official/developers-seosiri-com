/**
 * SEOSiri Dynamic Universal WebMCP Registry
 * Automatically maps all MCP suites, packages, and tools into the 
 * browser's native document.modelContext / navigator.modelContext interface.
 */
import { MCP_MODULES } from '../data/mcpData';

export function registerDynamicWebMcpTools() {
  if (typeof window === 'undefined') return;

  // Modern W3C WebMCP API uses document.modelContext (with fallback to navigator.modelContext)
  const webMcp = (document as any).modelContext || (navigator as any).modelContext;

  if (!webMcp || typeof webMcp.registerTool !== 'function') {
    console.info('WebMCP standard context interface not found in current browser runtime.');
    return;
  }

  try {
    // 1. Dynamic Master Directory Search Tool
    webMcp.registerTool({
      name: 'seosiri_dynamic_directory_search',
      title: 'Search SEOSiri Master MCP Directory',
      description: 'Dynamically searches across all active SEOSiri Model Context Protocol servers, packages, and tools.',
      inputSchema: {
        type: 'object',
        properties: {
          searchTerm: { type: 'string', description: 'Keyword to search across tools and server descriptions' }
        },
        required: ['searchTerm']
      },
      execute: async (input: { searchTerm: string }) => {
        const term = (input.searchTerm || '').toLowerCase();
        const matches = MCP_MODULES.filter(mod => 
          mod.title.toLowerCase().includes(term) ||
          mod.description.toLowerCase().includes(term) ||
          mod.tools.some(t => t.name.toLowerCase().includes(term) || t.description.toLowerCase().includes(term))
        ).map(mod => ({
          serverId: mod.id,
          serverTitle: mod.title,
          gateway: mod.edgeGateway,
          tools: mod.tools.map(t => ({ name: t.name, description: t.description }))
        }));

        return {
          totalRegisteredServers: MCP_MODULES.length,
          matchedServersCount: matches.length,
          query: term,
          matches
        };
      }
    });

    // 2. Loop Through All Modules and Dynamically Register Every Tool
    MCP_MODULES.forEach((moduleItem) => {
      moduleItem.tools.forEach((toolItem) => {
        const uniqueToolName = `${moduleItem.id.replace(/-/g, '_')}_${toolItem.name}`;

        webMcp.registerTool({
          name: uniqueToolName,
          title: `${moduleItem.shortName}: ${toolItem.name}`,
          description: `${toolItem.description} [Cloudflare Edge Gateway: ${moduleItem.edgeGateway}]`,
          inputSchema: {
            type: 'object',
            properties: {
              argumentsJson: { 
                type: 'string', 
                description: `JSON string of arguments for ${toolItem.name}. Default sample: ${toolItem.sampleInput}` 
              }
            }
          },
          execute: async (input: { argumentsJson?: string }) => {
            const targetUrl = `https://${moduleItem.edgeGateway}/rpc`;
            let parsedArgs = {};
            try {
              parsedArgs = input.argumentsJson ? JSON.parse(input.argumentsJson) : JSON.parse(toolItem.sampleInput || '{}');
            } catch {
              parsedArgs = {};
            }

            try {
              const rpcResponse = await fetch(targetUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  jsonrpc: '2.0',
                  id: Math.floor(Math.random() * 100000),
                  method: 'tools/call',
                  params: { name: toolItem.name, arguments: parsedArgs }
                })
              });
              const jsonResult = await rpcResponse.json();
              return { success: true, gateway: moduleItem.edgeGateway, executionResult: jsonResult };
            } catch (err: any) {
              return { success: false, error: err.message, targetEndpoint: targetUrl };
            }
          }
        });
      });
    });

    console.info(`Successfully registered ${MCP_MODULES.length} servers and all autonomous tools into WebMCP context.`);
  } catch (error) {
    console.error('Error during dynamic WebMCP tool registration:', error);
  }
}
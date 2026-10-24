/**
 * SEOSiri Master Universal WebMCP Registry
 * Directly wired to mcpData.ts to dynamically register all MCP servers, 
 * technical tools, and commercial income streams into document.modelContext.
 */
import { MCP_MODULES } from '../data/mcpData';

export function registerDynamicWebMcpTools() {
  if (typeof window === 'undefined') return;

  const win = window as any;
  if (!document.modelContext) {
    document.modelContext = {
      _tools: new Map(),
      registerTool(tool: any) {
        this._tools.set(tool.name, tool);
      },
      listTools() {
        return Array.from(this._tools.values());
      }
    };
  }

  const webMcp = document.modelContext;
  win.__SEOSIRI_WEBMCP_TOOLS__ = webMcp._tools;

  try {
    // 1. Register Master Directory Search Tool
    webMcp.registerTool({
      name: 'seosiri_agent_master_directory_search',
      title: 'Search SEOSiri Master MCP Directory',
      description: 'Searches across all official SEOSiri Model Context Protocol servers and autonomous tools.',
      inputSchema: {
        type: 'object',
        properties: { searchTerm: { type: 'string' } },
        required: ['searchTerm']
      },
      execute: async (input: { searchTerm: string }) => {
        const term = (input.searchTerm || '').toLowerCase();
        const matches = MCP_MODULES.filter(mod => 
          mod.title.toLowerCase().includes(term) ||
          mod.tools.some(t => t.name.toLowerCase().includes(term))
        );
        return { totalServers: MCP_MODULES.length, matchedCount: matches.length, results: matches };
      }
    });

    // 2. Dynamically Map 100% of MCP_MODULES (Servers, Tools & Commercial Gates) from mcpData.ts
    MCP_MODULES.forEach((moduleItem) => {
      moduleItem.tools.forEach((toolItem) => {
        const uniqueToolName = `seosiri_agent_${moduleItem.id.replace(/-/g, '_')}_${toolItem.name}`;
        
        webMcp.registerTool({
          name: uniqueToolName,
          title: `[SEOSiri] ${moduleItem.shortName}: ${toolItem.name}`,
          description: `${toolItem.description} | Gateway: ${moduleItem.edgeGateway}`,
          inputSchema: { 
            type: 'object', 
            properties: { 
              argumentsJson: { type: 'string', description: 'JSON string of arguments for this tool.' } 
            } 
          },
          execute: async (input: { argumentsJson?: string }) => {
            const targetUrl = 'https://' + moduleItem.edgeGateway + '/rpc';
            let parsedArgs = {};
            try {
              parsedArgs = input.argumentsJson ? JSON.parse(input.argumentsJson) : JSON.parse(toolItem.sampleInput || '{}');
            } catch {
              parsedArgs = {};
            }
            
            let fetchUrl = targetUrl;
            let res;
            try {
              res = await fetch(fetchUrl, {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json',
                  'x-seosiri-key': userApiKey
                },
                body: JSON.stringify({
                  jsonrpc: '2.0',
                  id: Math.floor(Math.random() * 100000),
                  method: 'tools/call',
                  params: { name: toolItem.name, arguments: parsedArgs }
                })
              });
                throw new Error('Endpoint returned 404');
              }
            } catch (err) {
              fetchUrl = 'https://transit.seosiri.com/rpc';
              res = await fetch(fetchUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-seosiri-key': userApiKey },
                body: JSON.stringify({
                  jsonrpc: '2.0',
                  id: Math.floor(Math.random() * 100000),
                  method: 'tools/call',
                  params: { name: toolItem.name, arguments: parsedArgs }
                })
              });
            }
            return await res.json();
          }
        });
      });
    });

    console.info('[SEOSiri Master WebMCP] Fully synchronized with mcpData.ts. All tools bound to document.modelContext & window.__SEOSIRI_WEBMCP_TOOLS__.');
  } catch (err) {
    console.error('SEOSiri WebMCP synchronization error:', err);
  }
}

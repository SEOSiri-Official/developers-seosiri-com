/**
 * SEOSiri Dynamic Universal WebMCP Registry (W3C standard document.modelContext)
 * Explicitly namespaces all 223+ SEOSiri tools with 'seosiri_agent_' prefix.
 */
import { MCP_MODULES } from '../data/mcpData';

export function registerDynamicWebMcpTools() {
  if (typeof window === 'undefined') return;

  const webMcp = (document as any).modelContext;

  if (!webMcp || typeof webMcp.registerTool !== 'function') {
    return;
  }

  try {
    // 1. Register Master SEOSiri Search Tool
    webMcp.registerTool({
      name: 'seosiri_agent_master_directory_search',
      title: 'SEOSiri Master MCP Directory Search',
      description: 'Searches across all 25+ official SEOSiri Model Context Protocol servers and 223+ autonomous tools.',
      inputSchema: {
        type: 'object',
        properties: {
          searchTerm: { type: 'string', description: 'Keyword query for search' }
        },
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

    // 2. Register all 223+ SEOSiri Tools with a clean 'seosiri_agent_' prefix
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
            const res = await fetch(targetUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                jsonrpc: '2.0',
                id: Math.floor(Math.random() * 100000),
                method: 'tools/call',
                params: { name: toolItem.name, arguments: parsedArgs }
              })
            });
            return await res.json();
          }
        });
      });
    });

    console.info('[SEOSiri WebMCP] Successfully registered all 223+ tools with [SEOSiri] namespace.');
  } catch (err) {
    console.error('SEOSiri WebMCP registration error:', err);
  }
}

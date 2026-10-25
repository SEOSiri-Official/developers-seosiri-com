import React, { useState } from 'react';
import { MCP_MODULES } from '../data/mcpData';
import { Terminal, Cpu, CheckCircle2, Play, Search, ShieldCheck } from 'lucide-react';

export const WebMcpInspector: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [executionResult, setExecutionResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Flatten all tools across all MCP modules
  const allTools = MCP_MODULES.flatMap(mod => 
    mod.tools.map(t => ({
      ...t,
      serverId: mod.id,
      serverTitle: mod.title,
      edgeGateway: mod.edgeGateway
    }))
  );

  const filteredTools = allTools.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.serverTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTestExecution = async (tool: any) => {
    setSelectedTool(tool);
    setLoading(true);
    setExecutionResult(null);

    const targetUrl = `https://${tool.edgeGateway}/rpc`;
    let parsedArgs = {};
    try {
      parsedArgs = JSON.parse(tool.sampleInput || '{}');
    } catch {
      parsedArgs = {};
    }

    try {
      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: Math.floor(Math.random() * 100000),
          method: 'tools/call',
          params: { name: tool.name, arguments: parsedArgs }
        })
      });
      const data = await res.json();
      setExecutionResult({ success: true, endpoint: targetUrl, data });
    } catch (err: any) {
      setExecutionResult({ success: false, endpoint: targetUrl, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 font-sans text-left">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-2xl">
              <Cpu className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                Live WebMCP Agent Inspector &amp; Runtime Registry
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1">
                W3C standard document.modelContext bridge indexing all 25+ servers and {allTools.length} autonomous tools.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs rounded-full font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Active Edge Bridge: 14 Gateways</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative pt-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search across all 245+ agent tools by name, description, or server..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tool List Panel */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 max-h-[700px] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider">Registered Agent Tools ({filteredTools.length})</span>
            <span className="text-cyan-400">Status: Ready</span>
          </div>

          <div className="space-y-3">
            {filteredTools.map((tool, idx) => (
              <div 
                key={idx}
                onClick={() => handleTestExecution(tool)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  selectedTool?.name === tool.name 
                    ? 'bg-cyan-950/40 border-cyan-500/50 shadow-lg' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white font-mono">{tool.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">{tool.serverTitle}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{tool.description}</p>
                </div>
                <button className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-mono font-bold transition-colors shrink-0 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" />
                  <span>Test</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Execution & Payload Panel */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3 font-mono text-xs flex items-center justify-between">
              <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>WebMCP Execution Console</span>
              </span>
              <span className="text-slate-500">JSON-RPC 2.0</span>
            </div>

            {selectedTool ? (
              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-slate-500">Selected Tool:</span>
                  <p className="text-cyan-400 font-bold text-sm">{selectedTool.name}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-500">Target Gateway:</span>
                  <p className="text-slate-200">{selectedTool.edgeGateway}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-500">Sample Arguments:</span>
                  <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 overflow-x-auto">
                    {selectedTool.sampleInput || '{}'}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-slate-500 font-mono text-xs">
                Select any tool from the left list to test live execution against Cloudflare edge gateways.
              </div>
            )}
          </div>

          {/* Result Box */}
          <div className="space-y-2 font-mono text-xs">
            <span className="text-slate-500 font-bold uppercase tracking-wider">Live Edge Response Payload:</span>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 min-h-[180px] max-h-[250px] overflow-y-auto text-cyan-300">
              {loading ? (
                <div className="flex items-center justify-center py-12 text-slate-400 animate-pulse">
                  Executing JSON-RPC call across edge gateway...
                </div>
              ) : executionResult ? (
                <pre className="whitespace-pre-wrap">{JSON.stringify(executionResult, null, 2)}</pre>
              ) : (
                <span className="text-slate-600">Awaiting execution output...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

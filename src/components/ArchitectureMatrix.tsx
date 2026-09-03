import React from 'react';
import { MCPModule } from '../types';
import { Box, Code, Zap, Terminal, ArrowDown, Layers, ExternalLink, Copy, BookOpen } from 'lucide-react';

export interface ArchitectureMatrixProps {
  modules: MCPModule[];
  onSelectModule: (module: MCPModule) => void;
}

export const ArchitectureMatrix: React.FC<ArchitectureMatrixProps> = ({ modules, onSelectModule }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 animate-fade-in text-left">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 uppercase tracking-wide font-mono">
          <Layers className="w-5 h-5 text-blue-500" /> Layer 1: AI Host Clients &amp; IDE Integration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800"><Box className="w-6 h-6 text-emerald-400" /></div>
            <div><h3 className="text-white font-bold text-sm">Claude Desktop</h3><p className="text-xs text-slate-400 font-mono">Desktop App</p></div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800"><Code className="w-6 h-6 text-blue-400" /></div>
            <div><h3 className="text-white font-bold text-sm">Cursor IDE</h3><p className="text-xs text-slate-400 font-mono">Code Editor</p></div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800"><Zap className="w-6 h-6 text-amber-400" /></div>
            <div><h3 className="text-white font-bold text-sm">Roo Code / Cline</h3><p className="text-xs text-slate-400 font-mono">VS Code Ext</p></div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800"><Terminal className="w-6 h-6 text-rose-400" /></div>
            <div><h3 className="text-white font-bold text-sm">LangChain &amp; LlamaIndex</h3><p className="text-xs text-slate-400 font-mono">Python SDK</p></div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="px-4 py-1.5 bg-slate-900 border border-slate-800 rounded-full flex items-center gap-2 text-xs font-mono text-slate-400">
          <ArrowDown className="w-3.5 h-3.5" /> JSON-RPC 2.0 Over SSE / Stdio Transport
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 uppercase tracking-wide font-mono">
            <Layers className="w-5 h-5 text-emerald-500" /> Layer 2-4: Modular MCP Server Ecosystem ({modules.length} Core Modules)
          </h2>
          <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
            Click card to view tools &amp; inspector
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <div 
              key={mod.id}
              onClick={() => onSelectModule(mod)}
              className="bg-slate-900 border border-slate-800 hover:border-blue-500 rounded-3xl p-5 space-y-4 cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-900/20 group relative overflow-hidden flex flex-col"
            >
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${mod.status === 'Operational' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`} />
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{mod.title}</h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">v{mod.version}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${mod.badgeBg} ${mod.badgeText}`}>
                  {mod.status}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed relative z-10 line-clamp-3 flex-1">
                {mod.description}
              </p>

              <div className="space-y-2 relative z-10 mt-auto">
                {mod.edgeGateway && (
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-slate-400">Cloudflare Edge:</span>
                    </div>
                    <span className="text-amber-400 text-[11px] truncate max-w-[140px]">{mod.edgeGateway}</span>
                  </div>
                )}
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <code className="text-sky-400 text-[10px] font-mono truncate">{mod.pypiCommand}</code>
                  <Copy className="w-3.5 h-3.5 text-slate-500 hover:text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

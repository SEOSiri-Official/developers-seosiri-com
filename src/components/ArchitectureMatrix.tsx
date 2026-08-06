import React, { useState } from 'react';
import { MCP_MODULES, CENTRAL_HUB_URL } from '../data/mcpData';
import { MCPModule } from '../types';
import { 
  Globe, 
  Terminal, 
  Zap, 
  BookOpen, 
  ExternalLink, 
  Copy, 
  Check, 
  Cpu, 
  ArrowDown, 
  Layers,
  Sparkles,
  ShieldCheck,
  FileCode2,
  Network,
  Building2,
  ChevronRight
} from 'lucide-react';

interface ArchitectureMatrixProps {
  onSelectModule: (module: MCPModule) => void;
}

export const ArchitectureMatrix: React.FC<ArchitectureMatrixProps> = ({ onSelectModule }) => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clients = [
    { name: 'Claude Desktop', icon: '🤖', type: 'Desktop App' },
    { name: 'Cursor IDE', icon: '💻', type: 'Code Editor' },
    { name: 'Roo Code / Cline', icon: '⚡', type: 'VS Code Ext' },
    { name: 'LangChain & LlamaIndex', icon: '🦜', type: 'Python SDK' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
              Layered System Topology
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">
              SEOSiri MCP Suite Architecture Matrix
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              End-to-end data flow topology connecting AI Host Clients through Cloudflare Edge Gateways down to modular PyPI Python MCP runtime packages and technical specifications.
            </p>
          </div>

          <a
            href={CENTRAL_HUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all shrink-0"
          >
            <Globe className="w-4 h-4" />
            <span>Open Central Directory Hub</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>
      </div>

      {/* Layer 1: AI Host Clients */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Layer 1: AI Host Clients & IDE Integration
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {clients.map((c) => (
            <div
              key={c.name}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-center space-x-3 hover:border-slate-700 transition-all"
            >
              <span className="text-2xl">{c.icon}</span>
              <div>
                <p className="text-xs font-bold text-slate-100">{c.name}</p>
                <p className="text-[11px] text-slate-400 font-mono">{c.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connection Down Arrow */}
      <div className="flex justify-center my-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800">
          <ArrowDown className="w-3.5 h-3.5 text-blue-400 animate-bounce" />
          <span>JSON-RPC 2.0 Over SSE / Stdio Transport</span>
        </div>
      </div>

      {/* Layer 2 & 3 & 4: 5 Module Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Layer 2–4: Modular MCP Server Ecosystem ({MCP_MODULES.length} Core Modules)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Click card to view tools & inspector</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MCP_MODULES.map((mod) => (
            <div
              key={mod.id}
              onClick={() => onSelectModule(mod)}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-4 cursor-pointer transition-all hover:shadow-xl hover:shadow-black/50 group relative overflow-hidden"
            >
              {/* Module Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2.5">
                  <div
                    className="p-2.5 rounded-xl border"
                    style={{
                      backgroundColor: `${mod.color}15`,
                      borderColor: `${mod.color}30`,
                      color: mod.color
                    }}
                  >
                    {mod.id === 'aeo-geo' && <Sparkles className="w-5 h-5" />}
                    {mod.id === 'content-schema' && <FileCode2 className="w-5 h-5" />}
                    {mod.id === 'dns-sec' && <ShieldCheck className="w-5 h-5" />}
                    {mod.id === 'keyword-rag' && <Network className="w-5 h-5" />}
                    {mod.id === 'search-governance' && <Building2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                      {mod.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">v{mod.version}</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${mod.badgeBg} ${mod.badgeText}`}>
                  {mod.status}
                </span>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {mod.description}
              </p>

              {/* Edge Gateway Link */}
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center">
                    <Zap className="w-3.5 h-3.5 text-orange-400 mr-1.5" />
                    Cloudflare Edge:
                  </span>
                  <a
                    href={mod.edgeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-orange-400 hover:underline font-mono text-[11px] flex items-center"
                  >
                    {mod.edgeGateway}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>

                {/* PyPI Command */}
                <div className="flex items-center justify-between text-xs bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-mono text-[11px] truncate mr-2">
                    {mod.pypiCommand}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(mod.pypiCommand, `pip-${mod.id}`);
                    }}
                    className="text-slate-400 hover:text-slate-200 transition-colors shrink-0"
                    title="Copy Pip Command"
                  >
                    {copiedIndex === `pip-${mod.id}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Deep-Dive Guide Button */}
              <div className="pt-1 flex items-center justify-between">
                <a
                  href={mod.guideUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center group/guide"
                >
                  <BookOpen className="w-3.5 h-3.5 mr-1" />
                  <span>Technical Guide Article</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover/guide:translate-x-1 transition-transform" />
                </a>

                <span className="text-[11px] text-slate-500">
                  {mod.tools.length} MCP Tools
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connection Down Arrow */}
      <div className="flex justify-center my-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800">
          <ArrowDown className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
          <span>Unified Index & Registration Node</span>
        </div>
      </div>

      {/* Layer 5: Central Hub Box */}
      <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-2xl shrink-0">
            <Globe className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Central Hub Root
              </span>
              <span className="text-xs text-slate-400 font-mono">Directory Master Index</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              SEOSiri MCP Servers Central Directory
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              https://www.seosiri.com/2026/07/seosiri-mcp-servers.html
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={() => handleCopy(CENTRAL_HUB_URL, 'hub-link')}
            className="flex-1 md:flex-initial px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
          >
            {copiedIndex === 'hub-link' ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied Hub Link!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Copy Hub Link</span>
              </>
            )}
          </button>

          <a
            href={CENTRAL_HUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-500/20"
          >
            <span>Visit Hub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>
  );
};

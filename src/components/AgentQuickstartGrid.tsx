import React from 'react';
import { Terminal, FileCode2, Zap } from 'lucide-react';

export const AgentQuickstartGrid: React.FC = () => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6 text-left font-mono">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2 text-white font-bold text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Universal AI Agent Quickstart (Claude Code, Cursor, Windsurf, OpenCode)</span>
        </div>
        <a
          href="/llm.txt"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-sky-400 hover:underline flex items-center gap-1"
        >
          <FileCode2 className="w-3.5 h-3.5" />
          <span>Raw /llm.txt Machine Spec &rarr;</span>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between">
            <strong className="text-sky-400 text-[11px]">Claude Code / Desktop</strong>
            <span className="text-[9px] text-slate-500">CLI / APP</span>
          </div>
          <code className="text-emerald-400 text-[10px] block bg-slate-900 p-1.5 rounded break-all">
            claude mcp add seosiri-aeo uvx seosiri-aeo-geo-mcp
          </code>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between">
            <strong className="text-sky-400 text-[11px]">Cursor AI Editor</strong>
            <span className="text-[9px] text-slate-500">CONFIG TAB</span>
          </div>
          <code className="text-emerald-400 text-[10px] block bg-slate-900 p-1.5 rounded break-all">
            .cursor/mcp.json (Copy from Generator)
          </code>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between">
            <strong className="text-purple-400 text-[11px]">Atlassian Rovo &amp; Jira</strong>
            <span className="text-[9px] text-slate-500">FORGE NATIVE</span>
          </div>
          <code className="text-purple-300 text-[10px] block bg-slate-900 p-1.5 rounded break-all">
            https://rovomcp.seosiri.com/sse
          </code>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between">
            <strong className="text-amber-400 text-[11px]">TypeScript / Node.js</strong>
            <span className="text-[9px] text-slate-500">ZERO-INSTALL</span>
          </div>
          <code className="text-amber-300 text-[10px] block bg-slate-900 p-1.5 rounded break-all">
            npx -y @seosiri/biopharma-mcp
          </code>
        </div>
      </div>
    </div>
  );
};

export default AgentQuickstartGrid;

import React, { useState } from 'react';
import { Terminal, Copy, Check, FileCode2, Sparkles, Cpu, Layers, ExternalLink } from 'lucide-react';

interface OpenSourceMCP {
  id: string;
  name: string;
  runtime: 'uvx' | 'npx';
  package: string;
  category: string;
  toolsCount: number;
}

// All Open-Source & Community MCP Servers (Commercial Guard strictly excluded)
const OPEN_SOURCE_MCPS: OpenSourceMCP[] = [
  { id: 'aeo-geo', name: 'AEO/GEO Intelligence', runtime: 'uvx', package: 'seosiri-aeo-geo-mcp', category: 'AI Search & AEO', toolsCount: 10 },
  { id: 'content-schema', name: 'Content Schema & GA4', runtime: 'uvx', package: 'seosiri-content-schema-mcp', category: 'Schema & Analytics', toolsCount: 13 },
  { id: 'dns-sec', name: 'DNS Security & Audit', runtime: 'uvx', package: 'seosiri-dns-sec-audit-mcp', category: 'DevOps & Security', toolsCount: 10 },
  { id: 'keyword-cluster', name: 'Keyword Clustering & RAG', runtime: 'uvx', package: 'seosiri-keyword-cluster-mcp', category: 'Semantic RAG', toolsCount: 10 },
  { id: 'search-gov', name: 'AI Search Governance', runtime: 'uvx', package: 'seosiri-search-governance-mcp', category: 'AI Search & AEO', toolsCount: 10 },
  { id: 'semantic-entity', name: 'Semantic Entity & Wikidata', runtime: 'uvx', package: 'seosiri-semantic-entity-mcp', category: 'Knowledge Graph', toolsCount: 10 },
  { id: 'biopharma', name: 'Biopharma Software (FDA 21 CFR)', runtime: 'npx', package: '@seosiri/biopharma-mcp', category: 'Life Sciences', toolsCount: 10 },
  { id: 'bioassay', name: 'BioAssay & HTS Automation', runtime: 'uvx', package: 'seosiri-bioassay-mcp', category: 'Life Sciences', toolsCount: 10 },
  { id: 'iaig', name: 'Industrial AI Gateway (ROS 2)', runtime: 'npx', package: '@seosiri/industrial-ai-gateway', category: 'Cyber-Physical', toolsCount: 21 },
  { id: 'etl-pipeline', name: 'Enterprise ETL Pipeline', runtime: 'uvx', package: 'etl-pipeline-mcp', category: 'Data Engineering', toolsCount: 9 },
  { id: 'lambda-pipeline', name: 'Lambda Big Data Ingestion', runtime: 'uvx', package: 'lambda-data-pipeline-mcp', category: 'Data Engineering', toolsCount: 2 },
  { id: 'db-infra', name: 'Database Infra & Postgres', runtime: 'uvx', package: 'seosiri-db-infra-mcp', category: 'Data Engineering', toolsCount: 10 },
  { id: 'ops-comm', name: 'Ops Comm & Sentry Triage', runtime: 'uvx', package: 'seosiri-ops-comm-mcp', category: 'DevOps & SRE', toolsCount: 10 },
  { id: 'vscode-manager', name: 'VS Code Suite Manager', runtime: 'uvx', package: 'seosiri-vscode-mcp-manager', category: 'Developer Tools', toolsCount: 10 },
  { id: 'api-guard', name: 'Universal API Guard', runtime: 'uvx', package: 'seosiri-api-guard', category: 'Security & Hygiene', toolsCount: 10 },
  { id: 'biorobotics', name: 'Bio-Robotics Kinematics', runtime: 'uvx', package: 'seosiri-biorobotics', category: 'Cyber-Physical', toolsCount: 6 },
  { id: 'learning-orch', name: 'EdTech Learning Orchestrator', runtime: 'uvx', package: 'seosiri-learning-orchestrator', category: 'Education & RAG', toolsCount: 8 },
  { id: 'biometric-iot', name: 'Biometric IoT Hardware Bridge', runtime: 'uvx', package: 'biometric-iot-bridge-mcp', category: 'Cyber-Physical', toolsCount: 7 }
];

type TargetAgent = 'claude-code' | 'cursor' | 'windsurf' | 'roo-code' | 'cli-direct';

export const AgentQuickstartGrid: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<TargetAgent>('claude-code');
  const [selectedMcp, setSelectedMcp] = useState<OpenSourceMCP>(OPEN_SOURCE_MCPS[0]);
  const [copied, setCopied] = useState(false);

  // Generate agent-specific configuration snippet
  const getAgentCommand = (mcp: OpenSourceMCP, agent: TargetAgent): string => {
    switch (agent) {
      case 'claude-code':
        return mcp.runtime === 'npx'
          ? `claude mcp add ${mcp.id} npx -y ${mcp.package}`
          : `claude mcp add ${mcp.id} uvx ${mcp.package}`;
      case 'cursor':
        return JSON.stringify({
          mcpServers: {
            [mcp.id]: {
              command: mcp.runtime === 'npx' ? 'npx' : 'uvx',
              args: mcp.runtime === 'npx' ? ['-y', mcp.package] : [mcp.package]
            }
          }
        }, null, 2);
      case 'windsurf':
        return JSON.stringify({
          mcpServers: {
            [mcp.id]: {
              command: mcp.runtime === 'npx' ? 'npx' : 'uvx',
              args: mcp.runtime === 'npx' ? ['-y', mcp.package] : [mcp.package]
            }
          }
        }, null, 2);
      case 'roo-code':
        return JSON.stringify({
          mcpServers: {
            [mcp.id]: {
              command: mcp.runtime === 'npx' ? 'npx' : 'uvx',
              args: mcp.runtime === 'npx' ? ['-y', mcp.package] : [mcp.package]
            }
          }
        }, null, 2);
      case 'cli-direct':
      default:
        return mcp.runtime === 'npx'
          ? `npx -y ${mcp.package}`
          : `uvx ${mcp.package}`;
    }
  };

  const currentSnippet = getAgentCommand(selectedMcp, selectedAgent);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 mb-8 text-left font-mono shadow-2xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Universal AI Agent Quickstart Matrix
            </h3>
            <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] rounded-full">
              All Open-Source MCPs
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-sans">
            One-click configuration for Claude Code, Cursor, Windsurf, Roo Code, and direct CLI runtimes.
          </p>
        </div>

        <a
          href="/llm.txt"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-xl text-xs transition-colors flex items-center gap-1.5 border border-slate-700"
        >
          <FileCode2 className="w-3.5 h-3.5" />
          <span>Raw /llm.txt Machine Spec &rarr;</span>
        </a>
      </div>

      {/* Target Agent Selector Tabs */}
      <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 mb-5">
        {[
          { id: 'claude-code', label: 'Claude Code / Desktop', badge: 'CLI & Desktop' },
          { id: 'cursor', label: 'Cursor IDE', badge: '.cursor/mcp.json' },
          { id: 'windsurf', label: 'Windsurf / Cascade', badge: 'mcp_config.json' },
          { id: 'roo-code', label: 'Roo Code / Cline', badge: 'VS Code Ext' },
          { id: 'cli-direct', label: 'Direct CLI (uvx / npx)', badge: 'Zero-Install' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedAgent(tab.id as TargetAgent)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              selectedAgent === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-[9px] opacity-70 hidden sm:inline">({tab.badge})</span>
          </button>
        ))}
      </div>

      {/* Quick-Picker: Select Any Open-Source MCP */}
      <div className="mb-4">
        <label className="block text-[11px] text-slate-400 mb-2 font-sans font-semibold">
          Select Open-Source MCP Module to Generate Snippet:
        </label>
        <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1.5 bg-slate-950 rounded-2xl border border-slate-800/80">
          {OPEN_SOURCE_MCPS.map(mcp => (
            <button
              key={mcp.id}
              onClick={() => setSelectedMcp(mcp)}
              className={`px-2.5 py-1 rounded-lg text-[10px] transition-all flex items-center gap-1 ${
                selectedMcp.id === mcp.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <span>{mcp.name}</span>
              <span className="text-[9px] text-slate-500">[{mcp.runtime}]</span>
            </button>
          ))}
        </div>
      </div>

      {/* Generated Output Code Block */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 relative">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span>Target: <strong className="text-white">{selectedMcp.name}</strong> ({selectedMcp.package})</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400">{selectedMcp.toolsCount} Tools</span>
          </div>

          <button
            onClick={handleCopy}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[10px] flex items-center gap-1 transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied!' : 'Copy Snippet'}</span>
          </button>
        </div>

        <pre className="text-xs text-sky-300 overflow-x-auto p-2 bg-slate-900/60 rounded-xl m-0 whitespace-pre-wrap break-all leading-relaxed">
          {currentSnippet}
        </pre>
      </div>
    </div>
  );
};

export default AgentQuickstartGrid;

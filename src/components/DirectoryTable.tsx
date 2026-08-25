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
  Search, 
  Sparkles,
  ShieldCheck,
  FileCode2,
  Network,
  Building2,
  ChevronRight
} from 'lucide-react';

interface DirectoryTableProps {
  searchQuery?: string;
  selectedCategory?: string;
  modules?: MCPModule[];
  onSelectModule: (module: MCPModule) => void;
}

export const DirectoryTable: React.FC<DirectoryTableProps> = ({
  searchQuery = '',
  selectedCategory = 'all',
  modules,
  onSelectModule
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const displayModules = modules || MCP_MODULES;
  const filteredModules = displayModules.filter((m) => {
    const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
    const q = (searchQuery || '').toLowerCase();
    const matchesQuery =
      !searchQuery ||
      (m.title && m.title.toLowerCase().includes(q)) ||
      (m.pypiPackage && m.pypiPackage.toLowerCase().includes(q)) ||
      (m.edgeGateway && m.edgeGateway.toLowerCase().includes(q)) ||
      (m.description && m.description.toLowerCase().includes(q)) ||
      (m.tools && m.tools.some((t) => t.name && t.name.toLowerCase().includes(q)));

    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Central Hub Quick Reference Card */}
      <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-slate-900 border border-blue-500/30 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl shrink-0">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">
                Central Directory Hub
              </span>
              <span className="text-xs text-slate-400 font-mono">Master Index URL</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              SEOSiri MCP Servers Directory
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {CENTRAL_HUB_URL}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <button
            onClick={() => handleCopy(CENTRAL_HUB_URL, 'hub')}
            className="flex-1 md:flex-initial px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
          >
            {copiedKey === 'hub' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
            <span>{copiedKey === 'hub' ? 'Copied Hub URL' : 'Copy Hub URL'}</span>
          </button>

          <a
            href={CENTRAL_HUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-lg shadow-blue-500/20 transition-all"
          >
            <span>Visit Hub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              MCP Servers & Endpoints Directory ({filteredModules.length})
            </h3>
            <p className="text-xs text-slate-400">
              Complete index of deep-dive technical guides, PyPI packages, and Cloudflare Edge gateways.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-6">MCP Server Suite</th>
                <th className="py-3.5 px-4">Cloudflare Edge Gateway</th>
                <th className="py-3.5 px-4">PyPI Package Install</th>
                <th className="py-3.5 px-4">Technical Guide Article</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredModules.map((m) => (
                <tr
                  key={m.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Module Name & Tools */}
                  <td className="py-4 px-6">
                    <div className="flex items-start space-x-3">
                      <div
                        className="p-2 rounded-lg border mt-0.5 shrink-0"
                        style={{
                          backgroundColor: `${m.color}15`,
                          borderColor: `${m.color}30`,
                          color: m.color
                        }}
                      >
                        {m.id === 'aeo-geo' && <Sparkles className="w-4 h-4" />}
                        {m.id === 'content-schema' && <FileCode2 className="w-4 h-4" />}
                        {m.id === 'dns-sec' && <ShieldCheck className="w-4 h-4" />}
                        {m.id === 'keyword-rag' && <Network className="w-4 h-4" />}
                        {m.id === 'search-governance' && <Building2 className="w-4 h-4" />}
                      </div>

                      <div>
                        <button
                          onClick={() => onSelectModule(m)}
                          className="font-bold text-white group-hover:text-blue-300 transition-colors text-left"
                        >
                          {m.title}
                        </button>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono border ${m.badgeBg} ${m.badgeText}`}>
                            {m.status}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {m.tools.length} Tools
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Edge Gateway */}
                  <td className="py-4 px-4 font-mono">
                    <div className="flex items-center space-x-1.5">
                      <Zap className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <a
                        href={m.edgeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 hover:underline"
                      >
                        {m.edgeGateway}
                      </a>
                      <button
                        onClick={() => handleCopy(m.edgeGateway, `edge-${m.id}`)}
                        className="p-1 hover:bg-slate-800 text-slate-500 hover:text-slate-200 rounded transition-colors"
                        title="Copy Edge Host"
                      >
                        {copiedKey === `edge-${m.id}` ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* PyPI Command */}
                  <td className="py-4 px-4 font-mono">
                    <div className="bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 flex items-center justify-between max-w-xs">
                      <span className="text-cyan-300 text-[11px] truncate mr-2">
                        {m.pypiCommand}
                      </span>
                      <button
                        onClick={() => handleCopy(m.pypiCommand, `pip-${m.id}`)}
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                        title="Copy Pip Command"
                      >
                        {copiedKey === `pip-${m.id}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Technical Guide Article */}
                  <td className="py-4 px-4 font-mono">
                    <a
                      href={m.guideUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 flex items-center space-x-1 group/guide"
                    >
                      <BookOpen className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate max-w-[180px]">
                        {m.guideUrl.split('/').pop()}
                      </span>
                      <ExternalLink className="w-3 h-3 shrink-0 opacity-70 group-hover/guide:opacity-100" />
                    </a>
                  </td>

                  {/* Inspect Action */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => onSelectModule(m)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold inline-flex items-center space-x-1 transition-all"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

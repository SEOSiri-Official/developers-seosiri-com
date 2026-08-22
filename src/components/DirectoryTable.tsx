import React, { useState } from 'react';
import { MCP_MODULES, CENTRAL_HUB_URL } from '../data/mcpData';
import { MCPModule } from '../types';
import { 
  Globe, BookOpen, ExternalLink, Copy, Check, Search, Sparkles, 
  ShieldCheck, FileCode2, Network, Building2, ChevronRight, Zap 
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
      <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-slate-900 border border-blue-500/30 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl shrink-0">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">Central Directory Hub</span>
              <span className="text-xs text-slate-400 font-mono">Master Index URL</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">SEOSiri MCP Servers Directory</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{CENTRAL_HUB_URL}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <button onClick={() => handleCopy(CENTRAL_HUB_URL, 'hub')} className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2">
            {copiedKey === 'hub' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedKey === 'hub' ? 'Copied' : 'Copy Hub'}</span>
          </button>
          <a href={CENTRAL_HUB_URL} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg">
            <span>Visit Hub</span><ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800">
          <h3 className="text-base font-bold text-white">
            MCP Servers & Endpoints Directory ({filteredModules.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-6">MCP Server Suite</th>
                <th className="py-3.5 px-4">Cloudflare Edge Gateway</th>
                <th className="py-3.5 px-4">PyPI Package Install</th>
                <th className="py-3.5 px-4">Technical Guide</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredModules.map((m) => (
                <tr key={m.id} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="py-4 px-6">
                    <button onClick={() => onSelectModule(m)} className="font-bold text-white hover:text-blue-300 text-left block">
                      {m.title}
                    </button>
                    <span className="text-[11px] text-slate-400 font-mono">{m.tools?.length || 0} Tools</span>
                  </td>
                  <td className="py-4 px-4 font-mono text-orange-400">{m.edgeGateway}</td>
                  <td className="py-4 px-4 font-mono text-cyan-300">{m.pypiCommand}</td>
                  <td className="py-4 px-4 font-mono text-purple-400">{m.guideUrl.split('/').pop()}</td>
                  <td className="py-4 px-6 text-right">
                    <button onClick={() => onSelectModule(m)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold">
                      Inspect
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
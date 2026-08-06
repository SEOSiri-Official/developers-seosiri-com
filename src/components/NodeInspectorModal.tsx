import React, { useState } from 'react';
import { MCPModule, GraphNode } from '../types';
import { 
  X, 
  Globe, 
  Terminal, 
  Zap, 
  BookOpen, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles,
  ShieldCheck,
  FileCode2,
  Network,
  Building2,
  Code2,
  Key
} from 'lucide-react';

interface NodeInspectorModalProps {
  module: MCPModule | null;
  node: GraphNode | null;
  onClose: () => void;
}

export const NodeInspectorModal: React.FC<NodeInspectorModalProps> = ({
  module,
  node,
  onClose
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!module && !node) return null;

  const m = module || node?.moduleRef;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full overflow-y-auto p-6 space-y-6 shadow-2xl flex flex-col justify-between">
        
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              {m ? (
                <div
                  className="p-3 rounded-2xl border shrink-0"
                  style={{
                    backgroundColor: `${m.color}15`,
                    borderColor: `${m.color}30`,
                    color: m.color
                  }}
                >
                  {m.id === 'aeo-geo' && <Sparkles className="w-6 h-6" />}
                  {m.id === 'content-schema' && <FileCode2 className="w-6 h-6" />}
                  {m.id === 'dns-sec' && <ShieldCheck className="w-6 h-6" />}
                  {m.id === 'keyword-rag' && <Network className="w-6 h-6" />}
                  {m.id === 'search-governance' && <Building2 className="w-6 h-6" />}
                </div>
              ) : (
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-2xl shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
              )}

              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {node?.type || 'MCP Server Module'}
                  </span>
                  {m && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${m.badgeBg} ${m.badgeText}`}>
                      {m.status}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-white mt-1">
                  {m ? m.title : node?.label}
                </h2>
                {m && <p className="text-xs text-slate-400 font-mono">Package Version v{m.version}</p>}
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Description */}
          {m && (
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overview</h3>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                {m.description}
              </p>
            </div>
          )}

          {/* Core Specs Grid */}
          {m && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Cloudflare Edge Gateway */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[11px] text-slate-400 font-medium flex items-center">
                  <Zap className="w-3.5 h-3.5 text-orange-400 mr-1" />
                  Cloudflare Edge Gateway
                </span>
                <div className="flex items-center justify-between">
                  <a
                    href={m.edgeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-orange-400 hover:underline flex items-center truncate mr-2"
                  >
                    <span className="truncate">{m.edgeGateway}</span>
                    <ExternalLink className="w-3 h-3 ml-1 shrink-0" />
                  </a>
                  <button
                    onClick={() => handleCopy(m.edgeUrl, 'edge')}
                    className="p-1 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded transition-colors shrink-0"
                    title="Copy Edge URL"
                  >
                    {copiedKey === 'edge' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* PyPI Command */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[11px] text-slate-400 font-medium flex items-center">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400 mr-1" />
                  PyPI Package Command
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300 truncate mr-2">
                    {m.pypiCommand}
                  </span>
                  <button
                    onClick={() => handleCopy(m.pypiCommand, 'pip')}
                    className="p-1 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded transition-colors shrink-0"
                    title="Copy Pip Command"
                  >
                    {copiedKey === 'pip' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Deep-Dive Guide Button Banner */}
          {m && (
            <a
              href={m.guideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-900/30 via-slate-900 to-slate-900 border border-purple-500/30 hover:border-purple-500/60 rounded-2xl transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                    Technical Guide & Documentation Article
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono truncate max-w-sm mt-0.5">
                    {m.guideUrl}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-purple-400 opacity-70 group-hover:opacity-100 shrink-0" />
            </a>
          )}

          {/* MCP Tools Provided */}
          {m && m.tools && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center">
                <Code2 className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                Provided MCP Tools ({m.tools.length})
              </h3>

              <div className="space-y-2.5">
                {m.tools.map((t) => (
                  <div
                    key={t.name}
                    className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono text-cyan-300">
                        {t.name}
                      </span>
                      <button
                        onClick={() => handleCopy(t.name, `tool-${t.name}`)}
                        className="text-[11px] text-slate-500 hover:text-slate-300 font-mono flex items-center"
                      >
                        {copiedKey === `tool-${t.name}` ? (
                          <Check className="w-3 h-3 text-emerald-400 mr-1" />
                        ) : (
                          <Copy className="w-3 h-3 mr-1" />
                        )}
                        <span>{copiedKey === `tool-${t.name}` ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-400">{t.description}</p>

                    <div className="bg-slate-900 p-2 rounded-lg text-[11px] font-mono text-slate-300 overflow-x-auto">
                      <span className="text-slate-500">// Sample Arguments:</span>
                      <pre className="mt-0.5 text-slate-300">{t.sampleInput}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Environment Variables */}
          {m && m.envVars && m.envVars.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center">
                <Key className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                Environment Configuration
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {m.envVars.map((v) => (
                  <span
                    key={v}
                    className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-lg text-xs font-mono"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Close */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">SEOSiri MCP Suite Spec</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-all"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};

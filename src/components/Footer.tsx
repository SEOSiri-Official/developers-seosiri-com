import React from 'react';
import { CENTRAL_HUB_URL, LEAD_ARCHITECT, OFFICIAL_CORPORATE_EMAIL, TOTAL_MCP_TOOLS_COUNT } from '../data/mcpData';
import { ViewMode } from '../types';
import { ExternalLink, ShieldCheck, Mail, Github, Sparkles, FileText, Lock, Zap, Network } from 'lucide-react';

interface FooterProps {
  onViewChange: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-10 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Streamlined 3-Column Corporate Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Col 1: Brand Tagline & Lead Architect */}
          <div className="space-y-2 text-left">
            <h4 className="text-white font-bold text-sm tracking-tight">SEOSiri Enterprise Labs</h4>
            <p className="text-[11px] text-emerald-400 font-mono">
              Developers and Development Resources by SEOSiri
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">
              Sovereign, local-first Model Context Protocol (MCP) tooling for AI search governance, bionics, big data pipelines, and hardware actuation.
            </p>
          </div>

          {/* Col 2: Compliance & Onsite Policies */}
          <div className="space-y-2 text-left">
            <h4 className="text-slate-200 font-bold uppercase text-[10px] tracking-wider font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Compliance &amp; Onsite Policies
            </h4>
            <ul className="space-y-1.5 text-[11px] font-sans">
              <li>
                <button onClick={() => onViewChange('custom-mcp')} className="text-sky-400 font-bold hover:underline flex items-center gap-1 text-left">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Custom Enterprise MCP Services</span>
                </button>
              </li>
              <li>
                <button onClick={() => onViewChange('privacy')} className="hover:text-slate-200 transition-colors flex items-center gap-1 text-left">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button onClick={() => onViewChange('disclaimer')} className="hover:text-slate-200 transition-colors flex items-center gap-1 text-left">
                  <FileText className="w-3 h-3 text-slate-400" />
                  <span>Disclaimer &amp; Usage Terms</span>
                </button>
              </li>
              <li>
                <button onClick={() => onViewChange('assets')} className="hover:text-slate-200 transition-colors flex items-center gap-1 text-left">
                  <FileText className="w-3 h-3 text-slate-400" />
                  <span>Brand Assets &amp; Use Cases Policy</span>
                </button>
              </li>
              <li>
                <button onClick={() => onViewChange('sitemap')} className="hover:text-slate-200 transition-colors flex items-center gap-1 text-left text-slate-400">
                  <Network className="w-3 h-3 text-blue-400" />
                  <span>Sitemap &amp; LLM.txt Index</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation & Portals */}
          <div className="space-y-2 text-left">
            <h4 className="text-slate-200 font-bold uppercase text-[10px] tracking-wider font-mono flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              Official Portals
            </h4>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <a
                href={CENTRAL_HUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600/20 rounded-lg font-bold transition-all flex items-center gap-1"
              >
                <span>Central Directory Hub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={LEAD_ARCHITECT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-lg font-mono transition-all flex items-center gap-1"
              >
                <Github className="w-3 h-3" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.seosiri.com/p/subscribe.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-all border border-emerald-500/40"
              >
                Subscribe Newsletter &rarr;
              </a>
            </div>
          </div>

        </div>

        {/* Continuous Innovation Commitment Hook Banner */}
        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl text-xs font-mono text-sky-400 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="m-0 leading-relaxed text-[11px] text-left">
            <strong className="text-white">Continuous Innovation Commitment:</strong> Building and shipping new sovereign, local-first MCP servers, VS Code extensions, and developer tooling every sprint to keep your AI agents ahead of algorithm shifts.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <p className="text-slate-400 text-center sm:text-left m-0">
            © {new Date().getFullYear()} SEOSiri Enterprise Labs. Designed by <a href="https://www.seosiri.com/p/about.html" target="_blank" rel="noopener noreferrer" className="text-slate-200 font-bold hover:text-sky-400 transition-colors">{LEAD_ARCHITECT.name}</a>. Licensed under MIT Open Source.
          </p>
          
        </div>

      </div>
    </footer>
  );
};

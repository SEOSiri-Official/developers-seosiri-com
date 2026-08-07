import React from 'react';
import { CENTRAL_HUB_URL, DEVELOPERS_SUBDOMAIN, LEAD_ARCHITECT, OFFICIAL_CORPORATE_EMAIL, TOTAL_MCP_TOOLS_COUNT } from '../data/mcpData';
import { ViewMode } from '../types';
import { Globe, Terminal, ExternalLink, Network, Server, ShieldCheck, Mail, Github } from 'lucide-react';

interface FooterProps {
  onViewChange: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Main Grid: 5 Enterprise Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Lead Architect Card & Brand */}
          <div className="space-y-3 lg:col-span-1">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <Server className="w-4 h-4 text-blue-400" />
              <span>developers.seosiri.com</span>
            </div>
            
            {/* Architect Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center space-x-3">
                <img 
  src="https://github.com/MOBILEPHONE.png" 
  alt="Momenul Ahmad - Lead Architect & SEOSiri Founder" 
  title="Momenul Ahmad"
  className="w-12 h-12 rounded-full border-2 border-sky-400 object-cover"
  onError={(e) => {
    // Fallback to GitHub avatar if local image fails
    (e.target as HTMLImageElement).src = "https://github.com/MOBILEPHONE.png";
  }}
/>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Lead Architect</span>
                  <h5 className="font-bold text-slate-200 text-xs truncate">{LEAD_ARCHITECT.name}</h5>
                  <span className="text-[10px] font-mono text-emerald-400 block">SEOSiri Founder</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                Architect of the 15-package open-source Model Context Protocol suite.
              </p>
            </div>

            <div className="space-y-1 font-mono text-[11px]">
              <div className="flex items-center space-x-1.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Desk:</span>
                <a href={`mailto:${OFFICIAL_CORPORATE_EMAIL}`} className="text-emerald-400 font-bold hover:underline">
                  {OFFICIAL_CORPORATE_EMAIL}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Developer Portal Views */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-bold uppercase text-[10px] tracking-wider font-mono flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-blue-400" />
              Developer Views
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => onViewChange('topology')} className="hover:text-blue-400 transition-colors">
                  Topology Graph (15 Servers)
                </button>
              </li>
              <li>
                <button onClick={() => onViewChange('docs')} className="hover:text-blue-400 font-semibold text-blue-400/90 transition-colors">
                  Dedicated Docs ({TOTAL_MCP_TOOLS_COUNT} Tools)
                </button>
              </li>
              <li>
                <button onClick={() => onViewChange('matrix')} className="hover:text-blue-400 transition-colors">
                  Architecture Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onViewChange('config')} className="hover:text-blue-400 transition-colors">
                  MCP Client Config Generator
                </button>
              </li>
              <li>
                <button onClick={() => onViewChange('table')} className="hover:text-blue-400 transition-colors">
                  Directory & PyPI Packages
                </button>
              </li>
              <li>
                <button onClick={() => onViewChange('tester')} className="hover:text-blue-400 transition-colors">
                  Live Endpoint Tester
                </button>
              </li>
              <li>
                <button onClick={() => onViewChange('architect')} className="hover:text-blue-400 transition-colors">
                  Lead Architect Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: PyPI Package Family */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-bold uppercase text-[10px] tracking-wider font-mono flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              PyPI Package Family
            </h4>
            <ul className="space-y-1 text-[11px] font-mono text-slate-300">
              <li className="text-cyan-300 font-semibold">seosiri-aeo-geo-mcp</li>
              <li className="text-cyan-300 font-semibold">seosiri-content-schema-mcp</li>
              <li className="text-cyan-300 font-semibold">seosiri-dns-sec-audit-mcp</li>
              <li className="text-cyan-300 font-semibold">seosiri-keyword-cluster-mcp</li>
              <li className="text-cyan-300 font-semibold">seosiri-search-governance-mcp</li>
              <li className="text-cyan-300 font-semibold">seosiri-core-web-vitals-mcp</li>
              <li className="text-slate-400 font-sans">+9 more PyPI packages</li>
            </ul>
          </div>

          {/* Col 4: Unified Edge Gateway & Protocol Specs */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-bold uppercase text-[10px] tracking-wider font-mono flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              10 Official Edge Gateways
            </h4>
            <div className="space-y-1.5 text-[11px]">
              <p className="text-slate-400 leading-relaxed font-sans">
                Official Cloudflare Edge Gateways (*.seosiri.com) for deployed MCP servers.
              </p>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 font-mono text-[10px] space-y-1 text-slate-300">
                <span className="text-amber-300 block font-bold">mcp.seosiri.com</span>
                <span className="text-amber-300 block font-bold">aeo.seosiri.com</span>
                <span className="text-amber-300 block font-bold">schema.seosiri.com ...</span>
                <span className="text-emerald-400 block font-bold">Status: All 10 Gateways Live</span>
              </div>
            </div>
          </div>

          {/* Col 5: Security & Corporate Links */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-bold uppercase text-[10px] tracking-wider font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Corporate Links
            </h4>
            <div className="space-y-2">
              <a
                href={CENTRAL_HUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600/20 rounded-xl block text-[11px] font-bold transition-all"
              >
                <div className="flex items-center justify-between">
                  <span>Central Directory Hub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
              <a
                href={LEAD_ARCHITECT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl block text-[11px] font-mono transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-slate-300" />
                    <span>SEOSiri GitHub</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </a>
            </div>
          </div>

        </div>
<a 
  href="https://www.seosiri.com/p/subscribe.html" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5 shadow-md"
>
  <span>Subscribe Newsletter</span>
  <span>&rarr;</span>
</a>
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <p className="text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} SEOSiri Enterprise Labs. Designed by <strong className="text-slate-300">{LEAD_ARCHITECT.name}</strong>. Licensed under MIT Open Source.
          </p>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>15 MCP Packages</span>
            <span>•</span>
            <span className="text-amber-300 font-bold">{TOTAL_MCP_TOOLS_COUNT} Tools Total</span>
            <span>•</span>
            <a href={`mailto:${OFFICIAL_CORPORATE_EMAIL}`} className="text-emerald-400 font-bold hover:underline">
              {OFFICIAL_CORPORATE_EMAIL}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

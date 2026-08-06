import React from 'react';
import { CENTRAL_HUB_URL, DEVELOPERS_SUBDOMAIN, LEAD_ARCHITECT, OFFICIAL_CORPORATE_EMAIL, TOTAL_MCP_TOOLS_COUNT } from '../data/mcpData';
import { ExternalLink, Terminal, Shield, Zap, Sparkles, Server, UserCheck, Mail, CheckCircle2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="bg-slate-900 border-b border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-blue-500/10 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Brand & Subdomain Info */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center">
                <Server className="w-3.5 h-3.5 mr-1" />
                developers.seosiri.com
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                15 PyPI Packages • {TOTAL_MCP_TOOLS_COUNT} MCP Tools
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center">
                <Mail className="w-3.5 h-3.5 mr-1" />
                {OFFICIAL_CORPORATE_EMAIL}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              SEOSiri 15-Module Model Context Protocol (MCP) Suite
            </h1>

            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Official enterprise developer portal & Cloudflare edge topology for AI Search Governance, AEO/GEO Analytics, Schema Validation, Core Web Vitals, DNS Security, and Autonomous AI Agent Tooling for Claude Desktop, Cursor AI, and enterprise AI engines.
            </p>
          </div>

          {/* Lead Architect Badge & Corporate CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            {/* Architect Avatar Mini-Card */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-blue-500/40 shrink-0">
                <img 
  src="/momenul-ahmad.png" 
  alt="Momenul Ahmad - Lead Architect & SEOSiri Founder" 
  title="Momenul Ahmad"
  className="w-12 h-12 rounded-full border-2 border-sky-400 object-cover"
  onError={(e) => {
    // Fallback to GitHub avatar if local image fails
    (e.target as HTMLImageElement).src = "https://github.com/MOBILEPHONE.png";
  }}
/>
              </div>
              <div className="text-left font-mono text-xs">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Lead Architect</span>
                <span className="text-white font-bold">{LEAD_ARCHITECT.name}</span>
                <span className="text-emerald-400 text-[10px] block">SEOSiri Founder</span>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <a
                href={CENTRAL_HUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2 border border-blue-400/20"
              >
                <span>Central Directory Hub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="text-[10px] text-slate-400 font-mono text-center">
                Edge Gateway: <strong className="text-slate-200">{DEVELOPERS_SUBDOMAIN}</strong>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

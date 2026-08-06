import React from 'react';
import { LEAD_ARCHITECT, CENTRAL_HUB_URL, DEVELOPERS_SUBDOMAIN, OFFICIAL_CORPORATE_EMAIL, TOTAL_MCP_TOOLS_COUNT } from '../data/mcpData';
import { 
  Award, 
  Code, 
  ExternalLink, 
  Github, 
  Globe, 
  CheckCircle2, 
  Cpu, 
  Sparkles,
  Server,
  ShieldCheck,
  Mail
} from 'lucide-react';

export const ArchitectProfile: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Lead Architect Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          
          {/* Momenul Ahmad Photo & Badges */}
          <div className="flex flex-col items-center text-center space-y-4 shrink-0 mx-auto md:mx-0">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-1 shadow-xl shadow-blue-500/20 overflow-hidden">
                <img
                  src={LEAD_ARCHITECT.avatarUrl}
                  alt={LEAD_ARCHITECT.name}
                  className="w-full h-full object-cover rounded-[14px]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/seosiri/assets/main/momenul-ahmad.jpg';
                  }}
                />
              </div>
              <span className="absolute -bottom-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-500 text-slate-950 border border-emerald-400 shadow-md">
                VERIFIED
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <a
                href={LEAD_ARCHITECT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl transition-all text-xs font-mono flex items-center space-x-1.5"
                title="GitHub Repositories"
              >
                <Github className="w-3.5 h-3.5 text-slate-200" />
                <span>GitHub</span>
              </a>
              <a
                href={LEAD_ARCHITECT.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl transition-all text-xs font-mono flex items-center space-x-1.5"
                title="SEOSiri Main Portal"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>SEOSiri</span>
              </a>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 flex-1">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  Lead Systems Architect
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Founder @ SEOSiri
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  15 MCP Packages • {TOTAL_MCP_TOOLS_COUNT} MCP Tools
                </span>
              </div>
              
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                {LEAD_ARCHITECT.name}
              </h2>
              <p className="text-sm font-semibold text-slate-300 font-mono">
                {LEAD_ARCHITECT.title} • SEOSiri Enterprise MCP Infrastructure Suite
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-blue-500 pl-4 py-1 bg-slate-950/40 rounded-r-xl">
              "{LEAD_ARCHITECT.bio}"
            </p>

            {/* Email Box */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs font-mono text-slate-300">
              <div className="flex items-center space-x-2 text-blue-400 font-bold">
                <Mail className="w-4 h-4" />
                <span>Official Corporate Contact Desk</span>
              </div>
              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Official Enterprise Email</span>
                  <a href={`mailto:${OFFICIAL_CORPORATE_EMAIL}`} className="text-base font-bold text-emerald-400 hover:underline flex items-center gap-1.5">
                    {OFFICIAL_CORPORATE_EMAIL}
                  </a>
                </div>
                <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  Verified Desk
                </span>
              </div>
            </div>

            {/* Core Accomplishments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center">
                  <Code className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                  Architectural Contributions
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {LEAD_ARCHITECT.keyContributions.map((c, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center">
                  <Award className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  Certifications & Standards
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {LEAD_ARCHITECT.certifications.map((cert, i) => (
                    <li key={i} className="flex items-start">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400 mr-1.5 shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* SEOSiri Enterprise Protocol Manifesto */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs text-blue-400 font-mono uppercase tracking-widest font-bold block">
            Enterprise Manifesto by Momenul Ahmad
          </span>
          <h3 className="text-xl font-bold text-white mt-1">
            The SEOSiri 15-Server Model Context Protocol (MCP) Standard
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300">
          <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="p-2 w-fit bg-blue-500/10 rounded-lg text-blue-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">1. Autonomous LLM Tooling</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standardizing {TOTAL_MCP_TOOLS_COUNT} specialized LLM tools across Claude Desktop, Cursor AI, and synthetic search agents so AI engines reason directly over live SEO, DNS, and Knowledge Graph data.
            </p>
          </div>

          <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="p-2 w-fit bg-emerald-500/10 rounded-lg text-emerald-400">
              <Server className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">2. Dedicated Edge Gateways</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deploying low-latency SSE JSON-RPC endpoints on Cloudflare Edge Workers behind dedicated domain gateways (<code className="text-amber-300 font-mono">aeo.seosiri.com</code>, <code className="text-amber-300 font-mono">schema.seosiri.com</code>, etc.).
            </p>
          </div>

          <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="p-2 w-fit bg-purple-500/10 rounded-lg text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">3. AEO & GEO Optimization</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transitioning traditional SEO into Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) to dominate citation visibility in ChatGPT, Gemini, and Perplexity.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 text-xs">
          <div className="text-slate-400 font-mono">
            Official Enterprise Desk: <a href={`mailto:${OFFICIAL_CORPORATE_EMAIL}`} className="text-emerald-400 underline font-bold hover:text-emerald-300">{OFFICIAL_CORPORATE_EMAIL}</a>
          </div>
          <a
            href={CENTRAL_HUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl flex items-center space-x-2 transition-all"
          >
            <span>Explore Official Central Directory</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

    </div>
  );
};

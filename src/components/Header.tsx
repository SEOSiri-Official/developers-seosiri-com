import React from 'react';
import { CENTRAL_HUB_URL, DEVELOPERS_SUBDOMAIN, LEAD_ARCHITECT, OFFICIAL_CORPORATE_EMAIL, TOTAL_MCP_TOOLS_COUNT } from '../data/mcpData';
import { ExternalLink, Terminal, Shield, Zap, Sparkles, Server, UserCheck, Mail, CheckCircle2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="bg-slate-900 border-b border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-blue-500/10 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
         

            {/* Title with Brand Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="https://avatars.githubusercontent.com/u/247144822?s=200&v=4" 
                alt="SEOSiri Logo" 
                title="SEOSiri Logo"
                className="w-9 h-9 rounded-md object-contain bg-slate-950 p-1 border border-slate-700 shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                SEOSiri Model Context Protocol (MCP) Suite
              </h1>
            </div>

            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Official enterprise developer portal &amp; Cloudflare edge topology for AI Search Governance, AEO/GEO Analytics, Schema Validation, Core Web Vitals, DNS Security, and Autonomous AI Agent Tooling for Claude Desktop, Cursor AI, and enterprise AI engines.
            </p>

           
    </div>

          

        </div>
      </div>
    </div>
  );
};
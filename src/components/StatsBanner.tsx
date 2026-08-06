import React from 'react';
import { MCP_MODULES, LEAD_ARCHITECT, OFFICIAL_EDGE_GATEWAYS } from '../data/mcpData';
import { ViewMode } from '../types';
import { Server, Package, Globe, Shield, Activity, UserCheck, Sparkles } from 'lucide-react';

interface StatsBannerProps {
  onViewChange: (view: ViewMode) => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ onViewChange }) => {
  const activeCount = MCP_MODULES.filter((m) => !m.isUpcoming).length;
  const upcomingCount = MCP_MODULES.filter((m) => m.isUpcoming).length;
  const totalTools = MCP_MODULES.reduce((acc, m) => acc + m.tools.length, 0);

  return (
    <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        
        {/* Left Stats Badges */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <Server className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-400">Active MCP Servers:</span>
            <span className="text-white font-bold">{activeCount} Published</span>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <Package className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">PyPI Packages:</span>
            <span className="text-cyan-300 font-bold">{activeCount} Packages</span>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <Globe className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-slate-400">Edge Gateways:</span>
            <span className="text-orange-300 font-bold">{OFFICIAL_EDGE_GATEWAYS.length} Official Gateways</span>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <Activity className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-400">Total MCP Tools:</span>
            <span className="text-purple-300 font-bold">{totalTools} Autonomous Tools</span>
          </div>
        </div>

        {/* Right Architect Info & Quick Nav */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onViewChange('architect')}
            className="flex items-center space-x-1.5 text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-800 transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-semibold">Lead Architect: Momenul Ahmad</span>
          </button>
        </div>

      </div>
    </div>
  );
};

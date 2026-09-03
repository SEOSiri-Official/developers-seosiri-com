import React from 'react';
import { LEAD_ARCHITECT } from '../data/mcpData';
import { ViewMode } from '../types';
import { Server, Package, Globe, Cpu, UserCheck } from 'lucide-react';

interface StatsBannerProps {
  onViewChange: (view: ViewMode) => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ onViewChange }) => {
  return (
    <div className="bg-slate-950/80 border-b border-slate-800/80 py-2.5 px-4 sm:px-6 lg:px-8 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Metric Badges Group matching your exact system design */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg flex items-center space-x-2">
            <Server className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-400">Active MCP Servers:</span>
            <strong className="text-white font-bold">20 Published</strong>
          </div>

          <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg flex items-center space-x-2">
            <Package className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">NPM &amp; PyPI Packages:</span>
            <strong className="text-cyan-300 font-bold">20 Packages (+ Atlassian App)</strong>
          </div>

          <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg flex items-center space-x-2">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Edge Gateways:</span>
            <strong className="text-amber-300 font-bold">13 Official Gateways</strong>
          </div>

          <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg flex items-center space-x-2">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-400">Total MCP Tools:</span>
            <strong className="text-purple-300 font-bold">{TOTAL_MCP_TOOLS_COUNT} Autonomous Tools</strong>
          </div>
        </div>

        {/* Lead Architect Quick Tag */}
        <button
          onClick={() => onViewChange('architect')}
          className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors flex items-center space-x-1.5"
        >
          <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Lead Architect: <strong className="text-white">{LEAD_ARCHITECT.name}</strong></span>
        </button>

      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Compass, ChevronDown, ChevronUp, CheckCircle2, ArrowRight, X, Sparkles } from 'lucide-react';
import { ViewMode } from '../types';

interface EducationalJourneyProps {
  onViewChange: (view: ViewMode) => void;
}

export const EducationalJourneyBanner: React.FC<EducationalJourneyProps> = ({ onViewChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm sm:max-w-md font-sans">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl shadow-2xl border border-blue-400/30 text-xs font-bold font-mono transition-all animate-bounce"
        >
          <Compass className="w-4 h-4 text-amber-300" />
          <span>Start Developer Journey &amp; Guide</span>
          <span className="px-1.5 py-0.5 bg-amber-400 text-slate-950 rounded text-[10px]">4 Steps</span>
        </button>
      ) : (
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-3xl shadow-2xl space-y-4 text-left border-blue-500/40">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-white font-bold text-xs font-mono">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>SEOSiri Developer Journey Guide</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white text-xs p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800/80 space-y-1">
              <div className="text-sky-400 font-bold flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px]">1</span>
                <span>Discover Topology &amp; 199 Tools</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">Explore nodes in the interactive D3 graph or search by functional keywords.</p>
            </div>

            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800/80 space-y-1">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">2</span>
                <span>One-Click Config Generator</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">Copy zero-install JSON snippets for Claude Desktop and Cursor IDE.</p>
              <button onClick={() => { onViewChange('config'); setIsOpen(false); }} className="text-[11px] text-sky-400 hover:underline flex items-center gap-1 font-bold">
                Launch Config Generator &rarr;
              </button>
            </div>

            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800/80 space-y-1">
              <div className="text-purple-400 font-bold flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[10px]">3</span>
                <span>Edge Sandbox Testing</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">Simulate live JSON-RPC 2.0 tool calls across all 13 Cloudflare edge gateways.</p>
              <button onClick={() => { onViewChange('tester'); setIsOpen(false); }} className="text-[11px] text-sky-400 hover:underline flex items-center gap-1 font-bold">
                Open Endpoint Tester &rarr;
              </button>
            </div>

            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800/80 space-y-1">
              <div className="text-amber-400 font-bold flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px]">4</span>
                <span>Enterprise Shield &amp; Productivity</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">Deploy automated PII scrubbing (guard.seosiri.com) and cut team tooling bills.</p>
              <button onClick={() => { onViewChange('productivity-manual'); setIsOpen(false); }} className="text-[11px] text-amber-300 hover:underline flex items-center gap-1 font-bold">
                Read Enterprise Manual &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

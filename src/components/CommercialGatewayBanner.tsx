import React from 'react';
import { ShieldCheck, ExternalLink, Zap } from 'lucide-react';

export const CommercialGatewayBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-950 border border-amber-500/40 rounded-3xl p-6 sm:p-7 mb-8 text-left shadow-2xl relative overflow-hidden font-sans">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold uppercase rounded-full tracking-wider">
              Commercial Enterprise Security Product
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold uppercase rounded-full font-mono">
              Zero-Trust Edge WAF
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            SEOSiri Cloud Defense &amp; Threat Mitigation Shield
          </h2>
          <p className="text-xs text-slate-300 font-mono mt-1">
            guard.seosiri.com • Live Reverse Proxy WAF for Web, Mobile APIs, and Enterprise Backends
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs shrink-0">
          <a
            href="https://guard.seosiri.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center gap-1.5"
          >
            <span>View Product &amp; Pricing</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://guard.seosiri.com/legal/dpa"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-all flex items-center gap-1"
          >
            <span>GDPR DPA Shield</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-xs font-mono">
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80">
          <span className="text-slate-400 text-[10px] block">Starter Shield</span>
          <strong className="text-white text-sm font-bold">$29 / mo</strong>
          <p className="text-slate-400 text-[11px] mt-1 font-sans">Single Domain WAF • SQLi &amp; XSS Edge Filter • 100 RPM</p>
        </div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-amber-500/30">
          <span className="text-amber-400 text-[10px] block font-bold">Pro Defense (Most Popular)</span>
          <strong className="text-white text-sm font-bold">$99 / mo</strong>
          <p className="text-slate-400 text-[11px] mt-1 font-sans">3 Domains / APIs • BOLA UUID Enforcer • Real-Time Alerts</p>
        </div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80">
          <span className="text-purple-400 text-[10px] block font-bold">Enterprise Custom</span>
          <strong className="text-white text-sm font-bold">$499 / mo</strong>
          <p className="text-slate-400 text-[11px] mt-1 font-sans">Unlimited Endpoints • Mobile Anti-Hooking • Dedicated SLA</p>
        </div>
      </div>
    </div>
  );
};

export default CommercialGatewayBanner;

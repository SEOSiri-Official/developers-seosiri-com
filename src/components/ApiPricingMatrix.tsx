import React, { useState } from 'react';
import { ALL_API_PRICING_CATALOG, MASTER_ENTERPRISE_PASS, ApiPricingItem } from '../data/apiPricingData';
import { ViewMode } from '../types';
import { DollarSign, ShieldCheck, Zap, Copy, Check, ExternalLink, ArrowRight, Layers, Globe, Mail } from 'lucide-react';

interface ApiPricingMatrixProps {
  onViewChange: (view: ViewMode) => void;
}

export const ApiPricingMatrix: React.FC<ApiPricingMatrixProps> = ({ onViewChange }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeCheckoutItem, setActiveCheckoutItem] = useState<ApiPricingItem | typeof MASTER_ENTERPRISE_PASS | null>(null);
  const [copiedNote, setCopiedNote] = useState(false);

  const PAYONEER_EMAIL = "badhan_pbn@yahoo.com";

  const filteredApis = selectedCategory === 'ALL'
    ? ALL_API_PRICING_CATALOG
    : ALL_API_PRICING_CATALOG.filter(item => item.category === selectedCategory);

  const getPrice = (item: { monthlyUsd: number; annualUsd: number }) => {
    return billingCycle === 'monthly' ? item.monthlyUsd : item.annualUsd;
  };

  const getSettlementNote = (item: { name: string; scopeCode: string }) => {
    const amount = getPrice(item as any);
    return `SEOSiri API License: ${item.name} (${item.scopeCode}) - ${billingCycle.toUpperCase()} ($${amount}) - Email: [YOUR_EMAIL]`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-left font-sans">
      
      {/* Top Header & Value Proposition */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Transparent Global API Edge Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Commercial API Gateways &amp; Enterprise Access
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          High-throughput Cloudflare edge endpoints with sub-10ms latency, zero-retention data scrubbing, and cryptographic HMAC-SHA256 API keys.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="flex items-center justify-center gap-3 pt-2 font-mono text-xs">
          <span className={billingCycle === 'monthly' ? 'text-white font-bold' : 'text-slate-400'}>Monthly</span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-12 h-6 bg-slate-800 border border-slate-700 rounded-full p-1 transition-colors relative"
          >
            <div className={`w-4 h-4 rounded-full bg-blue-500 transition-transform ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className={billingCycle === 'annual' ? 'text-emerald-400 font-bold flex items-center gap-1' : 'text-slate-400'}>
            Annual Billing <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded">Save 20%</span>
          </span>
        </div>
      </div>

      {/* MASTER ALL-ACCESS PASS (FEATURED HIGHLIGHT) */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-2 border-sky-400/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-sky-500/20 border border-sky-400/40 text-sky-300 font-mono text-xs font-bold rounded-full">
                BEST ENTERPRISE VALUE
              </span>
              <span className="text-xs text-slate-400 font-mono">13 Gateways • 199 Tools</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">{MASTER_ENTERPRISE_PASS.name}</h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed font-mono">
              {MASTER_ENTERPRISE_PASS.description} Includes Biopharma 4PL, Industrial AI Gateway (ROS 2), Rovo-MCP Link, Vector RAG, and Big Data Pipelines.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 font-mono">
            <div>
              <div className="text-3xl font-black text-white">
                ${getPrice(MASTER_ENTERPRISE_PASS)}
                <span className="text-xs font-normal text-slate-400"> / month</span>
              </div>
              <span className="text-[10px] text-emerald-400">2,500 Requests / Minute Quota</span>
            </div>
            <button
              onClick={() => setActiveCheckoutItem(MASTER_ENTERPRISE_PASS)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <span>Subscribe Master Pass</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

            {/* COMMERCIAL SECURITY GUARD SHOWCASE (guard.seosiri.com) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold rounded-full">
                COMMERCIAL CLOUD SECURITY PRODUCT
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold rounded-full">
                Zero-Trust Edge WAF
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">SEOSiri Cloud Defense &amp; Threat Mitigation Shield</h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed font-mono">
              guard.seosiri.com • Autonomous Reverse Proxy &amp; WAF protecting WordPress, Shopify, Next.js, and Mobile APIs with zero code changes.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs shrink-0">
            <a
              href="https://guard.seosiri.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center gap-1.5"
            >
              <span>Visit guard.seosiri.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://guard.seosiri.com/legal/dpa"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-all"
            >
              <span>GDPR DPA Shield</span>
            </a>
          </div>
        </div>

        {/* 3 Tier Pricing Cards for Security Guard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 text-xs font-mono">
          <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-slate-400 text-[10px] block uppercase font-bold">Starter Shield</span>
            <div className="text-2xl font-black text-white">$29 <span className="text-xs text-slate-400 font-normal">/ mo</span></div>
            <p className="text-slate-400 text-[11px] font-sans">Single Domain WAF • SQLi &amp; XSS Edge Mitigation • 100 RPM limit</p>
            <a onClick={() => onViewChange('key-issuer')} href="#key-issuer?plan=starter" rel="noopener noreferrer" className="inline-block text-sky-400 text-xs hover:underline font-bold pt-1">
              Deploy Starter ($29) &rarr;
            </a>
          </div>

          <div className="p-4 bg-slate-950/90 rounded-2xl border border-amber-500/40 space-y-2 shadow-lg shadow-amber-500/5">
            <span className="text-amber-400 text-[10px] block uppercase font-bold">Pro Defense (Most Popular)</span>
            <div className="text-2xl font-black text-white">$99 <span className="text-xs text-slate-400 font-normal">/ mo</span></div>
            <p className="text-slate-400 text-[11px] font-sans">Up to 3 Domains/APIs • BOLA UUID Enforcer • 5-min Email Incident Alerts</p>
            <a onClick={() => onViewChange('key-issuer')} href="#key-issuer?plan=starter" rel="noopener noreferrer" className="inline-block text-amber-300 text-xs hover:underline font-bold pt-1">
              Deploy Pro ($99) &rarr;
            </a>
          </div>

          <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-purple-400 text-[10px] block uppercase font-bold">Enterprise Custom</span>
            <div className="text-2xl font-black text-white">$499 <span className="text-xs text-slate-400 font-normal">/ mo</span></div>
            <p className="text-slate-400 text-[11px] font-sans">Unlimited Endpoints • Mobile Anti-Hooking &amp; Nonce • 24/7 SLA Support</p>
            <a onClick={() => onViewChange('key-issuer')} href="#key-issuer?plan=starter" rel="noopener noreferrer" className="inline-block text-purple-300 text-xs hover:underline font-bold pt-1">
              Deploy Enterprise ($499) &rarr;
            </a>
          </div>
        </div>
      </div>


      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 font-mono text-xs">
        {[
          { id: 'ALL', label: 'All 20 API Gateways' },
          { id: 'LIFE_SCIENCES', label: 'Life Sciences & Robotics' },
          { id: 'AI_SEARCH_SEO', label: 'AI Search & AEO/GEO' },
          { id: 'DATA_DEVOPS', label: 'Data Engineering & DevOps' },
          { id: 'SECURITY_GOV', label: 'Zero-Trust Security & WAF' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl border transition-all ${
              selectedCategory === cat.id
                ? 'bg-blue-600 border-blue-500 text-white font-bold shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* API Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredApis.map(api => (
          <div
            key={api.id}
            className={`bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all hover:border-slate-700 ${
              api.featured ? 'border-amber-500/40 shadow-lg shadow-amber-500/5' : 'border-slate-800'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono">
                <span className="text-[10px] text-slate-500 uppercase font-bold">{api.scopeCode}</span>
                <span className="text-[10px] text-emerald-400 font-bold">{api.slaUptime} SLA</span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">{api.name}</h3>
              <p className="text-xs text-sky-400 font-mono flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-500" />
                <span>{api.gateway}</span>
              </p>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{api.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-3 font-mono">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-black text-white">${getPrice(api)}</span>
                  <span className="text-slate-400 text-xs font-normal"> / mo</span>
                </div>
                <span className="text-[10px] text-slate-400">{api.toolsCount} Autonomous Tools</span>
              </div>

              <div className="text-[11px] text-slate-500">
                Rate Limit: <strong className="text-slate-300">{api.rateLimitRpm} req/min</strong>
              </div>

              <button
                onClick={() => setActiveCheckoutItem(api)}
                className="w-full py-2.5 bg-slate-800 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>Get Scoped License</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Payoneer Checkout Modal */}
      {activeCheckoutItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 text-left font-mono shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Payoneer Commercial Checkout</span>
              </div>
              <button
                onClick={() => setActiveCheckoutItem(null)}
                className="text-slate-500 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">{activeCheckoutItem.name}</h3>
              <p className="text-xs text-slate-400 font-sans">
                Transfer ${getPrice(activeCheckoutItem as any)} USD ({billingCycle}) directly to our verified Payoneer account:
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-emerald-400 font-bold text-sm select-all">
                {PAYONEER_EMAIL}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-slate-300 font-bold">Copy Transfer Payment Note:</span>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 break-all select-all">
                {getSettlementNote(activeCheckoutItem)}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(getSettlementNote(activeCheckoutItem));
                  setCopiedNote(true);
                  setTimeout(() => setCopiedNote(false), 2000);
                }}
                className="text-xs text-sky-400 hover:underline flex items-center gap-1 pt-1"
              >
                {copiedNote ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedNote ? "Note Copied to Clipboard!" : "Copy Payment Note String"}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 font-sans leading-relaxed border-t border-slate-800 pt-3">
              Once submitted, our systems desk activates your cryptographic HMAC key within 15 minutes. Need automated invoicing or corporate wire? Email <a href="mailto:info@seosiri.com" className="text-sky-400 underline">info@seosiri.com</a>.
            </p>

            <button
              onClick={() => {
                setActiveCheckoutItem(null);
                onViewChange('key-issuer');
              }}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all"
            >
              Go to API Key Issuer Desk &rarr;
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ApiPricingMatrix;

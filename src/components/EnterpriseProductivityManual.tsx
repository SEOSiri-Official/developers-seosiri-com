import React from 'react';
import { BookOpen, DollarSign, ShieldCheck, Zap, ArrowLeft, Mail, ExternalLink, CheckCircle2, TrendingDown } from 'lucide-react';
import { OFFICIAL_CORPORATE_EMAIL } from '../data/mcpData';

interface EnterpriseManualProps {
  onBackToTopology: () => void;
}

export const EnterpriseProductivityManual: React.FC<EnterpriseManualProps> = ({ onBackToTopology }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 text-left font-sans">
      <button
        onClick={onBackToTopology}
        className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-sky-400 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Topology Graph Explorer</span>
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3 text-amber-400">
            <BookOpen className="w-8 h-8" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Enterprise AI Productivity &amp; Cost-Optimization Manual
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1">ROI Analysis • Infrastructure Consolidation • Zero-Leakage Edge</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs rounded-full font-bold">
            Executive B2B Guide
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Modern technology teams frequently waste <strong>$600 to $2,500+ every month</strong> across fragmented SaaS subscriptions (separate vendors for web scrapers, schema auditors, proxy filters, log parsers, and custom API wrappers). 
          The <strong>SEOSiri Model Context Protocol Suite</strong> consolidates these functions into sovereign, local-first execution layers backed by global Cloudflare Workers edge nodes.
        </p>

        {/* Cost Comparison Table */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-[11px]">
            <TrendingDown className="w-4 h-4" />
            <span>How SEOSiri Consolidates Monthly Tech Spend</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-slate-300 text-[11px] border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500">
                  <th className="py-2">Standard Fragmented Stack</th>
                  <th className="py-2">Typical Cost</th>
                  <th className="py-2 text-sky-400">SEOSiri Sovereign Replacement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                <tr>
                  <td className="py-2.5">Third-Party WAF &amp; Bot Proxy</td>
                  <td className="py-2.5 text-rose-400">$100 – $300/mo</td>
                  <td className="py-2.5 text-emerald-400">guard.seosiri.com (Reverse Proxy WAF)</td>
                </tr>
                <tr>
                  <td className="py-2.5">Enterprise SEO &amp; Schema SaaS</td>
                  <td className="py-2.5 text-rose-400">$150 – $400/mo</td>
                  <td className="py-2.5 text-emerald-400">seosiri-aeo-geo-mcp &amp; content-schema</td>
                </tr>
                <tr>
                  <td className="py-2.5">Data Pipeline &amp; PII Scrubber</td>
                  <td className="py-2.5 text-rose-400">$200 – $600/mo</td>
                  <td className="py-2.5 text-emerald-400">etl-pipeline-mcp (In-Memory SHA-256)</td>
                </tr>
                <tr>
                  <td className="py-2.5">Custom Clinical Assay Tooling</td>
                  <td className="py-2.5 text-rose-400">$500 – $1,500/mo</td>
                  <td className="py-2.5 text-emerald-400">biopharma-mcp (4PL &amp; 21 CFR Part 11)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Capture Box */}
        <div className="bg-gradient-to-r from-blue-950/80 to-slate-950 p-6 rounded-2xl border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-sm">Schedule an Enterprise Architecture &amp; Tooling Audit</h3>
            <p className="text-xs text-slate-400 mt-1 font-mono">Cut redundant SaaS seats and deploy zero-trust MCP gateways with Lead Systems Architect Momenul Ahmad.</p>
          </div>
          <a
            href={`mailto:${OFFICIAL_CORPORATE_EMAIL}?subject=Enterprise%20Productivity%20%26%20Architecture%20Consultation`}
            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold font-mono transition-all shadow-lg shrink-0 flex items-center gap-2"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Book Consultation &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseProductivityManual;

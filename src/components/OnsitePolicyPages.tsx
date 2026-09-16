import React from 'react';
import { ViewMode } from '../types';
import {
  Sparkles,
  ShieldCheck,
  FileText,
  Zap,
  Lock,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  Key,
  Mail,
  User,
  Globe
} from 'lucide-react';
import { OFFICIAL_CORPORATE_EMAIL, LEAD_ARCHITECT } from '../data/mcpData';

interface OnsitePolicyPagesProps {
  view: ViewMode;
  onBackToTopology: () => void;
  onViewChange?: (view: ViewMode) => void;
}

export const OnsitePolicyPages: React.FC<OnsitePolicyPagesProps> = ({ view, onBackToTopology, onViewChange }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 text-left">
      
      {/* Back Button */}
      <button
        onClick={onBackToTopology}
        className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-sky-400 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Topology Graph Explorer</span>
      </button>

      {/* GLOBAL ENTERPRISE NOTICE BANNER */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-sky-400" />
          <span>Global Compliance Jurisdiction: <strong className="text-white">US, UK, CA, EU (GDPR), JP</strong></span>
        </div>
        <span className="text-emerald-400 font-bold">● Sovereign Edge Active</span>
      </div>

      {/* PAGE: AI Governance & Liability (EU AI Act, GDPR, CCPA) */}
      {(view === "governance-liability" || (view as any) === "governance") && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 text-left">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3 text-amber-400">
              <ShieldCheck className="w-8 h-8" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  AI Governance, Statutory Compliance &amp; Liability Matrix
                </h1>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  EU AI Act (Reg. 2024/1689) • GDPR Recital 49 • California CCPA/CPRA § 1798.145
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs rounded-full font-bold">
              Global Standards Grade AAA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <strong className="text-sky-400 block text-xs">1. EU AI ACT TIERING</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
                Tools operate as Low-Risk General-Purpose AI Systems (GPAI). High-risk life sciences (biopharma/bioassay) enforce Human-in-the-Loop approval stage-gates.
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <strong className="text-emerald-400 block text-xs">2. GDPR RECITAL 49</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
                Network defense and exploit telemetry logging are executed under Legitimate Interest for Information Security without cookie consent tracking.
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <strong className="text-purple-400 block text-xs">3. CCPA / CPRA EXEMPTION</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
                Security event recording is exempted under Cal. Civ. Code § 1798.145(a)(1). Security telemetry is never sold or used for commercial profiling.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono text-slate-300">
            <h3 className="text-white font-bold text-xs flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-400" /> Data Processing &amp; Liability Boundaries
            </h3>
            <p className="text-[11px] leading-relaxed text-slate-400 font-sans">
              Clean traffic passes in-memory through Cloudflare Workers edge nodes with zero persistent disk storage. In the event of an active exploit vector, incident records auto-purge after thirty (30) days.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs">
              <a href="https://guard.seosiri.com/legal/dpa" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
                View Self-Hosted DPA (guard.seosiri.com/legal/dpa) &rarr;
              </a>
              <a href="https://www.seosiri.com/security.txt" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                RFC 9116 Vulnerability Disclosure Policy &rarr;
              </a>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 1: Custom Enterprise MCP Development Services */}
      {view === 'custom-mcp' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center space-x-3 text-amber-400">
            <Zap className="w-8 h-8" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              B2B Enterprise Consulting
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Custom Enterprise Model Context Protocol (MCP) Engineering
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            SEOSiri provides bespoke systems architecture, custom MCP server development, and Cloudflare Zero Trust gateway integration for corporate clients in the United States, United Kingdom, Canada, Germany, and Japan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Custom Database &amp; API Connectors
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Translating proprietary REST, GraphQL, PostgreSQL, and cloud infrastructure logic into typed, deterministic AI agent tools.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Compliance &amp; Security Interlocks
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enforcing automated HIPAA PHI scrubbing, PCI-DSS Luhn token redaction, GDPR masking, and OWASP Top 10 injection protection.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div>
              <p className="text-slate-200 font-bold">Ready to build custom MCP tools for your enterprise?</p>
              <p className="text-slate-400 text-[11px] mt-0.5">Contact Lead Architect {LEAD_ARCHITECT.name} directly.</p>
            </div>
            <a
              href={`mailto:${OFFICIAL_CORPORATE_EMAIL}`}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold transition-all shrink-0"
            >
              Contact Desk: {OFFICIAL_CORPORATE_EMAIL}
            </a>
          </div>

          <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
            <span>Read full corporate overview: </span>
            <a href="https://www.seosiri.com/p/about.html" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline inline-flex items-center gap-1">
              SEOSiri Official About Page <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* PAGE 2: Enterprise Productivity Manual & ROI (#productivity-manual & #manual) */}
      {(view === 'productivity-manual' || view === 'manual') && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 text-left">
          <div className="flex items-center space-x-3 text-amber-400">
            <Sparkles className="w-8 h-8" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Executive B2B Playbook &amp; ROI
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Enterprise AI Productivity &amp; Cost-Optimization Manual
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Engineering organizations waste thousands monthly across disconnected SaaS subscriptions for scraping proxies, schema checkers, web application firewalls, and custom wrappers. The <strong className="text-white">SEOSiri Model Context Protocol Suite</strong> consolidates these workflows into sovereign execution layers powered by global Cloudflare Workers edge nodes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <strong className="text-emerald-400 block font-bold">84% Faster Data Ingestion</strong>
              <p className="text-slate-400 m-0">Zero-latency webhook ingestion via Cloudflare Edge Gateways.</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <strong className="text-sky-400 block font-bold">100% Deterministic Tool Calls</strong>
              <p className="text-slate-400 m-0">Strict JSON schema validation eliminates model hallucination.</p>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-400 border-t border-slate-800 flex items-center justify-between">
            <span>Official Master Directory Reference:</span>
            <a href="https://www.seosiri.com/2026/07/seosiri-mcp-servers.html" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline inline-flex items-center gap-1 font-mono">
              seosiri.com Master MCP Directory <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* PAGE 3: AI Governance & Liability (#governance) */}
      {view === 'governance' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 text-left">
          <div className="flex items-center space-x-3 text-amber-400">
            <ShieldCheck className="w-8 h-8" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              EU AI Act &amp; Compliance Framework
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Governance &amp; Corporate Liability Framework
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            SEOSiri enforces air-gapped data boundaries to insulate enterprise clients from legal liabilities arising from generative AI operations under international jurisdiction (US CCPA, EU GDPR Recital 49).
          </p>

          <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
            <span>Official Security Disclosures: </span>
            <a href="https://developers.seosiri.com/.well-known/security.txt" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline inline-flex items-center gap-1">
              RFC 9116 security.txt <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* PAGE 4: API Key Issuer Desk (#key-issuer) */}
      {view === 'key-issuer' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 text-left font-mono">
          <div className="flex items-center space-x-3 text-amber-400">
            <Key className="w-8 h-8" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              B2B Licensing Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">API Key Issuer Desk</h1>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Generate cryptographically signed HMAC-SHA256 API keys for Pro and Enterprise clients via Payoneer settlement ({OFFICIAL_CORPORATE_EMAIL}).
          </p>
        </div>
      )}

      {/* PAGE 5: Client Security Dashboard (#user-portal) */}
      {view === 'user-portal' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 text-left font-mono">
          <div className="flex items-center space-x-3 text-sky-400">
            <User className="w-8 h-8" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
              Client Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">Client Security Dashboard</h1>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Real-time telemetry and rate-limit tracking for active enterprise subscription tiers.
          </p>
        </div>
      )}

      {/* PAGE 6: Privacy Policy */}
      {view === 'privacy' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center space-x-3 text-emerald-400">
            <Lock className="w-8 h-8" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Privacy Governance
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Local-First Privacy &amp; Data Security Policy
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Privacy is a core engineering requirement across the SEOSiri MCP Suite. Our local-first architecture ensures your data never leaves your environment without your explicit permission.
          </p>

          <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
            <span>Official Policy Reference: </span>
            <a href="https://www.seosiri.com/p/privacy-policythis-privacy-policy-has.html" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline inline-flex items-center gap-1">
              SEOSiri.com Official Privacy Policy <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* PAGE 7: Disclaimer & Usage Terms */}
      {view === 'disclaimer' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center space-x-3 text-sky-400">
            <FileText className="w-8 h-8" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Legal Disclaimer
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">SEOSiri Onsite Disclaimer &amp; Usage Terms</h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            All open-source Model Context Protocol (MCP) packages, PyPI/NPM libraries, and Cloudflare Worker edge gateways published under <strong>SEOSiri-Official</strong> are provided "as-is" under the MIT Open Source License. Refer to <a href="https://www.seosiri.com/p/disclaimer.html" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">seosiri.com/p/disclaimer.html</a>.
          </p>
        </div>
      )}

      {/* PAGE 8: Brand Assets & Use Cases Policy */}
      {view === 'assets' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center space-x-3 text-purple-400">
            <ShieldCheck className="w-8 h-8" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Assets Policy
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Brand Assets &amp; Permitted Use Cases Policy</h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            This policy outlines permitted commercial and developer integration guidelines for SEOSiri open-source packages, brand assets, and Cloudflare edge routes (`*.seosiri.com`). Refer to <a href="https://www.seosiri.com/p/assets-policy.html" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">seosiri.com/p/assets-policy.html</a>.
          </p>
        </div>
      )}

      {/* PAGE 9: Sitemap & LLM.txt Index Page */}
      {view === 'sitemap' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 text-left">
          <div className="flex items-center space-x-3 text-blue-400">
            <FileText className="w-8 h-8" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Sitemap &amp; Machine-Readable Index
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">SEOSiri Developer Portal Sitemap &amp; LLM Index</h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Access the complete sitemap index and machine-readable text specifications for search engine crawlers and autonomous AI agents:
          </p>
          <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
            <span>Central Ecosystem Directory: </span>
            <a href="https://www.seosiri.com/2026/07/seosiri-mcp-servers.html" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline inline-flex items-center gap-1 font-mono">
              seosiri.com Central MCP Directory <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* PAGE 10: Security Policy & security.txt (#security) */}
      {view === 'security' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 text-left font-mono">
          <div className="flex items-center space-x-3 text-sky-400">
            <ShieldCheck className="w-8 h-8" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/25">
              RFC 9116 Compliant
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">Security Policy &amp; security.txt</h1>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            SEOSiri adheres to RFC 9116 security vulnerability disclosure standards. Our public security.txt file is deployed across all edge gateways.
          </p>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-sky-300 space-y-1">
            <p className="m-0">Contact: mailto:info@seosiri.com</p>
            <p className="m-0">Expires: 2027-12-31T23:59:59.000Z</p>
            <p className="m-0">Preferred-Languages: en</p>
            <p className="m-0">Canonical: https://developers.seosiri.com/.well-known/security.txt</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default OnsitePolicyPages;
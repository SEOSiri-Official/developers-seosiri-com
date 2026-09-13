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
  User
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

      {/* PAGE 2: Enterprise Productivity Manual & ROI (#manual) */}
      {view === 'manual' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 text-left">
          <div className="flex items-center space-x-3 text-amber-400">
            <Sparkles className="w-8 h-8" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Productivity &amp; ROI
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Enterprise Productivity Manual &amp; ROI</h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Autonomous AI agents connected via the SEOSiri Model Context Protocol Suite reduce manual developer operations by up to 84%. Learn how enterprise engineering teams deploy local-first MCP tools with measured efficiency gains.
          </p>
        </div>
      )}

      {/* PAGE 3: AI Governance & Liability (#governance) */}
      {view === 'governance' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 text-left">
          <div className="flex items-center space-x-3 text-amber-400">
            <ShieldCheck className="w-8 h-8" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Governance &amp; Liability
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">AI Governance &amp; Corporate Liability Framework</h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            SEOSiri enforces air-gapped data boundaries to insulate enterprise clients from legal liabilities arising from generative AI operations.
          </p>
        </div>
      )}

      {/* PAGE 4: API Key Issuer Desk */}
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

      {/* PAGE 5: Client Security Dashboard */}
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
            All open-source Model Context Protocol (MCP) packages, PyPI/NPM libraries, and Cloudflare Worker edge gateways published under <strong>SEOSiri-Official</strong> are provided "as-is" under the MIT Open Source License.
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
            This policy outlines permitted commercial and developer integration guidelines for SEOSiri open-source packages, brand assets, and Cloudflare edge routes (`*.seosiri.com`).
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
            Access the complete sitemap index and machine-readable text specifications for search engine crawlers and autonomous AI agents.
          </p>
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
        </div>
      )}

    </div>
  );
};

export default OnsitePolicyPages;
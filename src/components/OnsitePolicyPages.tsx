import React from 'react';
import { ViewMode } from '../types';
import { ShieldCheck, FileText, Zap, Lock, ExternalLink, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { OFFICIAL_CORPORATE_EMAIL, LEAD_ARCHITECT } from '../data/mcpData';

interface OnsitePolicyPagesProps {
  view: ViewMode;
  onBackToTopology: () => void;
}

export const OnsitePolicyPages: React.FC<OnsitePolicyPagesProps> = ({ view, onBackToTopology }) => {
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

      {/* PAGE 2: Disclaimer & Usage Terms */}
      {view === 'disclaimer' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center space-x-3 text-sky-400">
            <FileText className="w-8 h-8" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Legal Disclaimer
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            SEOSiri Onsite Disclaimer &amp; Usage Terms
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            All 16 open-source Model Context Protocol (MCP) packages, PyPI/NPM libraries, and Cloudflare Worker edge gateways published under <strong>SEOSiri-Official</strong> are provided "as-is" under the MIT Open Source License.
          </p>

          <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <h3 className="font-bold text-white text-sm">Local Autonomy &amp; Execution Boundary</h3>
            <p>
              SEOSiri MCP tools execute locally on your machine or inside your private VPC. Users and AI agents are responsible for validating SQL statement parameters, API tokens, and local database write permissions before executing tool calls.
            </p>
          </div>

          <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
            <span>Official Policy Reference: </span>
            <a href="https://www.seosiri.com/p/disclaimer.html" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline inline-flex items-center gap-1">
              SEOSiri.com Official Disclaimer <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* PAGE 3: Privacy Policy */}
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

          <ul className="space-y-2 text-xs text-slate-300 list-disc pl-5 leading-relaxed">
            <li><strong>Zero Server-Side Logging:</strong> Tool calls executed in Claude Desktop or Cursor do not store, log, or telemetry-track your database queries or API payloads.</li>
            <li><strong>Automated SHA-256 Hashing:</strong> Sensitive fields (emails, IP addresses) are hashed at rest using SHA-256 before storage in local Cold Tier SQLite databases.</li>
          </ul>

          <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
            <span>Official Privacy Reference: </span>
            <a href="https://www.seosiri.com/p/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline inline-flex items-center gap-1">
              SEOSiri.com Official Privacy Policy <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* PAGE 4: Brand Assets & Use Cases Policy */}
      {view === 'assets' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center space-x-3 text-purple-400">
            <ShieldCheck className="w-8 h-8" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Assets Policy
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Brand Assets &amp; Permitted Use Cases Policy
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            This policy outlines permitted commercial and developer integration guidelines for SEOSiri open-source packages, brand assets, and Cloudflare edge routes (`*.seosiri.com`).
          </p>

          <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
            <span>Official Policy Reference: </span>
            <a href="https://www.seosiri.com/p/assets-policy.html" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline inline-flex items-center gap-1">
              SEOSiri.com Official Assets Policy <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* PAGE 5: Sitemap & LLM.txt Index Page */}
      {view === 'sitemap' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 text-left">
          <div className="flex items-center space-x-3 text-blue-400">
            <FileText className="w-8 h-8" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Sitemap &amp; Machine-Readable Index
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            SEOSiri Developer Portal Sitemap &amp; LLM Index
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Access the complete sitemap index and machine-readable text specifications for search engine crawlers and autonomous AI agents:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                XML Sitemap File
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Structured XML urlset containing canonical routes for Googlebot and Bingbot.
              </p>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-emerald-400 font-mono font-bold hover:underline pt-1"
              >
                View sitemap.xml &rarr;
              </a>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                LLM.txt Context Index
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Machine-readable Markdown index for Claude, Perplexity, and SearchGPT crawlers.
              </p>
              <a
                href="/llm.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-emerald-400 font-mono font-bold hover:underline pt-1"
              >
                View llm.txt &rarr;
              </a>
            </div>
          </div>

          <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
            <span>Central Ecosystem Directory: </span>
            <a href="https://www.seosiri.com/2026/07/seosiri-mcp-servers.html" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline inline-flex items-center gap-1">
              SEOSiri Central MCP Directory <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

    </div>
  );
};

export default OnsitePolicyPages;
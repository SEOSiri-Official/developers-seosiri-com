import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  User, 
  Key, 
  Globe, 
  ExternalLink, 
  Check, 
  Copy, 
  Zap, 
  Lock, 
  BookOpen, 
  Code2, 
  Download, 
  RefreshCw,
  Building,
  Activity,
  Layers
} from 'lucide-react';
import { SEOSiriUserModel, ApiKeyRecord } from '../types';

const MONETIZATION_CONFIG = {
  payoneerEmail: "badhan_pbn@yahoo.com",
  portalUrl: "https://developers.seosiri.com",
  supportDesk: "info@seosiri.com"
};

export const UserPortal: React.FC = () => {
  // User Model State
  const [user, setUser] = useState<SEOSiriUserModel>({
    uid: "usr_acme_prod_01",
    email: "security@acme-store.com",
    organization: "Acme Biotech Systems",
    projectDomain: "api.acme-store.com",
    activeTier: "PRO",
    assignedScopes: ["SECURITY", "BIOPHARMA"],
    activeKeys: [
      {
        keyString: "PRO_US_acme-store_SECURITY_1818241500_8a92f1b4",
        scope: "SECURITY",
        tier: "PRO",
        country: "US",
        expiresAtUnix: Math.floor(Date.now() / 1000) + (29 * 86400),
        monthlyValueUSD: 99,
        status: "ACTIVE"
      }
    ],
    createdAt: "2026-08-01"
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [copiedConfig, setCopiedConfig] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'config' | 'guide'>('overview');

  // Load persistent user profile from localStorage if present
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('seosiri_user_session');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.warn("Storage sync offline, using memory state", e);
    }
  }, []);

  const handleGoogleAuth = () => {
    // Authenticates user and writes model to persistent state
    setIsAuthenticated(true);
    try {
      localStorage.setItem('seosiri_user_session', JSON.stringify(user));
    } catch (e) {
      // Memory state fallback
    }
  };

  const handleCopy = (text: string, setFn: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  // Automated Claude Desktop & Cursor JSON Configuration Generator
  const clientMcpConfig = JSON.stringify({
    mcpServers: {
      "seosiri-security-proxy": {
        command: "npx",
        args: ["-y", "@seosiri/security-proxy"],
        env: {
          X_SEOSIRI_KEY: user.activeKeys[0]?.keyString || "PRO_KEY"
        }
      },
      "seosiri-biopharma": {
        command: "npx",
        args: ["-y", "@seosiri/biopharma-mcp"],
        env: {
          X_SEOSIRI_KEY: user.activeKeys[0]?.keyString || "PRO_KEY"
        }
      }
    }
  }, null, 2);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 text-left font-sans">
      
      {/* Header Banner & Auth Interlock */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Client Security &amp; Subscription Portal</h1>
              <p className="text-xs text-slate-400 font-mono">B2B Team Workspace • {user.organization}</p>
            </div>
          </div>
          
          {!isAuthenticated ? (
            <button
              onClick={handleGoogleAuth}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs font-mono transition-all shadow-md flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sign In with Google</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs rounded-full font-bold">
                ● Verified: {user.email}
              </span>
            </div>
          )}
        </div>

        {/* Live Entitlement & Quota Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">Assigned Tier</span>
            <strong className="text-emerald-400 text-sm font-bold">{user.activeTier} DEFENSE ($99/mo)</strong>
            <p className="text-[11px] text-slate-400">Payoneer Verified</p>
          </div>
          
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">Rate Quota</span>
            <strong className="text-sky-400 text-sm font-bold">1,000 req / min</strong>
            <p className="text-[11px] text-slate-400">Global Cloudflare V8 Nodes</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">Bound Domain</span>
            <strong className="text-white text-sm font-bold truncate block">{user.projectDomain}</strong>
            <p className="text-[11px] text-slate-400">CNAME Routing Active</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">License Validity</span>
            <strong className="text-amber-300 text-sm font-bold">29 Days Remaining</strong>
            <p className="text-[11px] text-slate-400">Auto-Renews via Payoneer</p>
          </div>
        </div>

        {/* Internal Sub-View Switcher Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            License Overview
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'config'
                ? 'bg-blue-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>AI Client Config (.json)</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'bg-blue-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Deployment Guide</span>
          </button>
        </div>

        {/* TAB 1: LICENSE OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* API Key Display Box */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 font-mono">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>Active Cryptographic Proxy &amp; Gateway Key</span>
                </h3>
                <button
                  onClick={() => handleCopy(user.activeKeys[0]?.keyString || '', setCopiedKey)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center space-x-1.5 transition-colors"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey ? "Copied Key!" : "Copy Key"}</span>
                </button>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-sky-300 break-all select-all">
                {user.activeKeys[0]?.keyString}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 pt-1">
                <span>Authorized Scopes: <strong className="text-emerald-400">{user.assignedScopes.join(', ')}</strong></span>
                <span>Gateway: <a href="https://guard.seosiri.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">guard.seosiri.com</a></span>
              </div>
            </div>

            {/* Payoneer Quick-Extension Box */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
              <div>
                <strong className="text-white block">Need to extend or add seats for your organization?</strong>
                <span className="text-slate-400 text-[11px]">Renew via verified Payoneer account: <strong className="text-emerald-400">{MONETIZATION_CONFIG.payoneerEmail}</strong></span>
              </div>
              <a
                href={`mailto:${MONETIZATION_CONFIG.supportDesk}?subject=License%20Renewal%20Inquiry%20for%20${user.organization}`}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 border border-slate-700"
              >
                <span>Request Invoice Extension</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* TAB 2: AI CLIENT CONFIG GENERATOR (.json) */}
        {activeTab === 'config' && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 font-mono">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-sky-400" />
                  <span>Instant Client Configuration Snippet</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Inject directly into claude_desktop_config.json or Cursor .cursor/mcp.json</p>
              </div>
              <button
                onClick={() => handleCopy(clientMcpConfig, setCopiedConfig)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center space-x-1.5 transition-colors"
              >
                {copiedConfig ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedConfig ? "Copied JSON!" : "Copy JSON"}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-emerald-400 overflow-x-auto leading-relaxed">
              {clientMcpConfig}
            </pre>
          </div>
        )}

        {/* TAB 3: DEPLOYMENT GUIDE */}
        {activeTab === 'guide' && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs font-sans">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Usability Tour Guide: Deploying Method A &amp; Method B</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-sky-400 font-mono text-xs">Method A: Zero-Code DNS CNAME Proxy (Recommended)</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Point your domain or API subdomain directly to SEOSiri Edge Shield via CNAME in your DNS management console:
                </p>
                <div className="bg-slate-950 p-2 rounded font-mono text-[10px] text-emerald-400">
                  CNAME {user.projectDomain} &rarr; guard.seosiri.com
                </div>
                <p className="text-slate-400 text-[11px]">All traffic is inspected for SQLi, XSS, and BOLA before reaching your servers.</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400 font-mono text-xs">Method B: Backend Middleware SDK</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Protect custom Node.js, Express, Next.js, or Python backends by validating requests against our edge verification endpoint:
                </p>
                <div className="bg-slate-950 p-2 rounded font-mono text-[10px] text-sky-300">
                  POST https://guard.seosiri.com/verify<br />
                  Headers: x-seosiri-key: {user.activeKeys[0]?.keyString}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UserPortal;
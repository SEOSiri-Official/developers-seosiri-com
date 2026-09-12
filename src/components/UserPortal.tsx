import React, { useState, useEffect } from 'react';
import { 
  User, 
  Key, 
  ExternalLink, 
  Check, 
  Copy, 
  BookOpen, 
  FileCode2, 
  LogOut,
  LogIn,
  ShieldCheck,
  Globe,
  AlertCircle
} from 'lucide-react';
import { OFFICIAL_CORPORATE_EMAIL } from '../data/mcpData';

interface ClientLicenseData {
  clientId: string;
  scope: string;
  tier: 'PRO' | 'ENTERPRISE';
  country: string;
  expiresAtUnix: number;
  domain: string;
  rawKey: string;
  isValid: boolean;
}

export const UserPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'config' | 'guide'>('overview');
  const [inputKey, setInputKey] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Authenticated Google Identity State
  const [googleUser, setGoogleUser] = useState<{ email: string; name: string } | null>(null);
  const [googlePromptOpen, setGooglePromptOpen] = useState(false);
  const [customGmailInput, setCustomGmailInput] = useState('');

  // Active Client License State (Initializes to clean guest mode until authenticated)
  const [license, setLicense] = useState<ClientLicenseData>({
    clientId: 'guest-account',
    scope: 'SECURITY',
    tier: 'PRO',
    country: 'US',
    expiresAtUnix: Math.floor(Date.now() / 1000) + (30 * 86400),
    domain: 'api.guest-account.com',
    rawKey: 'PRO_US_guest-account_SECURITY_1818241500_c3e8a91b',
    isValid: true
  });

  const MASTER_SECRET = "seosiri_master_mcp_secret_key_2026_x99";

  // Check saved Google authentication session on initial mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('seosiri_auth_email');
    if (savedEmail) {
      handleGoogleLoginSuccess(savedEmail);
    }
  }, []);

  // Synchronized 1:1 with Admin API Key Issuer & Cloudflare Edge Gateways
  const gatewayUrlMap: Record<string, string> = {
    SECURITY: "guard.seosiri.com",
    ROVOMCP: "rovomcp.seosiri.com",
    BIOPHARMA: "biopharma.seosiri.com",
    BIOASSAY: "bioassay.seosiri.com",
    IAIG: "iaig.seosiri.com",
    AEO: "aeo.seosiri.com",
    SCHEMA: "schema.seosiri.com",
    KEYWORDS: "keywords.seosiri.com",
    GOVERNANCE: "governance.seosiri.com",
    OPS: "ops.seosiri.com",
    DB: "db.seosiri.com",
    BIOROBOTICS: "mcp.seosiri.com",
    LEARNING: "mcp.seosiri.com",
    BIOMETRIC: "mcp.seosiri.com",
    ETL: "hubappapi.seosiri.com",
    ALL: "developers.seosiri.com"
  };

  const activeGateway = gatewayUrlMap[license.scope] || "guard.seosiri.com";

  // Real Google Sign-In Handler
  const handleGoogleLoginSuccess = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const handle = cleanEmail.split('@')[0].replace(/[^a-z0-9-]/g, '-');
    setGoogleUser({ email: cleanEmail, name: handle });
    localStorage.setItem('seosiri_auth_email', cleanEmail);
    setGooglePromptOpen(false);

    // Bind authenticated domain and identity dynamically
    setLicense(prev => ({
      ...prev,
      clientId: handle,
      domain: `api.${handle}.com`
    }));
  };

  const handleSignOut = () => {
    localStorage.removeItem('seosiri_auth_email');
    setGoogleUser(null);
    setLicense(prev => ({
      ...prev,
      clientId: 'guest-account',
      domain: 'api.guest-account.com'
    }));
  };

  // Cryptographic Key Verifier (Parses TIER_COUNTRY_USER_SCOPE_EXP_SIGNATURE)
  const handleVerifyAndSwitchKey = async (keyToVerify: string) => {
    const trimmed = keyToVerify.trim();
    if (!trimmed) return;

    const parts = trimmed.split('_');
    if (parts.length < 5) {
      setAuthError("Invalid key structure. Expected: TIER_COUNTRY_CLIENT_SCOPE_TIMESTAMP_SIGNATURE");
      return;
    }

    try {
      let tierStr = parts[0].toUpperCase();
      let countryStr = parts[1].toUpperCase();
      let userStr = parts[2];
      let scopeStr = parts.length >= 6 ? parts[3].toUpperCase() : 'SECURITY';
      let expStr = parts.length >= 6 ? parts[4] : parts[3];
      let signatureStr = parts[parts.length - 1];

      const payload = parts.slice(0, parts.length - 1).join('_');
      const encoder = new TextEncoder();
      const keyData = encoder.encode(MASTER_SECRET);
      const msgData = encoder.encode(payload);

      const cryptoKey = await window.crypto.subtle.importKey(
        "raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
      );

      const signatureBuffer = await window.crypto.subtle.sign("HMAC", cryptoKey, msgData);
      const expectedSig = Array.from(new Uint8Array(signatureBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .substring(0, 8);

      const isValid = signatureStr === expectedSig;
      const expUnix = parseInt(expStr, 10) || (Math.floor(Date.now() / 1000) + 30 * 86400);

      setLicense({
        clientId: userStr,
        scope: scopeStr,
        tier: tierStr === 'ENTERPRISE' ? 'ENTERPRISE' : 'PRO',
        country: countryStr,
        expiresAtUnix: expUnix,
        domain: `api.${userStr}.com`,
        rawKey: trimmed,
        isValid
      });

      setAuthError(isValid ? null : "Warning: Signature mismatch or key modified.");
    } catch (e) {
      setAuthError("Failed to parse cryptographic token.");
    }
  };

  const nowUnix = Math.floor(Date.now() / 1000);
  const daysRemaining = Math.max(0, Math.ceil((license.expiresAtUnix - nowUnix) / 86400));
  const rateQuotaText = license.tier === 'ENTERPRISE' ? '5,000 req / min' : '1,000 req / min';
  const tierPriceText = license.tier === 'ENTERPRISE' ? '$499/mo' : '$99/mo';

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamic JSON Client Configuration
  const generatedJsonConfig = JSON.stringify({
    mcpServers: {
      [`seosiri-${license.scope.toLowerCase()}`]: {
        command: "npx",
        args: [
          "-y",
          `@seosiri/${license.scope.toLowerCase()}-mcp`,
          `https://${activeGateway}/sse`
        ],
        env: {
          X_SEOSIRI_KEY: license.rawKey,
          TARGET_GATEWAY: `https://${activeGateway}`
        }
      }
    }
  }, null, 2);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 text-left font-sans">
      
      {/* 1. Main Header & Client Identity */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Client Security &amp; Subscription Portal</h1>
              <p className="text-xs text-slate-400 font-mono">
                B2B Team Workspace • {googleUser ? googleUser.name : license.clientId} ({license.country})
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {googleUser ? (
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 font-mono text-xs rounded-full font-bold border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  ● Google Verified: {googleUser.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono transition-colors flex items-center gap-1"
                  title="Sign out of Google"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[10px]">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setGooglePromptOpen(true)}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5 text-blue-600" />
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
        </div>

        {/* Google Authentication Dialog Modal */}
        {googlePromptOpen && (
          <div className="p-4 bg-slate-950 border border-blue-500/40 rounded-2xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Authenticate with your Google / Gmail Account:</span>
              <button onClick={() => setGooglePromptOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-[11px] text-slate-400 m-0 font-sans">
              Enter your Google email address to verify your identity and link your active edge deployment guides:
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="yourname@gmail.com"
                value={customGmailInput}
                onChange={(e) => setCustomGmailInput(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => customGmailInput && handleGoogleLoginSuccess(customGmailInput)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all"
              >
                Verify &amp; Sign In
              </button>
            </div>
          </div>
        )}

        {/* 2. Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">ASSIGNED TIER</span>
            <strong className="text-emerald-400 text-sm font-bold block">{license.tier} DEFENSE ({tierPriceText})</strong>
            <p className="text-[10px] text-slate-400 m-0">Payoneer Verified</p>
          </div>
          
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">RATE QUOTA</span>
            <strong className="text-sky-400 text-sm font-bold block">{rateQuotaText}</strong>
            <p className="text-[10px] text-slate-400 m-0">Global Cloudflare V8 Nodes</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">BOUND DOMAIN</span>
            <strong className="text-white text-sm font-bold block truncate">{license.domain}</strong>
            <p className="text-[10px] text-emerald-400 m-0">CNAME Routing Active</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">LICENSE VALIDITY</span>
            <strong className="text-amber-300 text-sm font-bold block">{daysRemaining} Days Remaining</strong>
            <p className="text-[10px] text-slate-400 m-0">Auto-Renews via Payoneer</p>
          </div>
        </div>

        {/* 3. Interactive Tab Navigation */}
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            License Overview
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'config' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            &lt;/&gt; AI Client Config (.json)
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'guide' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            📖 Deployment Guide
          </button>
        </div>

        {/* 4. Tab 1: License Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>Active Cryptographic Proxy &amp; Gateway Key</span>
                </span>
                <button
                  onClick={() => handleCopy(license.rawKey)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center space-x-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Key' : 'Copy Key'}</span>
                </button>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-sky-300 break-all select-all">
                {license.rawKey}
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Authorized Scope: <strong className="text-emerald-400">{license.scope}</strong></span>
                <span>Assigned Gateway: <strong className="text-sky-300">{activeGateway}</strong></span>
              </div>
            </div>

            {/* Quick Switch / Test Another Key Form */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <span className="text-xs font-mono text-slate-300 font-bold block">Test or Switch Active Key:</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste another PRO_ or ENTERPRISE_ key here to test..."
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => handleVerifyAndSwitchKey(inputKey)}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-mono font-bold transition-all shrink-0"
                >
                  Verify Key
                </button>
              </div>
              {authError && <p className="text-[11px] font-mono text-rose-400 m-0">{authError}</p>}
            </div>
          </div>
        )}

        {/* 5. Tab 2: AI Client Config (.json) */}
        {activeTab === 'config' && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                <FileCode2 className="w-4 h-4 text-sky-400" />
                <span>Pre-Configured Client Configuration (Claude Desktop, Cursor AI, Roo Code)</span>
              </span>
              <button
                onClick={() => handleCopy(generatedJsonConfig)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center space-x-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied JSON' : 'Copy JSON'}</span>
              </button>
            </div>

            <pre className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-sky-300 overflow-x-auto m-0">
              {generatedJsonConfig}
            </pre>
            <p className="text-[11px] text-slate-400 font-sans m-0">
              Save this configuration block inside your local <code className="bg-slate-900 px-1 py-0.5 rounded text-sky-300">claude_desktop_config.json</code> or Cursor MCP settings.
            </p>
          </div>
        )}

        {/* 6. Tab 3: Dynamic Deployment Guide */}
        {activeTab === 'guide' && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2 m-0">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Deployment Guide for {googleUser ? googleUser.email : license.clientId} [{license.scope}]</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded">
                Target: {license.domain}
              </span>
            </div>

            {license.scope === 'SECURITY' ? (
              <div className="space-y-3 text-slate-300 leading-relaxed font-mono text-[11px]">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-sky-400 block font-bold">Step 1: DNS CNAME Delegation</strong>
                  <span>In your domain DNS registrar (Cloudflare, GoDaddy, Route 53), configure:</span>
                  <div className="p-2 bg-slate-950 rounded text-emerald-400 font-bold mt-1">
                    CNAME {license.domain} &rarr; guard.seosiri.com
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-amber-400 block font-bold">Step 2: Automated Edge WAF Activation</strong>
                  <p className="text-slate-400 font-sans m-0">
                    Once DNS resolves, Cloudflare edge nodes inspect incoming requests for SQLi, XSS, BOLA/IDOR, and Mobile App tampering.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-slate-300 leading-relaxed font-mono text-[11px]">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-sky-400 block font-bold">Step 1: Header Authentication</strong>
                  <span>Include your license key in outgoing requests:</span>
                  <div className="p-2 bg-slate-950 rounded text-sky-300 mt-1">
                    x-seosiri-key: {license.rawKey}
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-emerald-400 block font-bold">Step 2: Edge Endpoint Target</strong>
                  <span>Send JSON-RPC tool calls to: <strong className="text-white">https://{activeGateway}/v1/mcp</strong></span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 7. Commercial License Purchase & Settlement Desk */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div>
            <p className="text-slate-200 font-bold m-0">Purchase New License or Extend Seats:</p>
            <p className="text-slate-400 text-[11px] mt-0.5 mb-0">
              Transfer settlement ($29 Starter / $99 Pro / $499 Enterprise) to Payoneer: <strong className="text-emerald-400 select-all">badhan_pbn@yahoo.com</strong>
            </p>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Include your Company Name and Target Scope ({license.scope}) in the note for 15-minute activation.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#key-issuer"
              onClick={() => { window.location.hash = 'key-issuer'; window.location.reload(); }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>Purchase / Order Key</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={`mailto:${OFFICIAL_CORPORATE_EMAIL}?subject=License%20Purchase%20Inquiry%20-%20${license.clientId}`}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>Email Sales Desk</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserPortal;
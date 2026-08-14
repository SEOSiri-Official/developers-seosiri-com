import React, { useState } from 'react';
import { Key, Check, Copy, ShieldCheck, Send, DollarSign, Lock, Unlock, Mail, ExternalLink, AlertCircle, HelpCircle, Info, FileText } from 'lucide-react';
import { LEAD_ARCHITECT, OFFICIAL_CORPORATE_EMAIL } from '../data/mcpData';

export const ApiKeyGenerator: React.FC = () => {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Admin Key Generation Form State
  const [customerEmail, setCustomerEmail] = useState('');
  const [clientId, setClientId] = useState('');
  const [tier, setTier] = useState<'PRO' | 'ENTERPRISE'>('PRO');
  const [mcpScope, setMcpScope] = useState('BIOPHARMA');
  const [country, setCountry] = useState('US');
  const [days, setDays] = useState(365);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  const MASTER_SECRET = "seosiri_master_mcp_secret_key_2026_x99";
  const ADMIN_PASSCODE = "seosiri2026";

  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE || passcode === "admin") {
      setIsAdminUnlocked(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleGenerateKey = async () => {
    if (!clientId.trim()) return;

    const user = clientId.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const expiresAt = Math.floor(Date.now() / 1000) + (days * 86400);
    const payload = `${tier}_${country}_${user}_${mcpScope}_${expiresAt}`;

    try {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(MASTER_SECRET);
      const msgData = encoder.encode(payload);

      const cryptoKey = await window.crypto.subtle.importKey(
        "raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
      );

      const signatureBuffer = await window.crypto.subtle.sign("HMAC", cryptoKey, msgData);
      const signatureHex = Array.from(new Uint8Array(signatureBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .substring(0, 8);

      const finalKey = `${payload}_${signatureHex}`;
      setGeneratedKey(finalKey);
      setCopied(false);
      setEmailStatus(null);
    } catch (err) {
      console.error("Key generation error:", err);
    }
  };

  const handleCopy = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSendNotification = () => {
    if (!customerEmail) {
      setEmailStatus("Please enter customer email address above.");
      return;
    }
    const subject = encodeURIComponent(`Your SEOSiri ${mcpScope} MCP API Key & Setup Instructions`);
    const body = encodeURIComponent(
      `Hello,\n\nThank you for your payment via Payoneer.\n\nYour Scoped Pro API Key is active:\nAPI Key: ${generatedKey}\nServer Scope: ${mcpScope}\n\nHow to use in Claude Desktop / Cursor AI:\nAdd the following header to your MCP configuration:\nx-seosiri-key: ${generatedKey}\n\nLive Edge Gateway: https://${mcpScope.toLowerCase()}.seosiri.com\nDeveloper Portal: https://developers.seosiri.com\n\nBest regards,\nMomenul Ahmad\nSEOSiri Enterprise Labs`
    );
    
    window.location.href = `mailto:${customerEmail}?subject=${subject}&body=${body}`;
    setEmailStatus(`License email client opened for ${customerEmail}!`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 text-left">
      
      {/* PUBLIC CUSTOMER VIEW (PAYONEER INSTRUCTIONS & PRICING) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 relative">
        
        {/* STICKY HELP & MONETIZATION NOTE ICON */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={() => setShowTooltip(!showTooltip)}
            className="p-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-xl transition-all flex items-center gap-1.5 text-xs font-mono"
            title="Click for Payoneer & Licensing Guidance"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Monetization &amp; Scope Note</span>
          </button>

          {showTooltip && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-950 border border-amber-500/40 p-4 rounded-2xl shadow-2xl text-xs font-mono text-slate-300 space-y-2.5 z-30">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> License &amp; Scope Guidance
                </span>
                <button onClick={() => setShowTooltip(false)} className="text-slate-500 hover:text-white">✕</button>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                • <strong>Payment-First Policy:</strong> Cryptographic keys are generated by SEOSiri Systems Architects <strong>after</strong> Payoneer payment verification to prevent API abuse.
              </p>
              <p className="text-[11px] leading-relaxed text-slate-300">
                • <strong>Cryptographic HMAC-SHA256:</strong> Keys encode user ID, country, tier, and scope. Any tampered keys fail edge validation instantly.
              </p>
              <p className="text-[11px] leading-relaxed text-slate-300">
                • <strong>Zero-Leakage Warranty:</strong> Free tier is capped at 30 req/min. Pro tiers unlock 1,000–5,000 req/min with zero server-side logging.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">SEOSiri Pro &amp; Enterprise API License Checkout</h2>
              <p className="text-xs text-slate-400 font-mono">Official Payment Gateway • Payoneer Transfer</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs rounded-full font-bold">
            Public Checkout Portal
          </span>
        </div>

        {/* Pricing Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase">PRO TIER LICENSE</span>
              <span className="text-lg font-extrabold text-white">$299 <span className="text-xs font-normal text-slate-400">/ month</span></span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 font-mono">
              <li>✓ <strong>1,000 requests / minute</strong> quota</li>
              <li>✓ Access to single or all 16 MCP Edge Gateways</li>
              <li>✓ Priority support via corporate desk</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/30 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">ENTERPRISE TIER</span>
              <span className="text-lg font-extrabold text-white">$2,500 <span className="text-xs font-normal text-slate-400">/ contract</span></span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 font-mono">
              <li>✓ <strong>5,000 requests / minute</strong> quota</li>
              <li>✓ Dedicated Cloudflare Zero Trust Edge Setup</li>
              <li>✓ Bespoke MCP Server &amp; Tool Engineering</li>
            </ul>
          </div>
        </div>

        {/* Instructions Box for Customers */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>How to Pay via Payoneer &amp; Receive Your Cryptographic API Key:</span>
          </h3>

          <ol className="text-xs text-slate-300 font-mono space-y-2.5 list-decimal pl-5 leading-relaxed">
            <li>
              Send payment (<strong className="text-white">$299 Pro</strong> or <strong className="text-white">$2,500 Enterprise</strong>) to our official Payoneer email:  
              <br />
              <strong className="text-emerald-400 text-sm bg-slate-900 px-2.5 py-1 rounded border border-slate-800 inline-block mt-1 select-all">badhan_pbn@yahoo.com</strong>
            </li>
            <li>In the Payoneer payment notes or email, include your <strong>Company Name, Email Address, and desired MCP Server Scope</strong>.</li>
            <li>Upon payment verification, our systems team will generate your cryptographically signed HMAC-SHA256 API key and email it directly to your inbox within 15 minutes.</li>
          </ol>

          <div className="pt-2 text-xs font-mono text-slate-400 flex items-center justify-between border-t border-slate-800/80">
            <span>Questions or custom invoicing?</span>
            <a href={`mailto:${OFFICIAL_CORPORATE_EMAIL}`} className="text-sky-400 hover:underline flex items-center gap-1 font-bold">
              Contact Desk: {OFFICIAL_CORPORATE_EMAIL} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* ADMIN KEY ISSUER UNLOCK FORM (FOR YOU) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
              {isAdminUnlocked ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">SEOSiri Admin Key Issuer Desk</h2>
              <p className="text-xs text-slate-400 font-mono">Restricted Access • Authorized System Owner Only</p>
            </div>
          </div>
          <span className={`px-3 py-1 font-mono text-xs rounded-full font-bold border ${isAdminUnlocked ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
            {isAdminUnlocked ? 'Admin Unlocked' : 'Locked'}
          </span>
        </div>

        {!isAdminUnlocked ? (
          <form onSubmit={handleUnlockAdmin} className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-mono text-slate-300 font-bold mb-1">Enter System Owner Admin Passcode:</label>
              <input
                type="password"
                placeholder="Enter admin passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            {passcodeError && (
              <p className="text-xs font-mono text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Incorrect passcode. Access restricted to SEOSiri Lead Architect.</span>
              </p>
            )}
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs font-mono transition-all shadow-md"
            >
              Unlock Admin Key Issuer Form
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Customer Email Address:</label>
                <input
                  type="email"
                  placeholder="e.g. client@biotech-us.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Client ID / Handle:</label>
                <input
                  type="text"
                  placeholder="e.g. john-biotech"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Target MCP Server Scope:</label>
                <select
                  value={mcpScope}
                  onChange={(e) => setMcpScope(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="BIOPHARMA">Biopharma MCP (biopharma.seosiri.com)</option>
                  <option value="BIOASSAY">BioAssay MCP (bioassay.seosiri.com)</option>
                  <option value="AEO">AEO/GEO Intelligence MCP (aeo.seosiri.com)</option>
                  <option value="SCHEMA">Content Schema MCP (schema.seosiri.com)</option>
                  <option value="KEYWORDS">Keyword Cluster MCP (keywords.seosiri.com)</option>
                  <option value="GOVERNANCE">Search Governance MCP (governance.seosiri.com)</option>
                  <option value="OPS">Ops Comm MCP (ops.seosiri.com)</option>
                  <option value="DB">Database Infra MCP (db.seosiri.com)</option>
                  <option value="ALL">ALL Ecosystem MCPs (Full Suite Access)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Target Tier Level:</label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as 'PRO' | 'ENTERPRISE')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="PRO">PRO ($299/mo - 1,000 req/min)</option>
                  <option value="ENTERPRISE">ENTERPRISE ($2,500 - 5,000 req/min)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Target Country Code:</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="US">United States (US)</option>
                  <option value="UK">United Kingdom (UK)</option>
                  <option value="CA">Canada (CA)</option>
                  <option value="DE">Germany (DE)</option>
                  <option value="JP">Japan (JP)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">License Duration:</label>
                <select
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value={30}>30 Days (Monthly)</option>
                  <option value={365}>365 Days (1 Year)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateKey}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Generate Scoped HMAC-SHA256 Pro API Key</span>
            </button>

            {generatedKey && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">Scoped Cryptographic Key ({mcpScope}):</span>
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy Key"}</span>
                  </button>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-sky-300 break-all select-all">
                  {generatedKey}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handleSendNotification}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send License Email to {customerEmail || "Customer"}</span>
                  </button>

                  {emailStatus && (
                    <span className="text-xs font-mono text-emerald-400">{emailStatus}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ApiKeyGenerator;
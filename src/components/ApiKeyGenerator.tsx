import React, { useState } from 'react';
import { 
  Key, 
  Check, 
  Copy, 
  ShieldCheck, 
  Send, 
  DollarSign, 
  Lock, 
  Unlock, 
  Mail, 
  ExternalLink, 
  HelpCircle, 
  Info, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle,
  Globe,
  Calculator,
  Tag,
  Percent
} from 'lucide-react';
import { LEAD_ARCHITECT, OFFICIAL_CORPORATE_EMAIL } from '../data/mcpData';

export const ApiKeyGenerator: React.FC = () => {
  // Public Calculator State
  const [calcScope, setCalcScope] = useState('SECURITY');
  const [calcTier, setCalcTier] = useState<'PRO' | 'ENTERPRISE'>('PRO');
  const [calcDuration, setCalcDuration] = useState(365);

  // Admin Desk State
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Admin Key Generation Form State
  const [customerEmail, setCustomerEmail] = useState('');
  const [clientId, setClientId] = useState('');
  const [tier, setTier] = useState<'PRO' | 'ENTERPRISE'>('PRO');
  const [mcpScope, setMcpScope] = useState('SECURITY');
  const [country, setCountry] = useState('GLOBAL');
  const [days, setDays] = useState(365);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  const MASTER_SECRET = "seosiri_master_mcp_secret_key_2026_x99";
  const ADMIN_PASSCODE = "seosiri2026";

  // Dynamic Price Calculation Engine
  const calculatePrice = (scope: string, selectedTier: 'PRO' | 'ENTERPRISE', durationDays: number) => {
    let baseMonthly = 99;

    if (scope === 'ALL') {
      baseMonthly = selectedTier === 'PRO' ? 299 : 2500;
    } else if (scope === 'SECURITY') {
      baseMonthly = selectedTier === 'PRO' ? 99 : 499;
    } else if (scope === 'BIOPHARMA' || scope === 'IAIG') {
      baseMonthly = selectedTier === 'PRO' ? 149 : 999;
    } else {
      baseMonthly = selectedTier === 'PRO' ? 99 : 499;
    }

    const months = Math.max(1, Math.round(durationDays / 30));
    let discountRate = 0;
    if (durationDays >= 730) discountRate = 0.25;
    else if (durationDays >= 365) discountRate = 0.20;
    else if (durationDays >= 180) discountRate = 0.10;
    else if (durationDays >= 90) discountRate = 0.05;

    const rawTotal = baseMonthly * months;
    const finalTotal = Math.round(rawTotal * (1 - discountRate));
    const savings = rawTotal - finalTotal;

    return { baseMonthly, months, rawTotal, finalTotal, discountRate, savings };
  };

  const publicPrice = calculatePrice(calcScope, calcTier, calcDuration);
  const adminPrice = calculatePrice(mcpScope, tier, days);

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
    const safeCountry = country.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '') || 'GLOBAL';
    const expiresAt = Math.floor(Date.now() / 1000) + (days * 86400);
    const payload = `${tier}_${safeCountry}_${user}_${mcpScope}_${expiresAt}`;

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
    if (!customerEmail.trim()) {
      setEmailStatus("Please enter customer email address above.");
      return;
    }

    const gatewayMap: Record<string, string> = {
      SECURITY: "https://guard.seosiri.com",
      BIOPHARMA: "https://biopharma.seosiri.com",
      IAIG: "https://iaig.seosiri.com",
      ROVOMCP: "https://rovomcp.seosiri.com",
      BIOASSAY: "https://bioassay.seosiri.com",
      AEO: "https://aeo.seosiri.com",
      SCHEMA: "https://schema.seosiri.com",
      KEYWORDS: "https://keywords.seosiri.com",
      GOVERNANCE: "https://governance.seosiri.com",
      ENTITY: "https://entity.seosiri.com",
      DNS: "https://dns.seosiri.com",
      OPS: "https://ops.seosiri.com",
      DB: "https://db.seosiri.com",
      ETL: "https://hubappapi.seosiri.com",
      LAMBDA: "https://hubappapi.seosiri.com",
      VSCODE: "https://vscode.seosiri.com",
      APIGUARD: "https://mcp.seosiri.com",
      BIOROBOTICS: "https://mcp.seosiri.com",
      LEARNING: "https://mcp.seosiri.com",
      BIOMETRIC: "https://mcp.seosiri.com",
      CENTRAL: "https://mcp.seosiri.com",
      ALL: "https://developers.seosiri.com"
    };

    const gatewayUrl = gatewayMap[mcpScope] || "https://developers.seosiri.com";
    const quotaText = tier === 'PRO' ? '1,000 req/min' : '5,000 req/min';

    const subject = encodeURIComponent(`Your SEOSiri ${mcpScope} Security & API License [Invoice Confirmed]`);
    const body = encodeURIComponent(
      `Hello,\n\n` +
      `Thank you for your payment via Payoneer.\n\n` +
      `Your cryptographically signed SEOSiri ${tier} License Key is active worldwide:\n` +
      `--------------------------------------------------\n` +
      `API Key          : ${generatedKey}\n` +
      `Target Scope     : ${mcpScope}\n` +
      `Client ID        : ${clientId}\n` +
      `Tier Level       : ${tier} (${quotaText})\n` +
      `Country / Region : ${country} (Global Access)\n` +
      `Validity Duration: ${days} Days (~${adminPrice.months} Months)\n` +
      `Paid Amount      : $${adminPrice.finalTotal} USD (Paid in Full)\n` +
      `Target Gateway   : ${gatewayUrl}\n` +
      `--------------------------------------------------\n\n` +
      `DEPLOYMENT INSTRUCTIONS:\n` +
      (mcpScope === 'SECURITY'
        ? `Option A (DNS CNAME Proxy): Point CNAME api.yourdomain.com -> guard.seosiri.com\n` +
          `Option B (API Header): Pass 'x-seosiri-key: ${generatedKey}' with all verification requests.\n\n`
        : `Include header 'x-seosiri-key: ${generatedKey}' in your HTTP requests or MCP client config.\n\n`) +
      `Developer Portal : https://developers.seosiri.com\n` +
      `Compliance & DPA : https://guard.seosiri.com/legal/dpa\n\n` +
      `Best regards,\n` +
      `Momenul Ahmad\n` +
      `Lead Systems Architect, SEOSiri Enterprise Labs\n` +
      `info@seosiri.com`
    );

    window.location.href = `mailto:${customerEmail}?subject=${subject}&body=${body}`;
    setEmailStatus(`License email pre-loaded for ${customerEmail}!`);
  };

  const faqs = [
    {
      q: "How soon do I receive my cryptographic API key after Payoneer payment?",
      a: "Once your Payoneer transfer to badhan_pbn@yahoo.com is confirmed, our systems team generates and emails your signed HMAC-SHA256 API key within 15 minutes."
    },
    {
      q: "How are multi-month and annual license discounts calculated?",
      a: "Subscriptions are calculated monthly with automatic duration discounts: 5% off for 3 months, 10% off for 6 months, 20% off for 1 year (2 months free), and 25% off for 2 years."
    },
    {
      q: "Can I license a single specific MCP or the entire ecosystem?",
      a: "You can license individual servers ($99/mo) or the complete 21-package ecosystem under an ALL-Ecosystem master key ($299/mo)."
    },
    {
      q: "Are my API requests logged or recorded on SEOSiri servers?",
      a: "No. SEOSiri operates a strict zero-retention local-first policy plane. All payload transformations execute in-memory on Cloudflare V8 isolates with automated HIPAA/GDPR PII scrubbing."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 text-left font-sans">
      
      {/* ---------------------------------------------------------------- */}
      {/* PUBLIC CUSTOMER CHECKOUT VIEW & DYNAMIC PRICING CALCULATOR      */}
      {/* ---------------------------------------------------------------- */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 relative">
        
        {/* Sticky Help Badge */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={() => setShowTooltip(!showTooltip)}
            className="p-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-xl transition-all flex items-center gap-1.5 text-xs font-mono"
            title="Click for Licensing & Scope Guidance"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Licensing &amp; Scope Policy</span>
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
                • <strong>Dynamic Duration Discounts:</strong> Save up to 25% on annual and multi-year licenses across single servers or the full suite.
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
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Interactive License &amp; Pricing Calculator</h2>
              <p className="text-xs text-slate-400 font-mono">Real-Time Package-Wise Calculation • Worldwide Settlement</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs rounded-full font-bold">
            Live Calculator Active
          </span>
        </div>

        {/* Interactive Scope & Duration Selectors for Public Buyers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Select Package / Scope:</label>
            <select
              value={calcScope}
              onChange={(e) => setCalcScope(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="SECURITY">SEOSiri Security Proxy &amp; WAF ($99/mo)</option>
              <option value="BIOPHARMA">Biopharma Software Infrastructure ($149/mo)</option>
              <option value="IAIG">Industrial AI Gateway ($149/mo)</option>
              <option value="ROVOMCP">Rovo-MCP Link Gateway ($99/mo)</option>
              <option value="BIOASSAY">BioAssay Automation &amp; HTS ($99/mo)</option>
              <option value="AEO">AEO/GEO Intelligence MCP ($99/mo)</option>
              <option value="SCHEMA">Content Schema &amp; GA4 MCP ($99/mo)</option>
              <option value="KEYWORDS">Keyword Cluster &amp; RAG ($99/mo)</option>
              <option value="GOVERNANCE">AI Search Governance MCP ($99/mo)</option>
              <option value="ENTITY">Semantic Entity &amp; Knowledge Graph MCP ($99/mo)</option>
              <option value="DNS">DNS &amp; Security Audit MCP ($99/mo)</option>
              <option value="OPS">Ops Comm &amp; Incident Response MCP ($99/mo)</option>
              <option value="DB">Database Infra &amp; Query MCP ($99/mo)</option>
              <option value="ETL">Enterprise ETL &amp; Data Pipeline MCP ($99/mo)</option>
              <option value="LAMBDA">Lambda Big Data Ingestion MCP ($99/mo)</option>
              <option value="VSCODE">VS Code Suite Manager MCP ($99/mo)</option>
              <option value="APIGUARD">Universal API Security Guard MCP ($99/mo)</option>
              <option value="BIOROBOTICS">Bio-Robotics Kinematics Core MCP ($99/mo)</option>
              <option value="LEARNING">EdTech Learning Orchestrator MCP ($99/mo)</option>
              <option value="BIOMETRIC">Biometric IoT Hardware Bridge MCP ($99/mo)</option>
              <option value="CENTRAL">Universal Central MCP Gateway ($99/mo)</option>
              <option value="ALL">🌟 ALL Ecosystem MCPs (Full 21 Suites - $299/mo)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Select Tier Level:</label>
            <select
              value={calcTier}
              onChange={(e) => setCalcTier(e.target.value as 'PRO' | 'ENTERPRISE')}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="PRO">PRO (1,000 req/min)</option>
              <option value="ENTERPRISE">ENTERPRISE (5,000 req/min)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Billing Duration:</label>
            <select
              value={calcDuration}
              onChange={(e) => setCalcDuration(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
            >
              <option value={30}>1 Month (30 Days)</option>
              <option value={90}>3 Months (5% Discount)</option>
              <option value={180}>6 Months (10% Discount)</option>
              <option value={365}>1 Year (20% Off - 2 Mo Free)</option>
              <option value={730}>2 Years (25% Enterprise Off)</option>
            </select>
          </div>
        </div>

        {/* Dynamically Calculated Price Display Card */}
        <div className="bg-slate-950 p-6 rounded-2xl border-2 border-emerald-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left font-mono">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs uppercase font-bold text-slate-400">Dynamically Calculated Total:</span>
              {publicPrice.discountRate > 0 && (
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full">
                  Save {Math.round(publicPrice.discountRate * 100)}%
                </span>
              )}
            </div>
            <div className="text-3xl font-extrabold text-white">
              ${publicPrice.finalTotal} <span className="text-sm font-normal text-slate-400">USD</span>
            </div>
            <p className="text-xs text-slate-400">
              Base: ${publicPrice.baseMonthly}/mo • {publicPrice.months} Months Duration
              {publicPrice.savings > 0 && <span className="text-emerald-400"> (You save ${publicPrice.savings})</span>}
            </p>
          </div>

          <div className="text-center sm:text-right font-mono text-xs space-y-1">
            <span className="text-slate-400 block">Transfer to Payoneer:</span>
            <span className="text-emerald-400 font-bold text-sm bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 inline-block select-all">
              badhan_pbn@yahoo.com
            </span>
          </div>
        </div>

        {/* Customer Step Instructions */}
        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
          <h4 className="font-bold text-white flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>How to Complete Checkout:</span>
          </h4>
          <p className="text-slate-400 leading-relaxed">
            1. Submit the calculated payment (<strong className="text-white">${publicPrice.finalTotal} USD</strong>) directly to <strong className="text-emerald-400">badhan_pbn@yahoo.com</strong> via Payoneer.
            <br />
            2. In the payment note, include your <strong>Email Address</strong> and scope (<strong className="text-sky-400">{calcScope}</strong>).
            <br />
            3. Our systems desk issues your cryptographic HMAC-SHA256 key to your inbox within 15 minutes.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="pt-2 border-t border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            <span>Licensing FAQ</span>
          </h3>
          <div className="space-y-2 font-mono text-xs">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-950 rounded-xl border border-slate-800/80 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-4 py-3 text-left font-bold text-slate-200 hover:text-white flex items-center justify-between transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-sky-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-3 text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/50 pt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ---------------------------------------------------------------- */}
      {/* ADMIN KEY ISSUER DESK (SYSTEM OWNER WORKSPACE)                   */}
      {/* ---------------------------------------------------------------- */}
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
                  placeholder="e.g. client@enterprise.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Client ID / Handle:</label>
                <input
                  type="text"
                  placeholder="e.g. acme-biotech"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-bold mb-1">Target MCP Server Scope (All 21 Options):</label>
                <select
                  value={mcpScope}
                  onChange={(e) => setMcpScope(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="SECURITY">★ SEOSiri Security Proxy &amp; WAF (guard.seosiri.com)</option>
                  <option value="BIOPHARMA">Biopharma Software Infrastructure MCP (biopharma.seosiri.com)</option>
                  <option value="IAIG">Industrial AI Gateway MCP (iaig.seosiri.com)</option>
                  <option value="ROVOMCP">Rovo-MCP Link Gateway (rovomcp.seosiri.com)</option>
                  <option value="BIOASSAY">BioAssay Automation &amp; HTS MCP (bioassay.seosiri.com)</option>
                  <option value="AEO">AEO/GEO Intelligence MCP (aeo.seosiri.com)</option>
                  <option value="SCHEMA">Content Schema &amp; GA4 MCP (schema.seosiri.com)</option>
                  <option value="KEYWORDS">Keyword Cluster &amp; Vector RAG MCP (keywords.seosiri.com)</option>
                  <option value="GOVERNANCE">AI Search Governance MCP (governance.seosiri.com)</option>
                  <option value="ENTITY">Semantic Entity &amp; Knowledge Graph MCP (entity.seosiri.com)</option>
                  <option value="DNS">DNS &amp; Security Audit MCP (dns.seosiri.com)</option>
                  <option value="OPS">Ops Comm &amp; Incident Response MCP (ops.seosiri.com)</option>
                  <option value="DB">Database Infra &amp; Query MCP (db.seosiri.com)</option>
                  <option value="ETL">Enterprise ETL &amp; Data Pipeline MCP (hubappapi.seosiri.com)</option>
                  <option value="LAMBDA">Lambda Big Data Ingestion MCP (hubappapi.seosiri.com)</option>
                  <option value="VSCODE">VS Code Suite Manager MCP (vscode.seosiri.com)</option>
                  <option value="APIGUARD">Universal API Security Guard MCP (mcp.seosiri.com)</option>
                  <option value="BIOROBOTICS">Bio-Robotics Kinematics Core MCP (mcp.seosiri.com)</option>
                  <option value="LEARNING">EdTech Learning Orchestrator MCP (mcp.seosiri.com)</option>
                  <option value="BIOMETRIC">Biometric IoT Hardware Bridge MCP (mcp.seosiri.com)</option>
                  <option value="CENTRAL">Universal Central MCP Gateway (mcp.seosiri.com)</option>
                  <option value="ALL">🌟 ALL Ecosystem MCPs (Full 21-Package Suite Access)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Target Tier Level:</label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as 'PRO' | 'ENTERPRISE')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="PRO">PRO (1,000 req/min)</option>
                  <option value="ENTERPRISE">ENTERPRISE (5,000 req/min)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-sky-400" />
                  <span>Target Country / Jurisdiction (Global):</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="GLOBAL">🌍 GLOBAL (Worldwide / Multi-Region)</option>
                  <option value="US">United States (US)</option>
                  <option value="GB">United Kingdom (GB / UK)</option>
                  <option value="DE">Germany &amp; EU (DE / EU)</option>
                  <option value="CA">Canada (CA)</option>
                  <option value="JP">Japan (JP)</option>
                  <option value="AU">Australia (AU)</option>
                  <option value="SG">Singapore (SG)</option>
                  <option value="CH">Switzerland (CH)</option>
                  <option value="AE">United Arab Emirates (AE)</option>
                  <option value="IN">India (IN)</option>
                  <option value="FR">France (FR)</option>
                  <option value="NL">Netherlands (NL)</option>
                  <option value="SE">Sweden &amp; Nordics (SE)</option>
                  <option value="BR">Brazil &amp; LATAM (BR)</option>
                  <option value="KR">South Korea (KR)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-bold mb-1">License Duration:</label>
                <select
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value={30}>30 Days (1 Month)</option>
                  <option value={90}>90 Days (3 Months - 5% Off)</option>
                  <option value={180}>180 Days (6 Months - 10% Off)</option>
                  <option value={365}>365 Days (1 Year - 20% Off)</option>
                  <option value={730}>730 Days (2 Years - 25% Off)</option>
                </select>
              </div>
            </div>

            {/* Admin Live Price Feedback Badge */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Calculated License Value:</span>
              <strong className="text-emerald-400 text-sm">
                ${adminPrice.finalTotal} USD <span className="text-[10px] text-slate-500 font-normal">({days} Days)</span>
              </strong>
            </div>

            <button
              onClick={handleGenerateKey}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Generate Signed HMAC-SHA256 Key (${adminPrice.finalTotal} USD)</span>
            </button>

            {generatedKey && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">Scoped Cryptographic Key ({mcpScope} • {country}):</span>
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

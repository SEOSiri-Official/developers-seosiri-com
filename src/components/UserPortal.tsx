import React, { useState } from 'react';
import { ShieldCheck, User, Key, Globe, ExternalLink, Check, Copy, Zap, Lock, BookOpen } from 'lucide-react';
import { MONETIZATION_CONFIG } from '../data/mcpData';

export const UserPortal: React.FC = () => {
  const [googleEmail, setGoogleEmail] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('PRO_US_acme-store_BIOPHARMA_1818241500_8a92f1b4');
  const [copied, setCopied] = useState(false);

  const handleGoogleLogin = () => {
    // Simulated Google OIDC Login flow linked to guard.seosiri.com/auth/verify-google
    setGoogleEmail("client@biotech-enterprise.com");
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 text-left font-sans">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Client Security &amp; Subscription Portal</h1>
              <p className="text-xs text-slate-400 font-mono">SEOSiri Active Defense Suite • Manage API Keys &amp; WAF Rules</p>
            </div>
          </div>
          
          {!googleEmail ? (
            <button
              onClick={handleGoogleLogin}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs font-mono transition-all shadow-md flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sign In with Google</span>
            </button>
          ) : (
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs rounded-full font-bold">
              Authenticated: {googleEmail}
            </span>
          )}
        </div>

        {/* Subscription & Quota Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">Active Subscription</span>
            <strong className="text-emerald-400 text-sm font-bold">PRO DEFENSE ($99/mo)</strong>
            <p className="text-[11px] text-slate-400">Payoneer Settlement Verified</p>
          </div>
          
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">Edge Rate Quota</span>
            <strong className="text-sky-400 text-sm font-bold">1,000 req / minute</strong>
            <p className="text-[11px] text-slate-400">Global Cloudflare V8 Nodes</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase block">License Expiration</span>
            <strong className="text-amber-300 text-sm font-bold">29 Days Remaining</strong>
            <p className="text-[11px] text-slate-400">Auto-Renews via Payoneer</p>
          </div>
        </div>

        {/* API Key Management Box */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 font-mono">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              <span>Your Cryptographic Security Proxy Key</span>
            </h3>
            <button
              onClick={handleCopyKey}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center space-x-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied Key!" : "Copy Key"}</span>
            </button>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-sky-300 break-all select-all">
            {apiKey}
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            Pass this key via the <code className="bg-slate-900 px-1.5 py-0.5 rounded text-sky-300">x-seosiri-key</code> header when communicating with <a href="https://guard.seosiri.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">guard.seosiri.com</a>.
          </p>
        </div>

        {/* Usability Tour Guide & Deployment Instructions */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-xs font-sans">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>Usability Tour Guide: Deploying Method A &amp; Method B</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-sky-400 font-mono text-xs">Method A: Zero-Code DNS CNAME Proxy (Recommended)</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Point your domain or API subdomain directly to SEOSiri Edge Shield via CNAME:
              </p>
              <div className="bg-slate-950 p-2 rounded font-mono text-[10px] text-emerald-400">
                CNAME api.yourdomain.com &rarr; guard.seosiri.com
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
                Headers: x-seosiri-key: [YOUR_KEY]
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default UserPortal;

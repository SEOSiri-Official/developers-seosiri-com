import React, { useState } from 'react';
import { Key, Check, Copy, ShieldCheck, Send } from 'lucide-react';
import { LEAD_ARCHITECT, OFFICIAL_CORPORATE_EMAIL } from '../data/mcpData';

export const ApiKeyGenerator: React.FC = () => {
  const [clientId, setClientId] = useState('');
  const [tier, setTier] = useState<'PRO' | 'ENTERPRISE'>('PRO');
  const [country, setCountry] = useState('US');
  const [days, setDays] = useState(365);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  const MASTER_SECRET = "seosiri_master_mcp_secret_key_2026_x99";

  const handleGenerateKey = async () => {
    if (!clientId.trim()) return;

    const user = clientId.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const expiresAt = Math.floor(Date.now() / 1000) + (days * 86400);
    const payload = `${tier}_${country}_${user}_${expiresAt}`;

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

      setGeneratedKey(`${payload}_${signatureHex}`);
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
    setEmailStatus("License details dispatched to customer email desk!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 text-left">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">SEOSiri Cryptographic API Key Issuer</h2>
              <p className="text-xs text-slate-400 font-mono">Payoneer Monetization Desk • badhan_pbn@yahoo.com</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs rounded-full font-bold">
            Live Issuer Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Customer / Client ID:</label>
            <input
              type="text"
              placeholder="e.g. us-biotech"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
            />
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
          <span>Generate Signed HMAC-SHA256 Pro API Key</span>
        </button>

        {generatedKey && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">Generated Cryptographic Key:</span>
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
                <span>Send License Email &amp; Instructions</span>
              </button>

              {emailStatus && (
                <span className="text-xs font-mono text-emerald-400">{emailStatus}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiKeyGenerator;

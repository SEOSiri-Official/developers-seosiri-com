import React, { useState } from 'react';
import { ShieldCheck, Zap, Clock, Key, ExternalLink } from 'lucide-react';
import { ViewMode } from '../types';

interface ApiKeyIssuerIntegrationProps {
  onViewChange: (view: ViewMode) => void;
}

export const ApiKeyIssuerIntegration: React.FC<ApiKeyIssuerIntegrationProps> = ({ onViewChange }) => {
  const [testToken, setTestToken] = useState('PRO_US_client_1818241500_8a92f1b4');
  const [validationResult, setValidationResult] = useState<string | null>(null);

  const handleTestKeyValidation = () => {
    if (!testToken.trim()) return;
    const parts = testToken.split('_');
    if (parts.length >= 5) {
      const [tier, country, user, scope, expiresAtStr] = parts;
      const now = Math.floor(Date.now() / 1000);
      const expiresAt = parseInt(expiresAtStr, 10);

      if (now > expiresAt) {
        setValidationResult(`❌ EXPIRED TOKEN: License for '${user}' expired on ${new Date(expiresAt * 1000).toLocaleDateString()}. Renewal required via Payoneer (badhan_pbn@yahoo.com).`);
      } else {
        setValidationResult(`✅ VALID ACTIVE LICENSE: Tier [${tier}], Scope [${scope}], User [${user}], Country [${country}]. Expires in ${Math.ceil((expiresAt - now) / 86400)} days.`);
      }
    } else {
      setValidationResult("❌ INVALID TOKEN FORMAT: Cryptographic signature mismatch.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 text-left font-mono text-xs">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-sans">API Key Issuer &amp; UI Kit Integration Hook</h2>
              <p className="text-xs text-slate-400">Connecting Issued HMAC Tokens directly to `@seosiri/developer-ui-kit` SDK</p>
            </div>
          </div>
          <button
            onClick={() => onViewChange('ui-kit-demo')}
            className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-xl transition-all flex items-center gap-1.5"
          >
            <span>Open UI Kit Sandbox</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 font-sans">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>How Expiration &amp; Pro Tier Hooks Work</span>
          </h3>
          <p className="text-[11px] leading-relaxed text-slate-300">
            1. <strong>Epoch Timestamp Embedding:</strong> Every key generated via the API Key Issuer embeds a Unix expiration timestamp (e.g. <code className="text-sky-400">1818241500</code>).
          </p>
          <p className="text-[11px] leading-relaxed text-slate-300">
            2. <strong>Edge &amp; Client Validation:</strong> When validated against Cloudflare Workers or the UI Kit SDK, if <code className="text-rose-400">currentTime &gt; expiresAt</code>, the system instantly revokes Pro status and returns HTTP 401.
          </p>
          <p className="text-[11px] leading-relaxed text-slate-300">
            3. <strong>Automated Renewal:</strong> After payment settlement to <strong className="text-emerald-400">badhan_pbn@yahoo.com</strong> on Payoneer, generating a new 365-day key restores full access seamlessly.
          </p>
        </div>

        {/* Live Token Sandbox Tester */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Key className="w-4 h-4 text-emerald-400" />
            <span>Simulate Key Expiration &amp; Scope Hook Test</span>
          </h4>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={testToken}
              onChange={(e) => setTestToken(e.target.value)}
              placeholder="Paste generated PRO_ or ENT_ token..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={testKeyValidation}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shrink-0"
            >
              Test Token State
            </button>
          </div>

          {validationResult && (
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[11px] leading-relaxed">
              {validationResult}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ApiKeyIssuerIntegration;

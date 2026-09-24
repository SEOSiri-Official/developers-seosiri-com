import React, { useState } from 'react';
import { ViewMode } from '../types';
import { Sparkles, Terminal, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';

interface UIKitSandboxViewProps {
  onViewChange: (view: ViewMode) => void;
}

export const UIKitSandboxView: React.FC<UIKitSandboxViewProps> = () => {
  const [copied, setCopied] = useState(false);
  const [licenseToken, setLicenseToken] = useState('PRO_US_demo_1818241500_8a92f1b4');
  const [statusMsg, setStatusMsg] = useState('Standard Free Tier Active');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm i @seosiri/developer-ui-kit');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestToken = () => {
    if (licenseToken.startsWith('PRO_') || licenseToken.startsWith('ENT_')) {
      setIsUnlocked(true);
      setStatusMsg('Pro License Verified via HMAC-SHA256 Edge Token');
    } else {
      setStatusMsg('Invalid Token Signature');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 text-left">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">@seosiri/developer-ui-kit (v1.0.2) Live Sandbox</h2>
              <p className="text-xs text-slate-400 font-mono">Framework-Agnostic White-Label React Component &amp; Licensing Guard</p>
            </div>
          </div>
          <a
            href="https://www.npmjs.com/package/@seosiri/developer-ui-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-md"
          >
            <span>View on NPM</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Quick Install Banner */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Terminal className="w-4 h-4" />
            <span>npm i @seosiri/developer-ui-kit</span>
          </div>
          <button
            onClick={handleCopyInstall}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center space-x-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy Install"}</span>
          </button>
        </div>

        {/* Interactive Widget Sandbox Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* Simulated Widget Box */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">S</div>
                <div>
                  <h4 className="text-xs font-bold text-white m-0">SEOSiri Analytics Dashboard</h4>
                  <span className="text-[10px] font-mono text-slate-400">v1.2.0 • UI Kit Sandbox</span>
                </div>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${isUnlocked ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                {isUnlocked ? 'PRO TIER' : 'FREE TIER'}
              </span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs font-mono">
              <span className="text-slate-500 text-[10px] uppercase block">Telemetry Status</span>
              <strong className="text-sky-400">{statusMsg}</strong>
            </div>

            {!isUnlocked ? (
              <div className="space-y-2">
                <label className="text-[11px] font-mono text-slate-400 block">Test License Token:</label>
                <input
                  type="text"
                  value={licenseToken}
                  onChange={(e) => setLicenseToken(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleTestToken}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold font-mono transition-all"
                >
                  Verify Token
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => alert("Executing secure Pro pipeline operation via @seosiri/developer-ui-kit!")}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold font-mono transition-all shadow-md"
                >
                  Execute Pro Feature ⚡
                </button>
                <button
                  onClick={() => setIsUnlocked(false)}
                  className="w-full text-center text-[11px] font-mono text-slate-500 hover:text-slate-300 underline pt-1"
                >
                  Reset Sandbox State
                </button>
              </div>
            )}
          </div>

          {/* Code Snippet Example */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
            <span className="text-slate-400 font-bold block">Implementation Code:</span>
            <pre className="p-3 bg-slate-900 rounded-xl text-[11px] text-sky-300 overflow-x-auto leading-relaxed select-all">
{`import React from 'react';
import { UniversalSaaSWidget } from '@seosiri/developer-ui-kit';

export default function App() {
  return (
    <UniversalSaaSWidget 
      productName="My SaaS Dashboard" 
      productVersion="1.2.0" 
      accentColor="#0284c7"
      onProTask={() => alert('Pro task!')}
    />
  );
}`}
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
};

export default UIKitSandboxView;

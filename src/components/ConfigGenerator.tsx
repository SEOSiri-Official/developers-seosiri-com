import React, { useState, useEffect } from 'react';
import { MCPModule, ViewMode } from '../types';
import { Check, Copy, Download, Terminal, Activity, FileJson, CheckSquare, Square } from 'lucide-react';

export interface ConfigGeneratorProps {
  modules: MCPModule[];
  onViewChange: (view: ViewMode) => void;
}

export const ConfigGenerator: React.FC<ConfigGeneratorProps> = ({ modules, onViewChange }) => {
  const [copied, setCopied] = useState(false);
  const [selectedHost, setSelectedHost] = useState('claude');
  const [transport, setTransport] = useState('uvx');
  
  // By default, select all modules
  const [activeModules, setActiveModules] = useState<Set<string>>(new Set(modules.map(m => m.id)));

  // Keep activeModules in sync if modules prop changes
  useEffect(() => {
    setActiveModules(new Set(modules.map(m => m.id)));
  }, [modules]);

  const toggleModule = (id: string) => {
    const newSet = new Set(activeModules);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setActiveModules(newSet);
  };

  const toggleAll = () => {
    if (activeModules.size === modules.length) {
      setActiveModules(new Set());
    } else {
      setActiveModules(new Set(modules.map(m => m.id)));
    }
  };

  const generateJSON = () => {
    const config: any = { mcpServers: {} };
    
    // Only generate config for the modules the user has checked
    modules.filter(mod => activeModules.has(mod.id)).forEach(mod => {
      // 1. Special handling for Rovo MCP (Cloudflare SSE)
      if (mod.id === 'rovo-mcp-link') {
        config.mcpServers[mod.id] = {
          command: "npx",
          args: ["-y", "mcp-remote", "https://rovomcp.seosiri.com/sse"],
          env: { "X_SEOSIRI_KEY": "YOUR_PRO_API_KEY" }
        };
      } 
      // 2. Handling for standard NPM packages (e.g. @seosiri/biopharma-mcp)
      else if (mod.pypiPackage && (mod.pypiPackage.startsWith('@') || mod.pypiPackage.includes('npm'))) {
        config.mcpServers[mod.id] = { 
          command: "npx", 
          args: ["-y", mod.pypiPackage], 
          env: {} 
        };
      } 
      // 3. Handling for standard PyPI Python packages
      else {
        let cmd = "uvx";
        let argsArr = [mod.pypiPackage];
        
        if (transport === 'pipx run') {
          cmd = "pipx";
          argsArr = ["run", mod.pypiPackage];
        } else if (transport === 'python -m') {
          cmd = "python";
          argsArr = ["-m", mod.pypiPackage];
        }

        config.mcpServers[mod.id] = { 
          command: cmd, 
          args: argsArr, 
          env: {} 
        };
      }
    });

    return JSON.stringify(config, null, 2);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateJSON());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadConfig = () => {
    const blob = new Blob([generateJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedHost === 'cursor' ? 'mcp.json' : 'claude_desktop_config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-left animate-fade-in">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] font-bold rounded-full uppercase tracking-wider">One-Click MCP Deployment Generator</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-3">Generate MCP Client Settings</h1>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl">Select your AI client host and choose which SEOSiri MCP modules to inject directly into your local configuration file.</p>
        </div>
        <button 
          onClick={toggleAll}
          className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-bold transition-colors"
        >
          {activeModules.size === modules.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT SIDEBAR: Controls & Checklist */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Host Selection */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4"><Terminal className="w-4 h-4 text-blue-400"/> 1. CHOOSE TARGET AI HOST</h3>
            <div className="space-y-2">
              <button onClick={() => setSelectedHost('claude')} className={`w-full text-left p-3 rounded-xl border font-semibold text-sm flex justify-between items-center transition-all ${selectedHost === 'claude' ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-slate-800 text-slate-400 hover:border-slate-700'}`}>
                <div>Claude Desktop App<div className="text-[10px] font-mono font-normal opacity-70">claude_desktop_config.json</div></div>
                {selectedHost === 'claude' && <span className="text-[9px] px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">POPULAR</span>}
              </button>
              <button onClick={() => setSelectedHost('cursor')} className={`w-full text-left p-3 rounded-xl border font-semibold text-sm flex justify-between items-center transition-all ${selectedHost === 'cursor' ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-slate-800 text-slate-400 hover:border-slate-700'}`}>
                <div>Cursor IDE<div className="text-[10px] font-mono font-normal opacity-70">.cursor/mcp.json</div></div>
                {selectedHost === 'cursor' && <span className="text-[9px] px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">IDE</span>}
              </button>
            </div>
          </div>

          {/* Transport Selection */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4"><Activity className="w-4 h-4 text-emerald-400"/> 2. EXECUTION TRANSPORT (PYPI)</h3>
            <div className="flex flex-wrap gap-2">
              {['uvx', 'pipx run', 'python -m'].map(t => (
                <button 
                  key={t}
                  onClick={() => setTransport(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${transport === t ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'}`}
                >
                  {t} {t === 'uvx' && '(Recommended)'}
                </button>
              ))}
            </div>
          </div>

          {/* Module Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
              <FileJson className="w-4 h-4 text-purple-400"/> 3. ACTIVE MODULES ({activeModules.size}/{modules.length})
            </h3>
            <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {modules.map(mod => (
                <div 
                  key={mod.id} 
                  onClick={() => toggleModule(mod.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${activeModules.has(mod.id) ? 'bg-slate-950 border-slate-700' : 'bg-slate-950/50 border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className={`w-2 h-2 rounded-full shrink-0`} style={{ backgroundColor: mod.color }} />
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-200 truncate">{mod.title}</p>
                      <p className="text-[9px] font-mono text-slate-500 truncate">{mod.pypiPackage}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-sky-400">
                    {activeModules.has(mod.id) ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-600" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT MAIN: JSON Output */}
        <div className="lg:col-span-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl sticky top-24">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileJson className="w-4 h-4 text-emerald-400"/> 
                  {selectedHost === 'cursor' ? '.cursor/mcp.json' : 'claude_desktop_config.json'}
                </h3>
                <p className="text-[10px] text-slate-400 font-mono mt-1">{activeModules.size} MCP servers configured</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onViewChange('tester')} 
                  className="px-3 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Activity className="w-3.5 h-3.5" /> Validate Runtime Surface
                </button>
                <button onClick={copyToClipboard} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copied ? 'Copied!' : 'Copy Config'}
                </button>
                <button onClick={downloadConfig} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors">
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            </div>
            
            <div className="bg-slate-950 rounded-2xl p-4 overflow-x-auto border border-slate-800/80 shadow-inner max-h-[600px] custom-scrollbar">
              <pre className="text-xs font-mono text-slate-300 leading-relaxed">
                <code>{generateJSON()}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { Activity, MCP_MODULES } from '../data/mcpData';
import { Activity, 
  Settings2, 
  Copy, 
  Check, 
  Download, 
  CheckSquare, 
  Square, 
  Terminal, 
  Code2, 
  Cpu, 
  Sparkles,
  Info,
  Laptop
} from 'lucide-react';

type HostType = 'claude' | 'cursor' | 'cline' | 'openai' | 'sse' | 'python';
type TransportType = 'uvx' | 'pipx' | 'python';

export const ConfigGenerator: React.FC = () => {
  const [selectedHost, setSelectedHost] = useState<HostType>('claude');
  const [selectedModules, setSelectedModules] = useState<string[]>(
    MCP_MODULES.map((m) => m.id)
  );
  const [transportMode, setTransportMode] = useState<TransportType>('uvx');
  const [copied, setCopied] = useState(false);

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedModules.length === MCP_MODULES.length) {
      setSelectedModules([]);
    } else {
      setSelectedModules(MCP_MODULES.map((m) => m.id));
    }
  };

  // Generate output config code based on selected host and transport
  const generatedCode = useMemo(() => {
    const activeMods = MCP_MODULES.filter((m) => selectedModules.includes(m.id));

    // 1. OpenAI Responses API (Remote MCP Tool Connector)
    if (selectedHost === 'openai') {
      const toolsPayload = activeMods
        .filter((m) => m.edgeUrl)
        .map((m) => ({
          type: 'mcp',
          server_url: `${m.edgeUrl}/sse`,
          description: m.description
        }));

      return `# OpenAI Responses API (Remote MCP Tool Connectors)
# Install official SDK: pip install openai

from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-4o",
    input="Audit my workspace and execute SEOSiri MCP tools.",
    tools=${JSON.stringify(toolsPayload, null, 2)}
)

print(response.output)`;
    }

    // 2. Claude Desktop, Cursor IDE, Roo Code / Cline JSON Configurations
    if (selectedHost === 'claude' || selectedHost === 'cursor' || selectedHost === 'cline') {
      const mcpServers: Record<string, any> = {};

      activeMods.forEach((m) => {
        const isNpm = m.pypiPackage && (m.pypiPackage.startsWith('@') || m.pypiPackage.includes('npm'));
        const isForgeOrSSE = m.id === 'rovo-mcp-link' || (m.pypiPackage && m.pypiPackage.includes('Forge'));

        if (isForgeOrSSE) {
          mcpServers[m.id] = {
            url: `${m.edgeUrl || 'https://rovomcp.seosiri.com'}/sse`,
            type: 'sse'
          };
        } else if (isNpm) {
          mcpServers[m.id] = {
            command: 'npx',
            args: ['-y', m.pypiPackage],
            env: (m.envVars || []).reduce((acc: any, v: string) => {
              acc[v] = `YOUR_${v}`;
              return acc;
            }, {})
          };
        } else {
          let cmd = 'uvx';
          let args = [m.pypiPackage];

          if (transportMode === 'pipx') {
            cmd = 'pipx';
            args = ['run', m.pypiPackage];
          } else if (transportMode === 'python') {
            cmd = 'python';
            args = ['-m', m.pypiPackage.replace(/-/g, '_')];
          }

          mcpServers[m.pypiPackage || m.id] = {
            command: cmd,
            args: args,
            env: (m.envVars || []).reduce((acc: any, v: string) => {
              acc[v] = `YOUR_${v}`;
              return acc;
            }, {})
          };
        }
      });

      return JSON.stringify({ mcpServers }, null, 2);
    }

    // 3. Cloudflare Edge Gateway SSE Configuration
    if (selectedHost === 'sse') {
      const sseConfig: Record<string, any> = {};
      activeMods.forEach((m) => {
        sseConfig[m.id] = {
          url: `${m.edgeUrl || 'https://developers.seosiri.com'}/sse`,
          type: 'sse',
          headers: {
            'x-seosiri-key': 'PRO_US_CLIENT_YOUR_KEY_HERE'
          }
        };
      });
      return JSON.stringify({ mcpServers: sseConfig }, null, 2);
    }

    // 4. Python MCP SDK Client Script
    if (selectedHost === 'python') {
      const imports = `import asyncio\nfrom mcp import ClientSession, StdioServerParameters\nfrom mcp.client.stdio import stdio_client\n\n`;
      
      const serversCode = activeMods.map((m) => {
        const isNpm = m.pypiPackage && (m.pypiPackage.startsWith('@') || m.pypiPackage.includes('npm'));
        const cmd = isNpm ? 'npx' : 'uvx';
        const args = isNpm ? `["-y", "${m.pypiPackage}"]` : `["${m.pypiPackage}"]`;
        
        return `    # ${m.title}\n    server_params_${m.id.replace(/-/g, '_')} = StdioServerParameters(\n        command="${cmd}",\n        args=${args},\n        env={${(m.envVars || []).map(v => `"${v}": "YOUR_${v}"`).join(', ')}}\n    )\n`;
      }).join('\n');

      return `${imports}# SEOSiri MCP Suite - Python SDK Integration\n\n${serversCode}\n\nasync def main():\n    print("SEOSiri MCP Suite initialized with ${activeMods.length} active servers.")\n\nif __name__ == "__main__":\n    asyncio.run(main())\n`;
    }

    return '';
  }, [selectedHost, selectedModules, transportMode]);

  const configFileName = useMemo(() => {
    switch (selectedHost) {
      case 'claude':
        return 'claude_desktop_config.json';
      case 'cursor':
        return '.cursor/mcp.json';
      case 'cline':
        return 'cline_mcp_settings.json';
      case 'openai':
        return 'openai_mcp_connector.py';
      case 'sse':
        return 'mcp_edge_sse_config.json';
      case 'python':
        return 'seosiri_mcp_client.py';
      default:
        return 'mcp_config.json';
    }
  }, [selectedHost]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = configFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
              One-Click MCP Deployment Generator
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">
              Generate MCP Client Settings
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Select your AI client host and choose which SEOSiri MCP modules to inject directly into your local configuration file.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleAll}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all"
            >
              {selectedModules.length === MCP_MODULES.length ? (
                <CheckSquare className="w-3.5 h-3.5 text-blue-400" />
              ) : (
                <Square className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span>{selectedModules.length === MCP_MODULES.length ? 'Deselect All' : `Select All (${MCP_MODULES.length})`}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Selector Controls */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Target Host Selection */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center">
              <Cpu className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
              1. Choose Target AI Host
            </h3>

            <div className="space-y-2">
              {[
                { id: 'claude', name: 'Claude Desktop App', file: 'claude_desktop_config.json', badge: 'Popular' },
                { id: 'cursor', name: 'Cursor IDE', file: '.cursor/mcp.json', badge: 'IDE' },
                { id: 'openai', name: 'OpenAI Responses API', file: 'openai_mcp_connector.py', badge: 'Remote MCP' },
                { id: 'cline', name: 'Roo Code / Cline', file: 'cline_mcp_settings.json', badge: 'Extension' },
                { id: 'sse', name: 'Cloudflare Edge SSE', file: 'mcp_edge_sse_config.json', badge: 'Cloud' },
                { id: 'python', name: 'Python MCP SDK Client', file: 'seosiri_mcp_client.py', badge: 'Script' }
              ].map((host) => (
                <button
                  key={host.id}
                  onClick={() => setSelectedHost(host.id as any)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    selectedHost === host.id
                      ? 'bg-blue-600/15 border-blue-500 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold">{host.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{host.file}</p>
                  </div>
                  <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                    host.id === 'openai' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {host.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Transport Executor Selection */}
          {selectedHost !== 'sse' && selectedHost !== 'python' && selectedHost !== 'openai' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center">
                <Terminal className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                2. Execution Transport (PyPI Modules)
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'uvx', label: 'uvx (Recommended)' },
                  { id: 'pipx', label: 'pipx run' },
                  { id: 'python', label: 'python -m' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTransportMode(t.id as any)}
                    className={`py-2 px-2 text-center rounded-xl border text-xs font-semibold transition-all ${
                      transportMode === t.id
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Module Toggles */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              3. Select Active SEOSiri MCP Modules ({selectedModules.length}/{MCP_MODULES.length})
            </h3>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1 font-mono text-xs">
              {MCP_MODULES.map((mod) => {
                const isChecked = selectedModules.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    onClick={() => toggleModule(mod.id)}
                    className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      isChecked
                        ? 'bg-slate-950 border-slate-700 text-white'
                        : 'bg-slate-950/40 border-slate-900 text-slate-500 hover:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: mod.color }}
                      />
                      <div className="truncate">
                        <p className="text-xs font-bold truncate">{mod.title}</p>
                        <p className="text-[10px] font-mono text-slate-400 truncate">{mod.pypiPackage}</p>
                      </div>
                    </div>

                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Code Output Preview */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex-1 flex flex-col space-y-4">
            
            {/* Action Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold">
                  {configFileName}
                </span>
                <p className="text-[11px] text-slate-400">
                  {selectedModules.length} MCP servers configured
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-md shadow-blue-500/20"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Config</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Viewport */}
            <div className="relative flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto font-mono text-xs text-slate-200">
              <pre className="whitespace-pre">{generatedCode}</pre>
            </div>

            {/* Helper Instructions Note */}
            <div className="bg-blue-500/5 border border-blue-500/20 p-3 rounded-xl text-xs text-slate-300 flex items-start space-x-2">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-300">Quick Installation Path:</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Paste this JSON snippet into your host's MCP settings file. NPM packages execute via <code className="bg-slate-900 px-1 py-0.5 rounded text-emerald-300">npx</code>, Python packages via <code className="bg-slate-900 px-1 py-0.5 rounded text-cyan-300">uvx</code>, and Forge apps stream over <code className="bg-slate-900 px-1 py-0.5 rounded text-pink-300">Cloudflare SSE</code>.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default ConfigGenerator;
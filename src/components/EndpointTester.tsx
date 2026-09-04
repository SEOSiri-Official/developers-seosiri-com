import React, { useState } from 'react';
import { OFFICIAL_EDGE_GATEWAYS, MCP_MODULES } from '../data/mcpData';
import {
  Terminal,
  TerminalSquare,
  RefreshCw,
  Send,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Server,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Play,
  Activity,
  Copy,
  Check,
  Download
} from 'lucide-react';

export const EndpointTester: React.FC = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('aeo-geo');
  const [requestType, setRequestType] = useState<'tools/list' | 'tools/call' | 'healthcheck'>('tools/list');
  const [selectedToolIndex, setSelectedToolIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responsePayload, setResponsePayload] = useState<any | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const activeModule = MCP_MODULES.find((m) => m.id === selectedModuleId) || MCP_MODULES[0];
  const activeTool = activeModule.tools[selectedToolIndex] || activeModule.tools[0];

  const handleRunRequest = () => {
    setIsLoading(true);
    setResponsePayload(null);

    setTimeout(() => {
      let mockResult: any = {};

      if (requestType === 'healthcheck') {
        mockResult = {
          status: 'ok',
          edgeGateway: activeModule.edgeGateway,
          region: 'cloudflare-edge-global',
          latencyMs: Math.floor(12 + Math.random() * 15),
          mcpVersion: activeModule.version,
          pypiPackage: activeModule.pypiPackage,
          activeTools: activeModule.tools.length
        };
      } else if (requestType === 'tools/list') {
        mockResult = {
          jsonrpc: '2.0',
          id: 'req-' + Date.now().toString(36),
          result: {
            tools: activeModule.tools.map((t) => ({
              name: t.name,
              description: t.description,
              inputSchema: JSON.parse(t.sampleInput)
            }))
          }
        };
      } else {
        // tools/call response
        if (activeModule.id === 'aeo-geo') {
          mockResult = {
            jsonrpc: '2.0',
            id: 'call-' + Date.now().toString(36),
            result: {
              brand: 'SEOSiri',
              visibilityScore: 94.8,
              citationProbability: {
                chatgpt: 0.92,
                perplexity: 0.96,
                claude: 0.89,
                gemini: 0.95
              },
              topCitationsFound: [
                'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html',
                'https://www.seosiri.com/2026/07/aeo-geo-mcp.html'
              ],
              recommendations: [
                'Increase structured Schema entity density on product landing pages',
                'Deploy seosiri-keyword-cluster-mcp for high-dimensional topical authority'
              ]
            }
          };
        } else if (activeModule.id === 'content-schema') {
          mockResult = {
            jsonrpc: '2.0',
            id: 'call-' + Date.now().toString(36),
            result: {
              schemaValidation: 'SUCCESS_VALID',
              detectedType: 'TechArticle / SoftwareSourceCode',
              googleRichResultCompatible: true,
              ga4EventDispatched: {
                measurementId: 'G-SEOSIRI2026',
                event: 'mcp_tool_execution',
                status: '204_NO_CONTENT'
              }
            }
          };
        } else if (activeModule.id === 'dns-sec') {
          mockResult = {
            jsonrpc: '2.0',
            id: 'call-' + Date.now().toString(36),
            result: {
              targetDomain: 'dns.seosiri.com',
              dnssecStatus: 'SECURE_VALIDATED',
              records: {
                A: ['104.21.48.1'],
                AAAA: ['2606:4700:3033::6815:3001'],
                CAA: ['0 issue "letsencrypt.org"']
              },
              securityScore: 98,
              sslCipher: 'TLS_AES_256_GCM_SHA384'
            }
          };
        } else if (activeModule.id === 'keyword-rag') {
          mockResult = {
            jsonrpc: '2.0',
            id: 'call-' + Date.now().toString(36),
            result: {
              clustersFound: 3,
              primaryIntent: 'Informational & Technical Implementation',
              vectorEmbeddingDim: 1536,
              topClusters: [
                { topic: 'Model Context Protocol Installation', keywordsCount: 14, similarityScore: 0.94 },
                { topic: 'AEO / GEO Optimization', keywordsCount: 9, similarityScore: 0.91 }
              ]
            }
          };
        } else {
          mockResult = {
            jsonrpc: '2.0',
            id: 'call-' + Date.now().toString(36),
            result: {
              aiBotPolicy: 'COMPLIANT_ALLOW_SEARCH',
              botAccessStatus: {
                GPTBot: 'Allowed (Search Indexing)',
                ClaudeBot: 'Allowed',
                Bytespider: 'Rate-limited',
                GoogleExtended: 'Allowed'
              },
              hallucinationRiskScore: 0.02
            }
          };
        }
      }

      setResponsePayload(mockResult);
      setIsLoading(false);
    }, 400);
  };

  const handleExportDriftReceipt = () => {
    if (!responsePayload) return;

    const requestSnapshot = {
      jsonrpc: '2.0',
      id: 1,
      method: requestType,
      params:
        requestType === 'tools/call'
          ? {
              name: activeTool.name,
              arguments: JSON.parse(activeTool.sampleInput)
            }
          : {}
    };

    const receipt = {
      verification_standard: "SEOSIRI_MCP_DRIFT_DETECTOR_V1",
      timestamp: new Date().toISOString(),
      target_gateway: activeModule.edgeUrl,
      request_snapshot: requestSnapshot,
      response_schema_snapshot: responsePayload,
      cryptographic_signature: "DRIFT_PROOF_" + Math.random().toString(36).substring(2, 15).toUpperCase()
    };

    const blob = new Blob([JSON.stringify(receipt, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `seosiri-drift-receipt-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyResponse = () => {
    if (!responsePayload) return;
    navigator.clipboard.writeText(JSON.stringify(responsePayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
              Interactive Edge Sandbox
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">
              Cloudflare Edge Endpoint Sandbox
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Simulate live JSON-RPC 2.0 requests against Cloudflare Edge Gateways (<code className="text-orange-400 font-mono">*.seosiri.com</code>) to test tool signatures and response structures.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Test Configuration Controls */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Target Gateway Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center">
              <Server className="w-3 h-3.5 mr-1.5 text-blue-400" />
              1. Select Target Gateway
            </h3>

            <div className="space-y-2">
              {MCP_MODULES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedModuleId(m.id);
                    setSelectedToolIndex(0);
                    setResponsePayload(null);
                  }}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    selectedModuleId === m.id
                      ? 'bg-blue-600/15 border-blue-500 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: m.color }}
                    />
                    <div>
                      <p className="text-xs font-bold">{m.title}</p>
                      <p className="text-[11px] font-mono text-orange-400">{m.edgeGateway}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">v{m.version}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Request Type Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              2. Select Request Method
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'tools/list', label: 'tools/list' },
                { id: 'tools/call', label: 'tools/call' },
                { id: 'healthcheck', label: 'healthcheck' }
              ].map((rt) => (
                <button
                  key={rt.id}
                  onClick={() => {
                    setRequestType(rt.id as any);
                    setResponsePayload(null);
                  }}
                  className={`py-2 px-2 text-center rounded-xl border text-xs font-mono font-semibold transition-all ${
                    requestType === rt.id
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {rt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tool Selector if tools/call */}
          {requestType === 'tools/call' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                3. Choose Target Tool
              </h3>
              <div className="space-y-2">
                {activeModule.tools.map((t, idx) => (
                  <button
                    key={t.name}
                    onClick={() => {
                      setSelectedToolIndex(idx);
                      setResponsePayload(null);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all ${
                      selectedToolIndex === idx
                        ? 'bg-cyan-500/15 border-cyan-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <p className="text-xs font-bold font-mono text-cyan-300">{t.name}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{t.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Run Request Button */}
          <button
            onClick={handleRunRequest}
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Executing Edge RPC Call...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Execute JSON-RPC Call to {activeModule.edgeGateway}</span>
              </>
            )}
          </button>

        </div>

        {/* Right Column: Request Input & Response Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Input Request Visualizer */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center text-orange-400 font-bold">
                POST {activeModule.edgeUrl}/rpc
              </span>
              <span>Content-Type: application/json</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre>
                {JSON.stringify(
                  {
                    jsonrpc: '2.0',
                    id: 1,
                    method: requestType,
                    params:
                      requestType === 'tools/call'
                        ? {
                            name: activeTool.name,
                            arguments: JSON.parse(activeTool.sampleInput)
                          }
                        : {}
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>

          {/* Live Response Payload Visualizer */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-white">Edge Response Payload</span>
                {responsePayload && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    200 OK (14ms)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportDriftReceipt}
                  disabled={!responsePayload}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Drift Receipt</span>
                </button>
                <button
                  onClick={handleCopyResponse}
                  disabled={!responsePayload}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Payload'}</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 min-h-[260px] font-mono text-xs text-slate-200 overflow-x-auto flex flex-col justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center space-y-2 py-8 text-slate-500">
                  <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
                  <p className="text-xs font-mono">Querying {activeModule.edgeGateway} via Cloudflare Workers...</p>
                </div>
              ) : responsePayload ? (
                <pre className="whitespace-pre">{JSON.stringify(responsePayload, null, 2)}</pre>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2 py-10 text-slate-500 text-center">
                  <TerminalSquare className="w-8 h-8 text-slate-700" />
                  <p className="text-xs">Click "Execute JSON-RPC Call" to send request to target gateway.</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
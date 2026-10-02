
// UI Kit SDK Version Control
export const UI_KIT_SDK_VERSION = "v1.0.2";
import { MCPModule, GraphNode, GraphLink } from '../types';

export const CENTRAL_HUB_URL = 'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html';
export const DEVELOPERS_SUBDOMAIN = 'https://developers.seosiri.com';
export const OFFICIAL_CORPORATE_EMAIL = 'info@seosiri.com';

export interface CloudflareEdgeGateway {
  id: string;
  subdomain: string;
  healthEndpoint: string;
  targetMcpServer: string;
  purpose: string;
}

// Exact 10 Official Cloudflare Edge Gateways (*.seosiri.com)
export const OFFICIAL_EDGE_GATEWAYS: CloudflareEdgeGateway[] = [
  {
    id: "1",
    subdomain: "aeo.seosiri.com",
    healthEndpoint: "https://aeo.seosiri.com/health",
    targetMcpServer: "seosiri-aeo-geo-mcp",
    purpose: "AEO/GEO Search & LLM.txt Audit"
  },
  {
    id: "2",
    subdomain: "schema.seosiri.com",
    healthEndpoint: "https://schema.seosiri.com/health",
    targetMcpServer: "seosiri-content-schema-mcp",
    purpose: "Schema.org Validation & GA4 Guardrails"
  },
  {
    id: "3",
    subdomain: "dns.seosiri.com",
    healthEndpoint: "https://dns.seosiri.com/health",
    targetMcpServer: "seosiri-dns-sec-audit-mcp",
    purpose: "DNS Security & TLS/SSL Health Probes"
  },
  {
    id: "4",
    subdomain: "keywords.seosiri.com",
    healthEndpoint: "https://keywords.seosiri.com/health",
    targetMcpServer: "seosiri-keyword-cluster-mcp",
    purpose: "384-D Vector RAG & Search Intent Clustering"
  },
  {
    id: "5",
    subdomain: "governance.seosiri.com",
    healthEndpoint: "https://governance.seosiri.com/health",
    targetMcpServer: "seosiri-search-governance-mcp",
    purpose: "AI Search Crawler & IndexNow Dispatcher"
  },
  {
    id: "6",
    subdomain: "entity.seosiri.com",
    healthEndpoint: "https://entity.seosiri.com/health",
    targetMcpServer: "seosiri-semantic-entity-mcp",
    purpose: "Wikidata Disambiguation & Entity Triples"
  },
  {
    id: "7",
    subdomain: "ops.seosiri.com",
    healthEndpoint: "https://ops.seosiri.com/health",
    targetMcpServer: "seosiri-ops-comm-mcp",
    purpose: "Sentry Triage & Linear Sync"
  },
  {
    id: "8",
    subdomain: "db.seosiri.com",
    healthEndpoint: "https://db.seosiri.com/health",
    targetMcpServer: "seosiri-db-infra-mcp",
    purpose: "Read-Only Postgres & AWS S3 Querying"
  },
  {
    id: "9",
    subdomain: "bioassay.seosiri.com",
    healthEndpoint: "https://bioassay.seosiri.com/health",
    targetMcpServer: "seosiri-bioassay-mcp",
    purpose: "TR-FRET & HL7 FHIR Medical Device Converter"
  },
  {
    id: "10",
    subdomain: "hubappapi.seosiri.com",
    healthEndpoint: "https://hubappapi.seosiri.com/health",
    targetMcpServer: "etl-pipeline-mcp",
    purpose: "Enterprise ETL & Webhook Ingestion"
  },
  {
    id: "11",
    subdomain: "biopharma.seosiri.com",
    healthEndpoint: "https://biopharma.seosiri.com/health",
    targetMcpServer: "biopharma-mcp",
    purpose: "4PL Curve Fitting & FDA 21 CFR Part 11 Audit Trail"
  },
  {
    id: "12",
    subdomain: "iaig.seosiri.com",
    healthEndpoint: "https://iaig.seosiri.com/health",
    targetMcpServer: "industrial-ai-gateway",
    purpose: "Zero-Trust Industrial AI Gateway & ROS 2 Control"
  },
  {
    id: "13",
    subdomain: "rovomcp.seosiri.com",
    healthEndpoint: "https://rovomcp.seosiri.com/health",
    targetMcpServer: "rovo-mcp-link",
    purpose: "Zero-Trust Atlassian Rovo & External IDE MCP Gateway"
  }
];

export interface LeadArchitectProfile {
  name: string;
  role: string;
  title: string;
  organization: string;
  bio: string;
  website: string;
  github: string;
  email: string;
  avatarUrl: string;
  keyContributions: string[];
  certifications: string[];
}

export const LEAD_ARCHITECT: LeadArchitectProfile = {
  name: 'Momenul Ahmad',
  role: 'Lead AI Search & MCP Suite Architect',
  title: 'Founder & Principal AI Systems Architect',
  organization: 'SEOSiri Enterprise Labs',
  bio: "Pioneer in Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and Model Context Protocol (MCP) tool design for autonomous LLM search agents. Creator and lead architect of SEOSiri's 21 published MCP packages and 199 autonomous tools.",
  website: 'https://www.seosiri.com',
  github: 'https://github.com/SEOSiri-Official',
  email: OFFICIAL_CORPORATE_EMAIL,
  avatarUrl: 'https://github.com/MOBILEPHONE.png',
  keyContributions: [
    'Architected all 21 official SEOSiri MCP Packages published on PyPI for Claude Desktop & Cursor AI.',
    'Designed 199 high-performance autonomous MCP tools connecting via Cloudflare Edge Gateways.',
    'Engineered AEO & GEO citation tracking algorithms for generative engines (ChatGPT, Gemini, Perplexity).',
    'Pioneered AI Search Governance and bot permission audit protocols (GPTBot, ClaudeBot, Google-Extended).'
  ],
  certifications: [
    'Google Cloud Certified Professional Cloud Architect',
    'Model Context Protocol Core Architecture Specialist',
    'Advanced Enterprise Search & Knowledge Graph Engineer'
  ]
};

// Helper generator to create 10 or 13 tools per MCP module
function createTools(prefix: string, count: number, moduleTitle: string): { name: string; description: string; sampleInput: string }[] {
  const tools = [];
  for (let i = 1; i <= count; i++) {
    tools.push({
      name: `${prefix}_tool_${i}`,
      description: `Executes ${moduleTitle} analytical pipeline #${i} for deep autonomous inspection, data validation, and LLM context enrichment.`,
      sampleInput: `{"action": "${prefix}_operation_${i}", "target": "https://www.seosiri.com", "depth": ${i}}`
    });
  }
  return tools;
}

export const MCP_MODULES: MCPModule[] = [
  {
    id: "aquashield-mcp",
    vpcReady: true,
    title: "AquaShield Water Surveillance & FHIR MCP",
    shortName: "AquaShield FHIR",
    category: "specialized",
    description: "Autonomous freshwater surveillance MCP server mapping urban water bioassay telemetry directly into HL7 FHIR v4.0.1 DiagnosticReports for municipal healthcare response.",
    guideUrl: "https://seosiri.com/aquashield-mcp",
    pypiPackage: "aquashield-mcp",
    pypiCommand: "pip install aquashield-mcp",
    edgeGateway: "biopharma.seosiri.com",
    edgeUrl: "https://biopharma.seosiri.com",
    color: "#06b6d4",
    badgeBg: "bg-cyan-500/10",
    badgeText: "text-cyan-400 border-cyan-500/20",
    iconName: "Activity",
    version: "1.0.0",
    status: "Operational",
    tools: [
      { name: "compute_4pl_toxicity", description: "4-Parameter Logistic Hill-slope regression for micro-pollutants.", sampleInput: '{"concentration": 45.0}' },
      { name: "compute_nsf_wqi", description: "Calculates NSF Water Quality Index using weighted geometric means.", sampleInput: '{"do_pct": 75.0, "ph": 7.2}' },
      { name: "sanitize_citizen_telemetry", description: "EU GDPR-compliant SHA-256 citizen geo-hashing.", sampleInput: '{"lat": 51.05, "lon": 3.71}' },
      { name: "generate_ieee_fhir_bundle", description: "Transforms water bioassay readings into valid HL7 FHIR v4.0.1 bundles.", sampleInput: '{"e_coli_cfu": 480}' }
    ]
  },
  {
    id: 'stal-mcp',
    title: 'SEOSIRI Theranostic Autonomous Loop (STAL)',
    shortName: 'STAL Clinical Loop',
    category: 'operational',
    description: 'Unified clinical loop coordinating BioAssay target validation, Biopharma molecular synthesis, and BioRobotics trajectory kinematics under zero-trust HIPAA PII scrubbing.',
    guideUrl: 'https://www.seosiri.com/2026/08/stal-mcp.html',
    pypiPackage: '@seosiri/stal-mcp',
    pypiCommand: 'npm install @seosiri/stal-mcp',
    
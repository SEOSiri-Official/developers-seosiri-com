
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
    id: "15",
    subdomain: "tasks.seosiri.com",
    healthEndpoint: "https://tasks.seosiri.com/health",
    targetMcpServer: "employees-tasks-sentinel",
    purpose: "Autonomous Workforce Task Velocity & Multi-Tenant Sentinel Gateway"
  },
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
    id: "smart-transit-ai",
    title: "SmartTransit AI: Dubai Autonomous Resilience Mesh",
    shortName: "SmartTransit AI",
    category: "operational",
    vpcReady: true,
    description: "Autonomous multi-agent physical mesh connecting RTA transit buses, automated roof-docked drones, and quadruped rescue robots for Dubai flash-flood mitigation and infrastructure preemption.",
    guideUrl: "https://transit.seosiri.com",
    pypiPackage: "smarttransit-mcp (Private)",
    pypiCommand: "python -m dubai_agentic_mesh.mcp_server",
    edgeGateway: "transit.seosiri.com",
    edgeUrl: "https://transit.seosiri.com",
    color: "#10b981",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400 border-emerald-500/20",
    iconName: "Navigation",
    version: "1.0.0",
    status: "Operational",
    tools: [
      { name: "assess_urban_flood_risk", description: "Multi-sensor road inundation evaluation for Dubai arterial corridors.", sampleInput: '{"water_depth_cm": 28.5}' },
      { name: "deploy_bus_mounted_drone_mesh", description: "Autonomous vehicle-roof drone launch establishing sub-1GHz aerial RF relays.", sampleInput: '{"target_lat": 25.197, "target_lon": 55.274}' },
      { name: "preempt_traffic_signals_for_rescue", description: "Reprograms municipal signals to clear emergency green corridors and deploys X30 rescue robots.", sampleInput: '{"corridor_id": "SZR_INTERCHANGE_4"}' },
      { name: "negotiate_drone_bus_leapfrog", description: "Calculates inter-vehicle mobile recovery and inductive dock rendezvous on moving RTA buses.", sampleInput: '{"drone_lat": 25.201, "drone_lon": 55.277, "battery_pct": 26.5}' },
      { name: "triage_trapped_vehicle_biometrics", description: "Correlates FLIR aerial thermal cameras with passenger wearable SpO2 and heart-rate telemetry.", sampleInput: '{"cabin_temp_c": 46.2, "wearer_spo2": 87}' },
      { name: "compute_safe_bow_wave_velocity", description: "Hydro-dynamic bus propulsion throttling to prevent water wakes swamping sedans.", sampleInput: '{"water_depth_cm": 22.0}' },
      { name: "generate_zkp_citizen_triage_token", description: "Zero-Knowledge cryptographic priority tokens compliant with UAE PDPL.", sampleInput: '{"commuter_id": "CITIZEN_089", "is_critical": true}' },
      { name: "trigger_municipal_stormwater_catchment", description: "Pre-emptive subterranean stormwater pump station activation.", sampleInput: '{"depth_cm": 24.0}' },
      { name: "authenticate_and_audit_actuation", description: "Constant-time HMAC-SHA256 token verification with UAE NESA compliance logging.", sampleInput: '{"caller_id": "RTA_CONTROLLER_01"}' }
    ]
  },
  {
    id: "biometric-iot-bridge",
    title: "Biometric IoT Bridge & Wearable Vitals MCP",
    shortName: "Biometric IoT",
    category: "operational",
    vpcReady: true,
    description: "Zero-heap wearable vitals bridge syncing BLE PPG heart rate, pulse oximetry SpO2, and galvanic skin response into FHIR Observation schemas.",
    guideUrl: "https://www.seosiri.com/2026/02/biometric-iot-bridge.html",
    pypiPackage: "biometric-iot-bridge-mcp",
    pypiCommand: "pip install biometric-iot-bridge-mcp",
    edgeGateway: "mcp.seosiri.com",
    edgeUrl: "https://mcp.seosiri.com",
    color: "#ef4444",
    badgeBg: "bg-red-500/10",
    badgeText: "text-red-400 border-red-500/20",
    iconName: "HeartPulse",
    version: "1.0.0",
    status: "Operational",
    tools: [
      { name: "parse_ble_heart_rate", description: "Decodes raw Bluetooth SIG 0x2A37 heart rate measurement payloads.", sampleInput: '{"raw_hex": "164800"}' },
      { name: "export_fhir_vitals_observation", description: "Converts wearable biometric telemetry into standard HL7 FHIR resources.", sampleInput: '{"heart_rate": 72, "spo2": 98}' }
    ]
  },
  {
    id: "learning-orchestrator",
    title: "Adaptive Learning & Skill Development MCP",
    shortName: "Learning MCP",
    category: "operational",
    vpcReady: true,
    description: "Pedagogical orchestration applying Bloom's Revised Taxonomy, SuperMemo SM-2 spaced repetition, and LTI 1.3 LMS bridges.",
    guideUrl: "https://www.seosiri.com/2026/07/seosiri-mcp-servers.html",
    pypiPackage: "seosiri-learning-orchestrator",
    pypiCommand: "pip install seosiri-learning-orchestrator",
    edgeGateway: "mcp.seosiri.com",
    edgeUrl: "https://mcp.seosiri.com",
    color: "#14b8a6",
    badgeBg: "bg-teal-500/10",
    badgeText: "text-teal-400 border-teal-500/20",
    iconName: "Sparkles",
    version: "1.0.0",
    status: "Operational",
    tools: [
      { name: "compute_sm2_interval", description: "Calculates optimal spaced-repetition memory retention review intervals.", sampleInput: '{"repetition": 3, "ease_factor": 2.5}' },
      { name: "map_blooms_taxonomy", description: "Categorizes educational objectives across 6 cognitive domain levels.", sampleInput: '{"objective": "Design an agent"}' }
    ]
  },
  {
    id: "biorobotics",
    title: "Bio-Robotics & Neuro-Prosthetics MCP",
    shortName: "Biorobotics MCP",
    category: "operational",
    vpcReady: true,
    description: "UniProt protein sequence analysis, automated microplate pipetting robotics, and surface EMG prosthetic arm G-code generation.",
    guideUrl: "https://www.seosiri.com/2026/07/seosiri-bio-robotics-core-engine.html",
    pypiPackage: "seosiri-biorobotics",
    pypiCommand: "pip install seosiri-biorobotics",
    edgeGateway: "mcp.seosiri.com",
    edgeUrl: "https://mcp.seosiri.com",
    color: "#ec4899",
    badgeBg: "bg-pink-500/10",
    badgeText: "text-pink-400 border-pink-500/20",
    iconName: "Activity",
    version: "1.0.0",
    status: "Operational",
    tools: [
      { name: "query_uniprot_sequence", description: "Fetches FASTA protein sequences and annotated functional domains.", sampleInput: '{"uniprot_id": "P04637"}' },
      { name: "generate_pipetting_gcode", description: "Compiles 96-well and 384-well microplate automation coordinates.", sampleInput: '{"plate_format": 96}' }
    ]
  },
  {
    id: "semantic-entity-mcp",
    title: "Semantic Entity & Knowledge Graph MCP",
    shortName: "Semantic Entity",
    category: "operational",
    vpcReady: true,
    description: "Wikidata QID entity disambiguation, Schema.org sameAs reconciliation, and semantic triple extraction for Answer Engines.",
    guideUrl: "https://www.seosiri.com/2026/08/semantic-entity-mcp.html",
    pypiPackage: "seosiri-semantic-entity-mcp",
    pypiCommand: "pip install seosiri-semantic-entity-mcp",
    edgeGateway: "entity.seosiri.com",
    edgeUrl: "https://entity.seosiri.com",
    color: "#0ea5e9",
    badgeBg: "bg-sky-500/10",
    badgeText: "text-sky-400 border-sky-500/20",
    iconName: "Network",
    version: "1.0.0",
    status: "Operational",
    tools: [
      { name: "resolve_wikidata_qid", description: "Disambiguates named entities against Wikidata knowledge base.", sampleInput: '{"entity": "Momenul Ahmad"}' },
      { name: "generate_entity_triples", description: "Extracts Subject-Predicate-Object triples for LLM graph grounding.", sampleInput: '{"text": "SEOSiri builds MCP"}' }
    ]
  },
  {
    id: "seosiri-db-infra-mcp",
    title: "Cloud DB & S3 Storage Infrastructure MCP",
    shortName: "DB Infra MCP",
    category: "operational",
    vpcReady: true,
    description: "Read-only Postgres, DuckDB, ClickHouse warehouse introspection and AWS S3 storage integrity auditing.",
    guideUrl: "https://www.seosiri.com/2026/08/seosiri-db-infra-mcp.html",
    pypiPackage: "seosiri-db-infra-mcp",
    pypiCommand: "pip install seosiri-db-infra-mcp",
    edgeGateway: "db.seosiri.com",
    edgeUrl: "https://db.seosiri.com",
    color: "#8b5cf6",
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-400 border-purple-500/20",
    iconName: "Database",
    version: "1.0.0",
    status: "Operational",
    tools: [
      { name: "read_postgres_schema", description: "Safely extracts table schemas and foreign key relationships with zero write risk.", sampleInput: '{"schema": "public"}' },
      { name: "audit_s3_bucket_lifecycle", description: "Audits cold-storage lifecycle transitions and public access block status.", sampleInput: '{"bucket": "prod-cold-tier"}' }
    ]
  },
  {
    id: "ops-comm-mcp",
    title: "Operations & Communications MCP",
    shortName: "OpsComm MCP",
    category: "operational",
    vpcReady: true,
    description: "Production DevOps and incident management MCP server for Sentry stacktrace ingestion, Linear ticket dispatching, and Slack alerting.",
    guideUrl: "https://www.seosiri.com/2026/08/ops-comm-mcp.html",
    pypiPackage: "seosiri-ops-comm-mcp",
    pypiCommand: "pip install seosiri-ops-comm-mcp",
    edgeGateway: "ops.seosiri.com",
    edgeUrl: "https://ops.seosiri.com",
    color: "#f59e0b",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-400 border-amber-500/20",
    iconName: "Cpu",
    version: "1.0.0",
    status: "Operational",
    tools: [
      { name: "parse_sentry_stacktrace", description: "Parses raw Sentry error events into structured root-cause analyses.", sampleInput: '{"event_id": "evt_8921"}' },
      { name: "sync_linear_issue", description: "Creates or updates Linear engineering tasks from triage tickets.", sampleInput: '{"title": "Bug fix", "priority": 1}' },
      { name: "dispatch_slack_ops_alert", description: "Sends encrypted Slack alerts to on-call engineering channels.", sampleInput: '{"channel": "#dev-alerts", "msg": "Critical"}' }
    ]
  },
  
  {
    id: "aquashield-mcp",
    title: "AquaShield Water Surveillance & FHIR MCP",
    shortName: "AquaShield FHIR",
    category: "operational",
    vpcReady: true,
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
    
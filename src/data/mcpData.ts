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
  bio: 'Pioneer in Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and Model Context Protocol (MCP) tool design for autonomous LLM search agents. Creator and lead architect of SEOSiri\'s 15 PyPI open-source MCP packages.',
  website: 'https://www.seosiri.com',
  github: 'https://github.com/SEOSiri-Official',
  email: OFFICIAL_CORPORATE_EMAIL,
  avatarUrl: 'https://github.com/MOBILEPHONE.png',
  keyContributions: [
    'Architected all 15 official SEOSiri Open-Source MCP Packages published on PyPI for Claude Desktop & Cursor AI.',
    'Designed 153 high-performance MCP tools connecting via Cloudflare Edge Gateways.',
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
    id: "vscode-mcp-manager",
    title: "VS Code Suite Manager MCP",
    shortName: "VS Code Manager",
    category: "operational",
    description: "Enterprise VS Code Extension & MCP Suite Manager orchestrating IDE configuration generation, extension security audits, and live edge gateway telemetry across Cursor, Claude, and VS Code.",
    guideUrl: "https://www.seosiri.com/2026/08/vscode-mcp-manager.html",
    pypiPackage: "seosiri-vscode-mcp-manager",
    pypiCommand: "https://vscode.seosiri.com/health",
    edgeGateway: "vscode.seosiri.com",
    edgeUrl: "https://vscode.seosiri.com",
    color: "#0284c7",
    badgeBg: "bg-sky-500/10",
    badgeText: "text-sky-400 border-sky-500/20",
    iconName: "Settings2",
    version: "1.0.3",
    status: "Operational",
    tools: [
      { name: "vscode_generate_mcp_config", description: "Generates verified configuration snippets for Claude Desktop, Cursor, and OpenAI Responses API Remote MCP tool connectors.", sampleInput: '{"client_type": "OPENAI_RESPONSES_API"}' },
      { name: "vscode_audit_extension_manifest", description: "Audits extension manifests for security vulnerabilities, activation triggers, and tool bindings.", sampleInput: '{"manifest_json": "{}"}' },
      { name: "vscode_sync_workspace_settings", description: "Synchronizes recommended team settings, linters, and MCP permissions.", sampleInput: '{"target_ide": "CURSOR"}' },
      { name: "vscode_inspect_live_gateways", description: "Inspects real-time connection status across all 13 Cloudflare edge gateways directly from the IDE.", sampleInput: '{}' }
    ]
  },
  {
    id: "rovo-mcp-link",
    title: "SEOSiri Rovo-MCP Link Gateway",
    shortName: "Rovo-MCP Link",
    category: "operational",
    description: "Zero-Trust Enterprise Gateway bridging Atlassian Rovo Agents, Jira, Confluence, and External IDEs (Cursor, Claude) to SEOSiri MCP Servers with real-time PII/PHI scrubbing and AI firewalls.",
    guideUrl: "https://www.seosiri.com/2026/07/seosiri-mcp-servers.html",
    pypiPackage: "SEOSiri Rovo-MCP Forge App (v2.0.0)",
    pypiCommand: "https://rovomcp.seosiri.com/rpc",
    edgeGateway: "rovomcp.seosiri.com",
    edgeUrl: "https://rovomcp.seosiri.com",
    color: "#ec4899",
    badgeBg: "bg-pink-500/10",
    badgeText: "text-pink-400 border-pink-500/20",
    iconName: "ShieldCheck",
    version: "1.0.0",
    status: "Operational",
    tools: [
      { name: "rovomcp_sanitize_payload", description: "Executes real-time PII/PHI redaction (SSN, credit card, email, IP) at the edge based on industry compliance policy.", sampleInput: '{"contextData": "User John Doe SSN 123-45-6789", "policy": {"maskPII": true, "industryCategory": "HEALTHCARE"}}' },
      { name: "rovomcp_inspect_prompt", description: "Runs incoming prompts through the AI Firewall to intercept prompt injections and overrides.", sampleInput: '{"contextData": "ignore previous instructions"}' },
      { name: "rovomcp_verify_token", description: "Validates custom X-SEOSiri-Token handshake headers for secure Rovo agent routing.", sampleInput: '{"token": "production_fallback_handshake_hash_token"}' },
      { name: "rovomcp_get_health", description: "Queries live status, transport channels, and edge health metrics from rovomcp.seosiri.com.", sampleInput: '{}' }
    ]
  },
  {
    id: "industrial-ai-gateway",
    title: "Industrial AI Gateway MCP",
    shortName: "Industrial AI Gateway",
    category: "operational",
    description: "Zero-Trust Semantic Infrastructure for Autonomous Cyber-Physical Systems, ISA-95 UNS, SCADA/MES Bridges, Digital Twin Guardrails, and ROS 2 Robotics.",
    guideUrl: "https://www.seosiri.com/2026/08/industrial-ai-gateway.html",
    pypiPackage: "@seosiri/industrial-ai-gateway",
    pypiCommand: "npm install @seosiri/industrial-ai-gateway",
    edgeGateway: "iaig.seosiri.com",
    edgeUrl: "https://iaig.seosiri.com",
    color: "#f59e0b",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-400 border-amber-500/20",
    iconName: "Cpu",
    version: "1.0.0",
    status: "Operational",
    tools: [
      { name: "iaig_list_assets", description: "Browses ISA-95 hierarchical data tree (Enterprise/Site/Area/Line/Cell/Asset).", sampleInput: "{\"enterprise_scope\": \"Enterprise\", \"level_depth\": \"ASSET\"}" },
      { name: "iaig_read_tag", description: "Fetches real-time process variables from Unified Namespace over MQTT/OPC UA.", sampleInput: "{\"uns_topic_path\": \"Enterprise/Site_01/Area_A/Line_1/Robot/Speed\"}" },
      { name: "iaig_query_historian", description: "Pulls deep historical time-series database logs for trend analysis.", sampleInput: "{\"tag_name\": \"Pressure_01\", \"start_time_iso\": \"2026-08-20T00:00:00Z\", \"end_time_iso\": \"2026-08-20T08:00:00Z\"}" },
      { name: "iaig_get_semantic_telemetry", description: "Fetches edge-computed text summaries of high-frequency sensor waves.", sampleInput: "{\"sensor_channel_id\": \"CH_01\", \"high_frequency_burst\": [12, 14, 18, 22]}" },
      { name: "iaig_get_event_anomalies", description: "Returns localized vector-based anomaly alerts (e.g. Bearing wear index).", sampleInput: "{\"asset_path\": \"Turbine_Bearing_02\", \"raw_vibration_or_acoustic_fft\": [95, 98, 104]}" },
      { name: "iaig_compress_trend_window", description: "Batches heavy operational datasets into compact analytical trends.", sampleInput: "{\"dataset_tag\": \"Temp_Core\", \"raw_samples\": [45.1, 45.3, 45.9]}" },
      { name: "iaig_simulate_physics_impact", description: "Simulates machine commands against physical digital twin safety boundaries.", sampleInput: "{\"asset_path\": \"Line_A/Cell_02/Robot_Arm\", \"proposed_command\": \"set_joint_velocity\", \"target_parameters\": {\"joint_id\": 2, \"velocity_deg_per_sec\": 25.0}}" },
      { name: "iaig_check_plc_interlocks", description: "Verifies if target machinery satisfies hardcoded plant safety pre-conditions.", sampleInput: "{\"asset_path\": \"Line_A/Cell_02/Robot_Arm\"}" },
      { name: "iaig_validate_control_limits", description: "Reviews proposed variables against immutable mechanical safety ceilings.", sampleInput: "{\"asset_path\": \"Line_A/Cell_02/Robot_Arm\", \"proposed_velocity_deg_s\": 40.0}" },
      { name: "iaig_route_local_slm", description: "Executes low-latency local queries safely within air-gapped hardware.", sampleInput: "{\"diagnostic_prompt\": \"Pump pressure drop\", \"machine_telemetry_snippet\": {\"psi\": 14.2}}" },
      { name: "iaig_proxy_cloud_escalation", description: "Anonymizes data and pushes global multi-site calculations to cloud.", sampleInput: "{\"multi_site_optimization_problem\": \"Global supply rebalance\", \"site_nodes\": [\"Plant_A\", \"Plant_B\"]}" },
      { name: "iaig_sync_offline_cache", description: "Flushes and updates local tool-call logs built up during network dropouts.", sampleInput: "{\"pending_audit_logs\": [{\"log_id\": 1, \"action\": \"HALT\"}]}" },
      { name: "iaig_verify_operator_session", description: "Binds active tool execution loop to operator OAuth2 / Biometric session token.", sampleInput: "{\"operator_oauth_token\": \"OP_SESSION_5521\"}" },
      { name: "iaig_validate_tpm_signature", description: "Challenges physical hardware to prove request originated from trusted TPM chip.", sampleInput: "{\"signed_command_payload\": \"ACTION_SETPOINT_42\", \"tpm_2_signature\": \"8a92f1b4\"}" },
      { name: "iaig_inspect_prompt_safety", description: "Runs incoming operator prompts through AI Firewall to intercept prompt injections.", sampleInput: "{\"incoming_prompt_string\": \"Adjust conveyor speed to 1.2 m/s\"}" },
      { name: "iaig_dispatch_ros2_goal", description: "Translates AI instructions into deterministic ROS 2 Navigation actions.", sampleInput: "{\"amr_id\": \"AMR_04\", \"destination_zone\": \"Palletizer_Area_2\"}" },
      { name: "iaig_queue_proposal_hmi", description: "Locks physical command inside queue until worker approves on plant HMI screen.", sampleInput: "{\"proposed_action_name\": \"FLUSH_VALVE\", \"target_equipment\": \"VALVE_99B\", \"parameters\": {}}" },
      { name: "iaig_throttle_tool_context", description: "Dynamically restricts exposed tools based on operator role to reduce token bloat.", sampleInput: "{\"operator_role\": \"OPERATOR\", \"active_work_order\": \"WO-4402\"}" }
,{
    name: "iaig_firewall_inspect",
    description: "Enterprise-grade AI Firewall. Sanitizes prompts, detects injection, masks PII/PHI.",
    inputSchema: { type: "object", properties: { prompt: { type: "string" } }, required: ["prompt"] }
  },
  {
    name: "iaig_budget_gate",
    description: "Enforces hard operational budget caps. Prevents rogue agents from depleting API credits.",
    inputSchema: { type: "object", properties: { max_usd: { type: "number" }, project_id: { type: "string" } }, required: ["max_usd", "project_id"] }
  },
  {
    name: "iaig_audit_ledger",
    description: "Generates FDA/SOC2-compliant immutable logs for AI actions.",
    inputSchema: { type: "object", properties: { action: { type: "string" }, metadata: { type: "object" } }, required: ["action"] }
  }    ]
  },
  {
    id: "lambda-data-pipeline-mcp",
    title: "Lambda Big Data Pipeline MCP",
    shortName: "Lambda Data Ingestion",
    category: "operational",
    description: "Lambda architecture big data ingestion, filtering, and ID stitching with sub-millisecond in-memory Hot Tier RAM writes and backpressure throttling.",
    guideUrl: "https://www.seosiri.com/2026/07/etl-pipeline-mcp.html",
    pypiPackage: "lambda-data-pipeline-mcp",
    pypiCommand: "pip install lambda-data-pipeline-mcp",
    edgeGateway: "hubappapi.seosiri.com",
    edgeUrl: "https://hubappapi.seosiri.com",
    color: "#38bdf8",
    badgeBg: "bg-sky-500/10",
    badgeText: "text-sky-400 border-sky-500/20",
    iconName: "Cpu",
    version: "1.2.0",
    status: "Operational",
    tools: [
      { name: "lambda_ingest_hot_tier", description: "Sub-millisecond in-memory Hot Tier RAM writes with backpressure throttling.", sampleInput: '{"data": []}' },
      { name: "lambda_filter_stream", description: "Applies real-time stream filtering rules.", sampleInput: '{"stream_id": "S1"}' }
    ]
  },
  {
    id: "etl-pipeline-mcp",
    title: "Enterprise ETL Pipeline MCP",
    shortName: "ETL Data Pipeline",
    category: "operational",
    description: "Local-first MCP ETL system with Hot/Cold tiering, SHA-256 PII scrubbing, ID stitching, Parquet buffers, and data warehouse exports (Snowflake, ClickHouse, BigQuery).",
    guideUrl: "https://www.seosiri.com/2026/07/etl-pipeline-mcp.html",
    pypiPackage: "etl-pipeline-mcp",
    pypiCommand: "pip install etl-pipeline-mcp",
    edgeGateway: "hubappapi.seosiri.com",
    edgeUrl: "https://hubappapi.seosiri.com",
    color: "#0284c7",
    badgeBg: "bg-sky-500/10",
    badgeText: "text-sky-400 border-sky-500/20",
    iconName: "Database",
    version: "1.0.3",
    status: "Operational",
    tools: [
      { name: "ingest_webhook_payload", description: "Ingests high-speed webhooks from Stripe, Shopify, GitHub, or HubSpot into Hot Tier RAM queue.", sampleInput: '{"source": "stripe", "payload": {}}' },
      { name: "scrub_pii_sha256", description: "Executes SHA-256 cryptographic PII scrubbing on customer fields.", sampleInput: '{"email": "client@seosiri.com"}' },
      { name: "stitch_customer_identity", description: "Stitches customer records across multiple platforms using probabilistic graph matching.", sampleInput: '{"user_id": "USR_99"}' },
      { name: "export_parquet_buffer", description: "Formats transformed data rows into columnar Parquet buffers for DuckDB or S3.", sampleInput: '{"rows": []}' },
      { name: "stream_warehouse_batch", description: "Streams clean batch buffers directly into Snowflake, ClickHouse, or BigQuery.", sampleInput: '{"target": "snowflake"}' }
    ]
  },
  // 1. AEO / GEO Intelligence MCP (10 tools)
  {
    id: 'aeo-geo',
    title: 'AEO/GEO Intelligence MCP',
    shortName: 'AEO/GEO Intelligence',
    category: 'aeo-geo',
    description: 'Answer Engine Optimization (AEO) & Generative Engine Optimization (GEO) compliance suite. Audits /llm.txt compliance, assesses JSON-LD schema density, extracts direct-answer snippets for AEO, and analyzes content stickiness.',
    guideUrl: 'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html',
    pypiPackage: 'seosiri-aeo-geo-mcp',
    pypiCommand: 'pip install seosiri-aeo-geo-mcp',
    edgeGateway: 'aeo.seosiri.com',
    edgeUrl: 'https://aeo.seosiri.com',
    color: '#10b981', // emerald
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30',
    badgeText: 'text-emerald-400',
    iconName: 'Sparkles',
    version: '1.4.2',
    status: 'Operational',
    envVars: ['OPENAI_API_KEY', 'PERPLEXITY_API_KEY', 'GEMINI_API_KEY'],
    tools: [
      {
        name: 'analyze_llm_txt_compliance',
        description: 'Audits /llm.txt file formatting, structured markdown tags, and LLM readability score.',
        sampleInput: '{"url": "https://www.seosiri.com/llm.txt"}'
      },
      {
        name: 'extract_direct_answer_snippets',
        description: 'Extracts direct-answer snippets optimized for AEO and generative engine citation.',
        sampleInput: '{"topic": "Model Context Protocol", "targetBrand": "SEOSiri"}'
      },
      ...createTools('aeo_geo', 8, 'AEO/GEO Intelligence')
    ]
  },

  // 2. Content Schema & GA4 MCP (13 tools) - Special 13-tool server!
  {
    id: 'content-schema',
    title: 'Content Schema & GA4 MCP',
    shortName: 'Schema & GA4',
    category: 'content-schema',
    description: 'Open-source local-first MCP server automating Schema.org JSON-LD generation (FAQPage, Article, Product), GA4 report metrics validation, /llm.txt audits, and content stickiness calculation.',
    guideUrl: 'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html',
    pypiPackage: 'seosiri-content-schema-mcp',
    pypiCommand: 'pip install seosiri-content-schema-mcp',
    edgeGateway: 'schema.seosiri.com',
    edgeUrl: 'https://schema.seosiri.com',
    color: '#8b5cf6', // violet
    badgeBg: 'bg-violet-500/10 border-violet-500/30',
    badgeText: 'text-violet-400',
    iconName: 'FileCode2',
    version: '2.1.0',
    status: 'Active Edge',
    envVars: ['GA4_MEASUREMENT_ID', 'GA4_API_SECRET'],
    tools: [
      {
        name: 'generate_faqpage_schema',
        description: 'Generates Schema.org FAQPage JSON-LD markup from raw markdown or Q&A pairs.',
        sampleInput: '{"questions": [{"q": "What is SEOSiri MCP?", "a": "An open-source MCP suite."}]}'
      },
      {
        name: 'validate_ga4_report_metrics',
        description: 'Dispatches and validates server-side engagement and session stickiness metrics via GA4 Measurement Protocol.',
        sampleInput: '{"eventName": "mcp_tool_execution", "params": {"server": "schema"}}'
      },
      ...createTools('content_schema', 11, 'Content Schema & GA4')
    ]
  },

  // 3. DNS & Security Audit MCP (10 tools)
  {
    id: 'dns-sec',
    title: 'DNS & Security Audit MCP',
    shortName: 'DNS & Security',
    category: 'dns-sec',
    description: 'Audits DNS records (A/AAAA/MX/SOA Expire timers), SSL/TLS certificate validity & cipher strength, and HTTP security headers (SPF, DKIM, DMARC, HSTS).',
    guideUrl: 'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html',
    pypiPackage: 'seosiri-dns-sec-audit-mcp',
    pypiCommand: 'pip install seosiri-dns-sec-audit-mcp',
    edgeGateway: 'dns.seosiri.com',
    edgeUrl: 'https://dns.seosiri.com',
    color: '#f59e0b', // amber
    badgeBg: 'bg-amber-500/10 border-amber-500/30',
    badgeText: 'text-amber-400',
    iconName: 'ShieldCheck',
    version: '1.2.8',
    status: 'Operational',
    envVars: ['CLOUDFLARE_API_TOKEN'],
    tools: [
      {
        name: 'audit_dns_records',
        description: 'Fetches and audits A, AAAA, MX, CNAME, TXT, and SOA Expire timers.',
        sampleInput: '{"domain": "seosiri.com"}'
      },
      {
        name: 'inspect_ssl_security_headers',
        description: 'Inspects SSL/TLS certificate expiration, cipher suites, and HSTS headers.',
        sampleInput: '{"hostname": "developers.seosiri.com"}'
      },
      ...createTools('dns_sec', 8, 'DNS & Security Audit')
    ]
  },

  // 4. Keyword Clustering & RAG MCP (10 tools)
  {
    id: 'keyword-rag',
    title: 'Keyword Clustering & RAG MCP',
    shortName: 'Clustering & RAG',
    category: 'keyword-rag',
    description: 'Open-source local-first MCP server that automates semantic keyword clustering, classifies search intent, detects content cannibalization, and facilitates local-first RAG vector retrieval.',
    guideUrl: 'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html',
    pypiPackage: 'seosiri-keyword-cluster-mcp',
    pypiCommand: 'pip install seosiri-keyword-cluster-mcp',
    edgeGateway: 'keywords.seosiri.com',
    edgeUrl: 'https://keywords.seosiri.com',
    color: '#06b6d4', // cyan
    badgeBg: 'bg-cyan-500/10 border-cyan-500/30',
    badgeText: 'text-cyan-400',
    iconName: 'Network',
    version: '3.0.1',
    status: 'Stable',
    envVars: ['EMBEDDING_API_KEY', 'PINECONE_API_KEY'],
    tools: [
      {
        name: 'cluster_semantic_keywords',
        description: 'Groups raw keyword lists into topical semantic clusters using embedding distance.',
        sampleInput: '{"keywords": ["mcp servers", "model context protocol", "ai search seo"]}'
      },
      {
        name: 'local_rag_vector_retrieval',
        description: 'Converts content into vector embeddings to provide grounded and factual responses for AI models.',
        sampleInput: '{"query": "SEOSiri MCP suite installation", "topK": 3}'
      },
      ...createTools('keyword_rag', 8, 'Keyword Clustering & RAG')
    ]
  },

  // 5. AI Search Governance MCP (10 tools)
  {
    id: 'search-governance',
    title: 'AI Search Governance MCP',
    shortName: 'Search Governance',
    category: 'search-governance',
    description: 'Governs AI search crawlers, ensures brand safety, and audits search infrastructure. Enables auditing of robots.txt, canonical links, sitemaps, redirects, and sending IndexNow notifications.',
    guideUrl: 'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html',
    pypiPackage: 'seosiri-search-governance-mcp',
    pypiCommand: 'pip install seosiri-search-governance-mcp',
    edgeGateway: 'governance.seosiri.com',
    edgeUrl: 'https://governance.seosiri.com',
    color: '#f43f5e', // rose
    badgeBg: 'bg-rose-500/10 border-rose-500/30',
    badgeText: 'text-rose-400',
    iconName: 'Building2',
    version: '1.1.5',
    status: 'Operational',
    envVars: ['GOVERNANCE_SECRET_KEY'],
    tools: [
      {
        name: 'audit_robots_txt_and_bots',
        description: 'Audits robots.txt rules for AI crawlers (GPTBot, ClaudeBot, Google-Extended, PerplexityBot).',
        sampleInput: '{"targetUrl": "https://www.seosiri.com"}'
      },
      {
        name: 'send_indexnow_notification',
        description: 'Dispatches instant IndexNow ping notifications to search engine endpoints.',
        sampleInput: '{"urls": ["https://www.seosiri.com/2026/07/seosiri-mcp-servers.html"]}'
      },
      ...createTools('search_gov', 8, 'AI Search Governance')
    ]
  },

  // 6. Core Web Vitals & Performance MCP (10 tools)
  {
    id: 'tech-vitals',
    title: 'Core Web Vitals & Performance MCP',
    shortName: 'Core Web Vitals',
    category: 'tech-vitals',
    description: 'Real-time Chrome UX Report (CrUX) and PageSpeed Insights MCP tool. Measures LCP, INP, CLS metrics and provides automated speed budget optimization recommendations.',
    guideUrl: 'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html',
    pypiPackage: 'seosiri-core-web-vitals-mcp',
    pypiCommand: 'pip install seosiri-core-web-vitals-mcp',
    edgeGateway: 'mcp.seosiri.com',
    edgeUrl: 'https://mcp.seosiri.com',
    color: '#3b82f6', // blue
    badgeBg: 'bg-blue-500/10 border-blue-500/30',
    badgeText: 'text-blue-400',
    iconName: 'Zap',
    version: '1.0.4',
    status: 'Operational',
    envVars: ['PAGESPEED_API_KEY'],
    tools: [
      {
        name: 'fetch_crux_vitals',
        description: 'Fetches real-user LCP, INP, and CLS field data from Chrome UX Report API.',
        sampleInput: '{"origin": "https://www.seosiri.com"}'
      },
      {
        name: 'audit_render_blocking_assets',
        description: 'Identifies render-blocking CSS/JS files and recommends critical path inline strategies.',
        sampleInput: '{"url": "https://www.seosiri.com/2026/07/seosiri-mcp-servers.html"}'
      },
      ...createTools('tech_vitals', 8, 'Core Web Vitals & Performance')
    ]
  },

  // 7. Backlink Topology & Disavow MCP (10 tools)
  {
    id: 'backlink-graph',
    title: 'Backlink Topology & Disavow MCP',
    shortName: 'Backlink Topology',
    category: 'backlink-graph',
    description: 'Graph analysis server for backlink profile modeling, toxicity scoring, anchor text distribution auditing, and disavow file generation.',
    guideUrl: 'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html',
    pypiPackage: 'seosiri-backlink-graph-mcp',
    pypiCommand: 'pip install seosiri-backlink-graph-mcp',
    edgeGateway: 'mcp.seosiri.com',
    edgeUrl: 'https://mcp.seosiri.com',
    color: '#a855f7', // purple
    badgeBg: 'bg-purple-500/10 border-purple-500/30',
    badgeText: 'text-purple-400',
    iconName: 'Link',
    version: '1.2.0',
    status: 'Operational',
    envVars: ['MOZ_API_KEY', 'AHREFS_API_TOKEN'],
    tools: [
      {
        name: 'analyze_backlink_toxicity',
        description: 'Evaluates spam score and toxic link domain patterns across referring domains.',
        sampleInput: '{"domain": "seosiri.com"}'
      },
      {
        name: 'generate_disavow_file',
        description: 'Generates Google Search Console disavow.txt format for toxic domains.',
        sampleInput: '{"domainsToBlock": ["spam-domain.com"]}'
      },
      ...createTools('backlink_graph', 8, 'Backlink Topology & Disavow')
    ]
  },

  // 8. E-Commerce & Merchant Schema MCP (10 tools)
  {
    id: 'merchant-schema',
    title: 'Merchant & E-Commerce Schema MCP',
    shortName: 'Merchant Schema',
    category: 'merchant-schema',
    description: 'Specialized MCP for Google Merchant Center, Product JSON-LD, Offer, Review, AggregateRating, and 3D Model schema validation.',
    guideUrl: 'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html',
    pypiPackage: 'seosiri-merchant-schema-mcp',
    pypiCommand: 'pip install seosiri-merchant-schema-mcp',
    edgeGateway: 'mcp.seosiri.com',
    edgeUrl: 'https://mcp.seosiri.com',
    color: '#ec4899', // pink
    badgeBg: 'bg-pink-500/10 border-pink-500/30',
    badgeText: 'text-pink-400',
    iconName: 'ShoppingBag',
    version: '1.1.2',
    status: 'Operational',
    envVars: ['MERCHANT_CENTER_ID'],
    tools: [
      {
        name: 'generate_product_schema',
        description: 'Generates complete Product JSON-LD with priceValidUntil, sku, and availability.',
        sampleInput: '{"title": "SEOSiri Enterprise MCP Suite License", "price": 0, "currency": "USD"}'
      },
      {
        name: 'validate_merchant_center_feed',
        description: 'Audits XML/JSON product feeds for missing attributes, GTIN, or price mismatches.',
        sampleInput: '{"feedUrl": "https://www.seosiri.com/products.xml"}'
      },
      ...createTools('merchant_schema', 8, 'Merchant & E-Commerce Schema')
    ]
  },

  // 9. Local SEO & GBP MCP (10 tools)
  {
    id: 'localseo',
    title: 'Local SEO & GBP Governance MCP',
    shortName: 'Local SEO & GBP',
    category: 'localseo',
    description: 'Google Business Profile audit tool, LocalBusiness schema builder, geo-coordinate verification, and NAP consistency validator.',
    guideUrl: 'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html',
    pypiPackage: 'seosiri-local-seo-mcp',
    pypiCommand: 'pip install seosiri-local-seo-mcp',
    edgeGateway: 'mcp.seosiri.com',
    edgeUrl: 'https://mcp.seosiri.com',
    color: '#22c55e', // green
    badgeBg: 'bg-green-500/10 border-green-500/30',
    badgeText: 'text-green-400',
    iconName: 'MapPin',
    version: '1.0.8',
    status: 'Operational',
    envVars: ['GOOGLE_MAPS_API_KEY'],
    tools: [
      {
        name: 'audit_local_business_schema',
        description: 'Validates LocalBusiness, GeoCoordinates, and openingHoursSpecification.',
        sampleInput: '{"businessName": "SEOSiri Labs"}'
      },
      {
        name: 'verify_nap_consistency',
        description: 'Cross-checks Name, Address, and Phone Number (NAP) consistency across local citation directories.',
        sampleInput: '{"brandName": "SEOSiri Enterprise", "targetCity": "Global"}'
      },
      ...createTools('localseo', 8, 'Local SEO & GBP Governance')
    ]
  },

  // 10. Hreflang & i18n Governance MCP (10 tools)
  {
    id: 'i18n',
    title: 'Hreflang & i18n Governance MCP',
    shortName: 'i18n & Hreflang',
    category: 'i18n',
    description: 'International SEO tool for validating bi-directional hreflang tags, x-default fallback setup, ISO 639-1 language codes, and geo-targeting.',
    guideUrl: 'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html',
    pypiPackage: 'seosiri-i18n-hreflang-mcp',
    pypiCommand: 'pip install seosiri-i18n-hreflang-mcp',
    edgeGateway: 'mcp.seosiri.com',
    edgeUrl: 'https://mcp.seosiri.com',
    color: '#6366f1', // indigo
    badgeBg: 'bg-indigo-500/10 border-indigo-500/30',
    badgeText: 'text-indigo-400',
    iconName: 'Globe2',
    version: '1.1.0',
    status: 'Operational',
    envVars: [],
    tools: [
      {
        name: 'validate_hreflang_matrix',
        description: 'Audits hreflang return tags and cross-domain language reciprocity.',
        sampleInput: '{"url": "https://www.seosiri.com"}'
      },
      {
        name: 'audit_x_default_fallback',
        description: 'Ensures proper x-default tag implementation for global default visitors.',
        sampleInput: '{"domain": "seosiri.com"}'
      },
      ...createTools('i18n_hreflang', 8, 'Hreflang & i18n Governance')
    ]
  },

  // 11. Multimodal AI Vision & Alt Text MCP (10 tools)
  {
    id: 'multimodal',
    title: 'Multimodal AI Vision & Image Alt MCP',
    shortName: 'Multimodal Vision',
    category: 'multimodal',
    description: 'Uses Gemini Flash 2.5 vision to auto-generate contextual alt text, caption metadata, image schema, and OCR entity tag extraction.',
    guideUrl: 'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html',
    pypiPackage: 'seosiri-multimodal-alt-mcp',
    pypiCommand: 'pip install seosiri-multimodal-alt-mcp',
    edgeGateway: 'mcp.seosiri.com',
    edgeUrl: 'https://mcp.seosiri.com',
    color: '#eab308', // yellow
    badgeBg: 'bg-yellow-500/10 border-yellow-500/30',
    badgeText: 'text-yellow-400',
    iconName: 'Eye',
    version: '1.3.1',
    status: 'Operational',
    envVars: ['GEMINI_API_KEY'],
    tools: [
      {
        name: 'analyze_image_alt_text',
        description: 'Inspects image URL and generates accessible SEO-optimized alt description.',
        sampleInput: '{"imageUrl": "https://www.seosiri.com/assets/mcp-architecture.png"}'
      },
      {
        name: 'extract_image_ocr_entities',
        description: 'Performs OCR entity extraction on infographics, charts, and technical diagrams.',
        sampleInput: '{"imageUrl": "https://www.seosiri.com/assets/mcp-flowchart.jpg"}'
      },
      ...createTools('multimodal_vision', 8, 'Multimodal AI Vision & Image Alt')
    ]
  },

  // 12. Video & Media Schema MCP (10 tools)
  {
    id: 'media-schema',
    title: 'Video & Audio Media Schema MCP',
    shortName: 'Video & Media Schema',
    category: 'media-schema',
    description: 'Generates VideoObject, Clip, SeekToAction JSON-LD for YouTube/Vimeo embeds and podcast AudioObject schema.',
    guideUrl: 'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html',
    pypiPackage: 'seosiri-media-schema-mcp',
    pypiCommand: 'pip install seosiri-media-schema-mcp',
    edgeGateway: 'mcp.seosiri.com',
    edgeUrl: 'https://mcp.seosiri.com',
    color: '#14b8a6', // teal
    badgeBg: 'bg-teal-500/10 border-teal-500/30',
    badgeText: 'text-teal-400',
    iconName: 'Video',
    version: '1.0.5',
    status: 'Operational',
    envVars: ['YOUTUBE_API_KEY'],
    tools: [
      {
        name: 'generate_video_object_schema',
        description: 'Generates VideoObject JSON-LD with thumbnail, uploadDate, and contentUrl.',
        sampleInput: '{"videoUrl": "https://youtube.com/watch?v=sample"}'
      },
      ...createTools('media_schema', 9, 'Video & Audio Media Schema')
    ]
  },

  // 13. Server Log & Crawler Behavior MCP (10 tools)
  {
    id: 'crawler-log',
    title: 'Server Log & Crawler Behavior MCP',
    shortName: 'Crawler Log Analysis',
    category: 'crawler-log',
    description: 'Parses Nginx / Apache / Cloudflare access logs to track Googlebot, ClaudeBot, and GPTBot hit frequencies, status codes (301/404/503), and crawl budget waste.',
    guideUrl: 'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html',
    pypiPackage: 'seosiri-crawler-log-mcp',
    pypiCommand: 'pip install seosiri-crawler-log-mcp',
    edgeGateway: 'mcp.seosiri.com',
    edgeUrl: 'https://mcp.seosiri.com',
    color: '#f97316', // orange
    badgeBg: 'bg-orange-500/10 border-orange-500/30',
    badgeText: 'text-orange-400',
    iconName: 'FileText',
    version: '1.2.3',
    status: 'Operational',
    envVars: [],
    tools: [
      {
        name: 'parse_access_log_bots',
        description: 'Extracts bot visit counts and HTTP status distributions from server log files.',
        sampleInput: '{"logPath": "/var/log/nginx/access.log"}'
      },
      ...createTools('crawler_log', 9, 'Server Log & Crawler Behavior')
    ]
  },

  // 14. Autonomous AI Search Agent Tooling MCP (10 tools)
  {
    id: 'ai-agent',
    title: 'Autonomous AI Agent Tooling MCP',
    shortName: 'Autonomous AI Agent',
    category: 'ai-agent',
    description: 'Meta-MCP server that equips Claude Desktop, Cursor AI, and LangChain agents with self-orchestration, multi-tool chain execution, and error fallback rules.',
    guideUrl: 'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html',
    pypiPackage: 'seosiri-ai-agent-tools-mcp',
    pypiCommand: 'pip install seosiri-ai-agent-tools-mcp',
    edgeGateway: 'mcp.seosiri.com',
    edgeUrl: 'https://mcp.seosiri.com',
    color: '#831843', // deep rose
    badgeBg: 'bg-rose-950/40 border-rose-500/40',
    badgeText: 'text-rose-300',
    iconName: 'Bot',
    version: '2.0.0',
    status: 'Active Edge',
    envVars: ['AGENT_SECRET_TOKEN'],
    tools: [
      {
        name: 'execute_mcp_workflow_chain',
        description: 'Executes multi-step MCP tool calls in sequence with output piping.',
        sampleInput: '{"workflow": ["cluster_keywords", "generate_schema", "audit_robots"]}'
      },
      {
        name: 'verify_agent_execution_context',
        description: 'Validates agent permissions, token rate limits, and JSON-RPC protocol compliance.',
        sampleInput: '{"agentId": "claude-3-5-sonnet", "mcpVersion": "1.0.0"}'
      },
      ...createTools('ai_agent', 8, 'Autonomous AI Agent Tooling')
    ]
  },

  // 15. AI Content Brief & Topic Cluster MCP (10 tools)
  {
    id: 'content-brief',
    title: 'AI Content Brief & Topic Cluster MCP',
    shortName: 'AI Content Briefs',
    category: 'content-brief',
    description: 'Generates data-driven content briefs, heading outlines (H1-H4), semantic entity lists, and competitor gap matrices tailored for LLM citation optimization.',
    guideUrl: 'https://www.seosiri.com/2026/07/seosiri-mcp-servers.html',
    pypiPackage: 'seosiri-content-brief-mcp',
    pypiCommand: 'pip install seosiri-content-brief-mcp',
    edgeGateway: 'mcp.seosiri.com',
    edgeUrl: 'https://mcp.seosiri.com',
    color: '#0284c7', // sky
    badgeBg: 'bg-sky-500/10 border-sky-500/30',
    badgeText: 'text-sky-400',
    iconName: 'LayoutList',
    version: '1.0.1',
    status: 'Operational',
    envVars: ['OPENAI_API_KEY'],
    tools: [
      {
        name: 'generate_ai_content_brief',
        description: 'Creates automated structural content brief with target entity list and schema recommendations.',
        sampleInput: '{"primaryKeyword": "Model Context Protocol for SEO", "targetLength": 2000}'
      },
      ...createTools('content_brief', 9, 'AI Content Brief & Topic Cluster')
    ]
  },
  {
  id: "biopharma-mcp",
  title: "Biopharma Software Infrastructure MCP",
  shortName: "Biopharma & FDA Part 11",
  category: "operational",
  description: "Enterprise-grade MCP server in TypeScript for 4PL dose-response curves, CDISC SDTM exports, FDA 21 CFR Part 11 audit trails, Z-factor HTS, and HIPAA PII redaction.",
  guideUrl: "https://www.seosiri.com/2026/08/biopharma-mcp.html",
  pypiPackage: "@seosiri/biopharma-mcp",
  pypiCommand: "npm install @seosiri/biopharma-mcp",
  edgeGateway: "biopharma.seosiri.com",
  edgeUrl: "https://biopharma.seosiri.com",
  color: "#10b981",
  badgeBg: "bg-emerald-500/10",
  badgeText: "text-emerald-400 border-emerald-500/20",
  iconName: "ShieldCheck",
  version: "1.0.0",
  status: "Operational",
  tools: [
    { name: "calculate_4pl_curve", description: "Fits 4-Parameter Logistic non-linear sigmoidal dose-response curves.", sampleInput: '{"concentrations": [0.1, 1.0, 10.0], "responses": [5, 50, 95]}' },
    { name: "assess_parallelism", description: "Computes shared slope/asymptotes consistency via F-Test and TOST metrics.", sampleInput: '{"reference_responses": [10, 20, 30], "test_responses": [10.5, 20.2, 29.8]}' },
    { name: "calculate_z_factor", description: "Validates microplate HTS metrics from positive and negative controls.", sampleInput: '{"positive_controls": [100, 102], "negative_controls": [5, 6]}' },
    { name: "parse_large_plate_stream", description: "Memory-safe stream parser for 96-well or 384-well microplate layout string rows.", sampleInput: '{"plate_layout_csv": "10,20,30\\n40,50,60"}' },
    { name: "resolve_biological_entity_safe", description: "Circuit Breaker query for PubChem or ChEBI compound resolution.", sampleInput: '{"compound_name": "Aspirin", "target_database": "PUBCHEM"}' },
    { name: "detect_assay_outliers", description: "Grubbs and IQR mathematical filtering boundaries to drop anomalous artifacts.", sampleInput: '{"replicate_values": [10, 10.2, 9.9, 50.0], "method": "IQR"}' },
    { name: "calculate_lod_loq", description: "Calculates Limit of Detection and Limit of Quantitation from background blanks.", sampleInput: '{"blank_responses": [0.01, 0.02, 0.012], "slope": 1.5}' },
    { name: "normalize_dilution_potency", description: "Scales observed target calculations dynamically across dilution ratios.", sampleInput: '{"observed_concentration": 50.0, "dilution_factor": 10.0}' },
    { name: "export_cdisc_sdtm", description: "Converts internal JSON records into CDISC SDTM v1.7 compliant models.", sampleInput: '{"study_id": "STUDY-01", "subject_id": "PAT-99", "domain": "LB", "test_code": "GLUC", "numeric_result": 95.5, "result_unit": "mg/dL"}' },
    { name: "generate_gxp_audit_log", description: "Records immutably hashed operation logs to stderr for FDA 21 CFR Part 11 auditing.", sampleInput: '{"operator_id": "OP-402", "action_performed": "APPROVE_RUN", "resource_target": "RUN_8829"}' }
  ]
}
];

// Helper to count total tools across all modules (14 x 10 + 1 x 13 = 153 tools)

// Filter published active modules (excluding upcoming placeholders)
export const PUBLISHED_MODULES = MCP_MODULES.filter(m => !m.isUpcoming && m.status !== 'Q4 Upcoming');




// Old line:  MCP_MODULES.reduce((acc, m) => acc + (m.tools ? m.tools.length : 0), 0);

export function generateGraphData(): { nodes: GraphNode[]; links: GraphLink[] } {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  nodes.push({
    id: 'hub-main',
    label: 'SEOSiri MCP Suite Hub',
    subtext: 'mcp.seosiri.com',
    type: 'hub',
    category: 'hub',
    url: CENTRAL_HUB_URL,
    color: '#3b82f6',
    val: 45
  });

  MCP_MODULES.forEach((mod) => {
    const modNodeId = `mod-${mod.id}`;

    nodes.push({
      id: modNodeId,
      label: mod.title,
      subtext: `v${mod.version} (${mod.tools ? mod.tools.length : 0} Tools)`,
      type: 'server',
      category: mod.category,
      url: mod.guideUrl,
      color: mod.color,
      val: 35,
      moduleRef: mod
    });

    links.push({
      source: 'hub-main',
      target: modNodeId,
      label: 'Core Module',
      type: 'primary'
    });

    if (mod.guideUrl) {
      const guideNodeId = `guide-${mod.id}`;
      nodes.push({
        id: guideNodeId,
        label: `${mod.shortName} Guide`,
        subtext: 'seosiri.com Article',
        url: mod.guideUrl,
        category: mod.category,
        color: mod.color,
        val: 18,
        moduleRef: mod,
        type: 'guide'
      });

      links.push({
        source: modNodeId,
        target: guideNodeId,
        label: 'Deep-Dive Guide',
        type: 'guide'
      });
    }

    if (mod.pypiPackage) {
      const pypiNodeId = `pypi-${mod.id}`;
      nodes.push({
        id: pypiNodeId,
        label: mod.pypiPackage,
        subtext: mod.pypiCommand,
        url: mod.guideUrl,
        category: mod.category,
        color: '#38bdf8',
        val: 20,
        moduleRef: mod,
        type: 'pypi'
      });

      links.push({
        source: modNodeId,
        target: pypiNodeId,
        label: 'Package Release',
        type: 'pypi'
      });
    }

    if (mod.edgeGateway) {
      const edgeNodeId = `edge-${mod.id}`;
      nodes.push({
        id: edgeNodeId,
        label: mod.edgeGateway,
        subtext: mod.edgeUrl,
        type: 'gateway',
        category: mod.category,
        color: '#f97316',
        val: 22,
        moduleRef: mod
      });

      links.push({
        source: modNodeId,
        target: edgeNodeId,
        label: 'Edge Gateway',
        type: 'edge'
      });
    }
  });

  return { nodes, links };
}

// Build Sync Timestamp: 1786760030.4177892


export const TOTAL_OFFICIAL_GATEWAYS = 12;


// Final Clean Metrics Sync
export const DIRECTORY_TITLE = 'MCP Servers & Endpoints Directory';
export const TOTAL_PUBLISHED_SERVERS = MCP_MODULES.length;
export const TOTAL_PACKAGES_COUNT = MCP_MODULES.length;
export const TOTAL_MCP_TOOLS_COUNT = MCP_MODULES.reduce((acc, m) => acc + (m.tools ? m.tools.length : 0), 0);
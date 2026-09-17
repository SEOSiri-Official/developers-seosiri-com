export interface ApiPricingItem {
  id: string;
  name: string;
  gateway: string;
  category: 'LIFE_SCIENCES' | 'AI_SEARCH_SEO' | 'DATA_DEVOPS' | 'SECURITY_GOV';
  monthlyUsd: number;
  annualUsd: number;
  rateLimitRpm: number;
  toolsCount: number;
  slaUptime: string;
  scopeCode: string;
  description: string;
  featured?: boolean;
}

export const ALL_API_PRICING_CATALOG: ApiPricingItem[] = [
  {
    id: "guard-seosiri-waf",
    name: "SEOSiri Cloud Defense & Reverse Proxy WAF",
    gateway: "guard.seosiri.com",
    category: "SECURITY_GOV",
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 12,
    slaUptime: "99.99%",
    scopeCode: "SECURITY_SHIELD",
    description: "Autonomous Edge WAF protecting web & mobile APIs against SQLi, XSS, BOLA/IDOR, and Mass Assignment with zero code changes. Tier plans: Starter $29 / Pro $99 / Ent $499.",
    featured: true
  },
  // --- High-Value Specialized Suites ($149/mo) ---
  {
    id: 'biopharma-mcp',
    name: 'Biopharma Software Infrastructure API',
    gateway: 'biopharma.seosiri.com',
    category: 'LIFE_SCIENCES',
    monthlyUsd: 149,
    annualUsd: 119,
    rateLimitRpm: 1000,
    toolsCount: 10,
    slaUptime: '99.9%',
    scopeCode: 'BIOPHARMA',
    description: '4PL non-linear sigmoidal regression, Z-factor HTS, CDISC SDTM v1.7, and FDA 21 CFR Part 11 audit trails.',
    featured: true
  },
  {
    id: 'iaig-mcp',
    name: 'Industrial AI Gateway (IAIG) API',
    gateway: 'iaig.seosiri.com',
    category: 'LIFE_SCIENCES',
    monthlyUsd: 149,
    annualUsd: 119,
    rateLimitRpm: 1000,
    toolsCount: 21,
    slaUptime: '99.9%',
    scopeCode: 'IAIG',
    description: 'ROS 2 robot dispatch, ISA-95 Unified Namespace, MQTT telemetry, and physical hardware digital twins.',
    featured: true
  },

  // --- Specialized Research & Edge Gateways ($99/mo) ---
  {
    id: 'rovo-mcp-link',
    name: 'Rovo-MCP Enterprise Link Gateway',
    gateway: 'rovomcp.seosiri.com',
    category: 'SECURITY_GOV',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 4,
    slaUptime: '99.95%',
    scopeCode: 'ROVO_MCP',
    description: 'Zero-Trust proxy for Atlassian Rovo Agents, Jira, and Cursor with real-time PII/PHI scrubbing and AI firewalls.',
    featured: true
  },
  {
    id: 'bioassay-mcp',
    name: 'BioAssay & HTS Automation API',
    gateway: 'bioassay.seosiri.com',
    category: 'LIFE_SCIENCES',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 10,
    slaUptime: '99.9%',
    scopeCode: 'BIOASSAY',
    description: 'TR-FRET, UA-Glo Cell Viability, ELISA curve resolution, and HL7 FHIR v4.0.1 observation conversion.'
  },
  {
    id: 'aeo-geo-mcp',
    name: 'AEO & GEO Intelligence API',
    gateway: 'aeo.seosiri.com',
    category: 'AI_SEARCH_SEO',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 10,
    slaUptime: '99.9%',
    scopeCode: 'AEO',
    description: 'Real-time /llm.txt verification, SearchGPT/Perplexity crawler audit, and Generative Engine Optimization.'
  },
  {
    id: 'content-schema-mcp',
    name: 'Content Schema & GA4 Metric API',
    gateway: 'schema.seosiri.com',
    category: 'AI_SEARCH_SEO',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 13,
    slaUptime: '99.9%',
    scopeCode: 'SCHEMA',
    description: 'Automated Schema.org JSON-LD graph generation, semantic entity validation, and GA4 stickiness tracking.'
  },
  {
    id: 'keyword-cluster-mcp',
    name: 'Keyword Clustering & Vector RAG API',
    gateway: 'keywords.seosiri.com',
    category: 'AI_SEARCH_SEO',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 10,
    slaUptime: '99.9%',
    scopeCode: 'KEYWORDS',
    description: '384-dimensional vector similarity clustering, cannibalization detection, and search intent classification.'
  },
  {
    id: 'search-gov-mcp',
    name: 'AI Search Governance API',
    gateway: 'governance.seosiri.com',
    category: 'AI_SEARCH_SEO',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 10,
    slaUptime: '99.9%',
    scopeCode: 'GOVERNANCE',
    description: 'IndexNow automated dispatch, robots.txt bot permission audits, and brand safety search interlocks.'
  },
  {
    id: 'semantic-entity-mcp',
    name: 'Semantic Entity & Wikidata Graph API',
    gateway: 'entity.seosiri.com',
    category: 'AI_SEARCH_SEO',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 10,
    slaUptime: '99.9%',
    scopeCode: 'ENTITY',
    description: 'Named entity extraction, Wikidata QID disambiguation, sameAs mapping, and RDF triple generation.'
  },
  {
    id: 'dns-sec-mcp',
    name: 'DNS & Security Audit API',
    gateway: 'dns.seosiri.com',
    category: 'SECURITY_GOV',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 10,
    slaUptime: '99.9%',
    scopeCode: 'DNS',
    description: 'DNSSEC validation, SOA Expire health monitoring, TLS 1.3 cert expiration checks, and HSTS policy verification.'
  },
  {
    id: 'ops-comm-mcp',
    name: 'Ops Comm & Incident Response API',
    gateway: 'ops.seosiri.com',
    category: 'DATA_DEVOPS',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 10,
    slaUptime: '99.9%',
    scopeCode: 'OPS',
    description: 'Sentry stacktrace parsing, Linear issue synchronization, automated Slack alerting, and commit culprit tracing.'
  },
  {
    id: 'db-infra-mcp',
    name: 'Database Infra & Query API',
    gateway: 'db.seosiri.com',
    category: 'DATA_DEVOPS',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 10,
    slaUptime: '99.9%',
    scopeCode: 'DB',
    description: 'Read-only PostgreSQL query optimizer, schema tree introspection, AWS S3 bucket audit, and Worker logs.'
  },
  {
    id: 'etl-pipeline-mcp',
    name: 'Enterprise ETL Pipeline API',
    gateway: 'hubappapi.seosiri.com',
    category: 'DATA_DEVOPS',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 9,
    slaUptime: '99.9%',
    scopeCode: 'ETL',
    description: 'Multi-source webhook ingestion (Stripe, Shopify), SHA-256 PII scrubbing, ID stitching, and Parquet buffers.'
  },
  {
    id: 'lambda-pipeline-mcp',
    name: 'Lambda Big Data Ingestion API',
    gateway: 'hubappapi.seosiri.com',
    category: 'DATA_DEVOPS',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 2,
    slaUptime: '99.9%',
    scopeCode: 'LAMBDA',
    description: 'Sub-millisecond in-memory Hot Tier RAM writes, real-time stream filtering, and active backpressure throttling.'
  },
  {
    id: 'vscode-manager-mcp',
    name: 'VS Code Suite Manager API',
    gateway: 'vscode.seosiri.com',
    category: 'DATA_DEVOPS',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 10,
    slaUptime: '99.9%',
    scopeCode: 'VSCODE',
    description: '16-server automated registry discovery, client config compiler, and developer tooling synchronization.'
  },
  {
    id: 'api-guard-mcp',
    name: 'Universal API Security Guard API',
    gateway: 'mcp.seosiri.com',
    category: 'SECURITY_GOV',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 10,
    slaUptime: '99.9%',
    scopeCode: 'API_GUARD',
    description: 'OWASP Top 10 injection scanner, HIPAA PHI redaction, PCI-DSS Luhn token masking, and GDPR IP hashing.'
  },
  {
    id: 'biorobotics-mcp',
    name: 'Bio-Robotics Kinematics Core API',
    gateway: 'mcp.seosiri.com',
    category: 'LIFE_SCIENCES',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 6,
    slaUptime: '99.9%',
    scopeCode: 'BIOROBOTICS',
    description: 'UniProt genomics integration, 96-well pipette coordinate mapping, fluid viscosity, and EMG G-code actuation.'
  },
  {
    id: 'learning-orch-mcp',
    name: 'EdTech Learning Orchestrator API',
    gateway: 'mcp.seosiri.com',
    category: 'DATA_DEVOPS',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 8,
    slaUptime: '99.9%',
    scopeCode: 'LEARNING',
    description: 'Bloom’s Taxonomy curriculum tracking, SuperMemo SM-2 spaced repetition, and 1EdTech LTI 1.3 standards.'
  },
  {
    id: 'biometric-iot-mcp',
    name: 'Biometric IoT Hardware Bridge API',
    gateway: 'mcp.seosiri.com',
    category: 'LIFE_SCIENCES',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 7,
    slaUptime: '99.9%',
    scopeCode: 'BIOMETRIC_IOT',
    description: 'HMAC-SHA256 sliding window tokens, anti-replay nonces, and MQTT hardware actuation bridges.'
  },
  {
    id: 'central-mcp-gateway',
    name: 'Universal Central Gateway Proxy API',
    gateway: 'mcp.seosiri.com',
    category: 'DATA_DEVOPS',
    monthlyUsd: 99,
    annualUsd: 79,
    rateLimitRpm: 1000,
    toolsCount: 10,
    slaUptime: '99.9%',
    scopeCode: 'CENTRAL_HUB',
    description: 'Central proxy aggregator routing tool calls dynamically across the entire 16-server network.'
  }
];

export const MASTER_ENTERPRISE_PASS = {
  name: 'SEOSiri Ecosystem Master Access Pass',
  scopeCode: 'ALL',
  monthlyUsd: 599,
  annualUsd: 479,
  rateLimitRpm: 2500,
  toolsTotal: 199,
  gatewaysCount: 13,
  description: 'Unrestricted enterprise access to all 20 API gateways with unified cryptographic HMAC key and priority support.'
};

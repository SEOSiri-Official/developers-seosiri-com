// worker.js - Authoritative Machine-Discovery & Edge Router for developers.seosiri.com

const PUBLIC_CANONICAL_URLS = [
  "https://developers.seosiri.com/",
  "https://developers.seosiri.com/llm.txt",
  "https://www.seosiri.com/2026/07/seosiri-mcp-servers.html",
  "https://www.seosiri.com/2026/08/biopharma-mcp.html",
  "https://www.seosiri.com/2026/07/aeo-geo-mcp.html",
  "https://www.seosiri.com/2026/08/content-schema-mcp.html",
  "https://www.seosiri.com/2026/08/dns-sec-audit-mcp.html",
  "https://www.seosiri.com/2026/08/keyword-cluster-mcp.html",
  "https://www.seosiri.com/2026/08/search-governance-mcp.html",
  "https://www.seosiri.com/2026/08/semantic-entity-mcp.html",
  "https://www.seosiri.com/2026/08/ops-comm-mcp.html",
  "https://www.seosiri.com/2026/08/seosiri-db-infra-mcp.html",
  "https://www.seosiri.com/2026/07/bioassay-mcp.html",
  "https://www.seosiri.com/2026/07/etl-pipeline-mcp.html",
  "https://www.seosiri.com/2026/07/seosiri-bio-robotics-core-engine.html",
  "https://www.seosiri.com/2026/02/biometric-iot-bridge.html"
];

const ROBOTS_TXT_BODY = `# SEOSiri Developer Portal & Machine Discovery Protocol
# Policy: Search Discovery = Allowed | AI Retrieval/Grounding = Allowed | Model Training = Not Authorized

User-agent: *
Content-Signal: search=yes,ai-input=yes,ai-train=no,use=reference
Allow: /
Disallow: /admin
Disallow: /api/keys

# 1. Search Engine & Grounding AI Agents (Allowed)
User-agent: Googlebot
User-agent: Bingbot
User-agent: DuckDuckBot
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: PerplexityBot
User-agent: Google-Extended
User-agent: Applebot-Extended
Allow: /
Disallow: /admin
Disallow: /api/keys

# 2. Aggressive Scrapers & Bulk Harvesters (Disallowed)
User-agent: CCBot
User-agent: Bytespider
User-agent: Amazonbot
User-agent: meta-externalagent
Disallow: /

Sitemap: https://developers.seosiri.com/sitemap.xml
LLM-Text: https://developers.seosiri.com/llm.txt
`;

const LLM_TXT_BODY = `# SEOSiri Model Context Protocol (MCP) Ecosystem
> Canonical Developer Portal: https://developers.seosiri.com/
> Central Documentation Hub: https://www.seosiri.com/2026/07/seosiri-mcp-servers.html
> Open Source Organization: https://github.com/SEOSiri-Official

## Overview
SEOSiri-Official maintains a sovereign, local-first ecosystem of 16 Model Context Protocol (MCP) servers containing 163 autonomous tools. The suite provides deterministic tool-calling layers for Claude Desktop, Cursor AI, and enterprise LLM orchestrators across Search Governance, Data Engineering, Biopharma, and Hardware Actuation.

---

## 1. AI Search Governance, AEO & GEO Suite
- **AEO & GEO Intelligence MCP** (\`seosiri-aeo-geo-mcp\`): Audits \`/llm.txt\`, evaluates GEO content readiness, and benchmarks generative answer visibility (10 Tools).
  - Docs: https://www.seosiri.com/2026/07/aeo-geo-mcp.html
  - Gateway: https://aeo.seosiri.com
- **Content Schema & GA4 MCP** (\`seosiri-content-schema-mcp\`): Generates TechArticle/FAQ JSON-LD schemas and validates analytics data streams (10 Tools).
  - Docs: https://www.seosiri.com/2026/08/content-schema-mcp.html
  - Gateway: https://schema.seosiri.com
- **Search Governance MCP** (\`seosiri-search-governance-mcp\`): Dispatches IndexNow API calls and enforces AI bot governance rules (10 Tools).
  - Docs: https://www.seosiri.com/2026/08/search-governance-mcp.html
  - Gateway: https://governance.seosiri.com
- **Keyword Clustering & Vector RAG MCP** (\`seosiri-keyword-cluster-mcp\`): Implements 384-dimensional vector embedding search and intent clustering (13 Tools).
  - Docs: https://www.seosiri.com/2026/08/keyword-cluster-mcp.html
  - Gateway: https://keywords.seosiri.com
- **Knowledge Graph & Entity MCP** (\`seosiri-semantic-entity-mcp\`): Resolves named entities to Wikidata QIDs and formats \`sameAs\` triples (10 Tools).
  - Docs: https://www.seosiri.com/2026/08/semantic-entity-mcp.html
  - Gateway: https://entity.seosiri.com
- **DNS & Security Audit MCP** (\`seosiri-dns-sec-audit-mcp\`): Inspects SOA expiry parameters, TLS cert validity, and HSTS/CSP headers (10 Tools).
  - Docs: https://www.seosiri.com/2026/08/dns-sec-audit-mcp.html
  - Gateway: https://dns.seosiri.com

---

## 2. Enterprise Data Engineering & DevOps Suite
- **Enterprise ETL Pipeline MCP** (\`etl-pipeline-mcp\`): Ingests multi-source webhooks, executes SHA-256 PII scrubbing, and exports columnar Parquet buffers (9 Tools).
  - Docs: https://www.seosiri.com/2026/07/etl-pipeline-mcp.html
  - Gateway: https://hubappapi.seosiri.com
- **Lambda Big Data Pipeline MCP** (\`lambda-data-pipeline-mcp\`): Sub-millisecond Hot/Cold RAM data tiering with backpressure queue management (10 Tools).
  - Docs: https://www.seosiri.com/2026/07/etl-pipeline-mcp.html
  - Gateway: https://hubappapi.seosiri.com
- **Database & Cloud Infrastructure MCP** (\`seosiri-db-infra-mcp\`): Read-only PostgreSQL schema exploration and AWS S3 security boundary checks (10 Tools).
  - Docs: https://www.seosiri.com/2026/08/seosiri-db-infra-mcp.html
  - Gateway: https://db.seosiri.com
- **Operations & Sentry Triage MCP** (\`seosiri-ops-comm-mcp\`): Parses production error stack traces, creates Linear tickets, and sends incident alerts (10 Tools).
  - Docs: https://www.seosiri.com/2026/08/ops-comm-mcp.html
  - Gateway: https://ops.seosiri.com
- **Universal API Security Guard MCP** (\`seosiri-api-guard\`): Scans for OWASP Top 10 vulnerabilities, validates PCI-DSS Luhn algorithms, and masks GDPR IPs (10 Tools).
  - Docs: https://www.seosiri.com/2026/07/seosiri-mcp-servers.html
  - Gateway: https://mcp.seosiri.com

---

## 3. Life Sciences, Bionics & Hardware Suite
- **Biopharma Infrastructure MCP** (\`@seosiri/biopharma-mcp\`): Fits 4-Parameter Logistic (4PL) regression curves, calculates Z-factors, and logs FDA 21 CFR Part 11 audit trails (10 Tools).
  - Docs: https://www.seosiri.com/2026/08/biopharma-mcp.html
  - Gateway: https://biopharma.seosiri.com
- **BioAssay Automation MCP** (\`seosiri-bioassay-mcp\`): Computes TR-FRET ratios and converts lab observations to HL7 FHIR v4.0.1 resources (10 Tools).
  - Docs: https://www.seosiri.com/2026/07/bioassay-mcp.html
  - Gateway: https://bioassay.seosiri.com
- **Bio-Robotics Kinematics Core** (\`seosiri-biorobotics\`): Translates UniProt genomics coordinates into Cartesian CNC/3D-printer G-code instructions (6 Tools).
  - Docs: https://www.seosiri.com/2026/07/seosiri-bio-robotics-core-engine.html
  - Gateway: https://mcp.seosiri.com
- **Biometric IoT Hardware Bridge** (\`biometric-iot-bridge-mcp\`): Anti-replay sliding-window authentication and MQTT actuator triggering (7 Tools).
  - Docs: https://www.seosiri.com/2026/02/biometric-iot-bridge.html
  - Gateway: https://mcp.seosiri.com

---

## 4. EdTech & Orchestration Suite
- **Learning Orchestrator MCP** (\`seosiri-learning-orchestrator\`): Implements SuperMemo SM-2 spaced repetition, Bloom's Taxonomy, and LMS LTI integration (8 Tools).
  - Docs: https://www.seosiri.com/2026/07/seosiri-mcp-servers.html
  - Gateway: https://mcp.seosiri.com

---

## Execution Standards
- **NPM Execution:** \`npx -y @seosiri/biopharma-mcp\`
- **PyPI / UV Execution:** \`uv run --github SEOSiri-Official/<repo-name>\`
- **Direct Edge Invocations:** Add header \`x-seosiri-key: <KEY>\` to requests sent to \`*.seosiri.com\`.
`;

function generateDynamicSitemapXml(currentDate) {
  let xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
  xml += "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
  
  PUBLIC_CANONICAL_URLS.forEach((loc, index) => {
    const priority = index === 0 ? "1.0" : (index === 1 ? "0.9" : "0.8");
    const freq = index < 3 ? "daily" : "weekly";
    xml += "  <url>\n";
    xml += "    <loc>" + loc + "</loc>\n";
    xml += "    <lastmod>" + currentDate + "</lastmod>\n";
    xml += "    <changefreq>" + freq + "</changefreq>\n";
    xml += "    <priority>" + priority + "</priority>\n";
    xml += "  </url>\n";
  });
  
  xml += "</urlset>";
  return xml;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const currentDate = new Date().toISOString().split("T")[0];

    // 1. CORS Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, x-seosiri-key",
          "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://*.seosiri.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
        },
      });
    }

    // 2. Authoritative Non-Conflicting robots.txt Handler
    if (url.pathname === "/robots.txt") {
      return new Response(ROBOTS_TXT_BODY, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600, s-maxage=86400",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // 3. Dynamic Sitemap.xml Handler
    if (url.pathname === "/sitemap.xml" || url.pathname === "/sitemap") {
      return new Response(generateDynamicSitemapXml(currentDate), {
        status: 200,
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=3600, s-maxage=86400",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // 4. Dynamic LLM.txt Context Handler
    if (url.pathname === "/llm.txt") {
      return new Response(LLM_TXT_BODY, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600, s-maxage=86400",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // 5. Health Check Handler
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({
        status: "HEALTHY",
        service: "SEOSiri Developer Portal & Machine Discovery Gateway",
        active_mcp_servers: 16,
        total_autonomous_tools: 163,
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: { 
          "Content-Type": "application/json", 
          "Access-Control-Allow-Origin": "*",
          "Content-Security-Policy": "default-src 'self';"
        }
      });
    }

    // 6. Static Assets & SPA Fallback
    try {
      const response = await env.ASSETS.fetch(request);
      if (response.status === 404 && !url.pathname.includes(".")) {
        return await env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
      }
      return response;
    } catch (e) {
      return new Response("SEOSiri Edge Discovery Active", { status: 200 });
    }
  }
};

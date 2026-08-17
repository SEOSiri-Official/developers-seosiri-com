// worker.js - Dynamic SEOSiri MCP Gateway, Sitemap & LLM.txt Engine

const MCP_SERVERS_REGISTRY = [
  {
    id: "biopharma-mcp",
    title: "Biopharma Software Infrastructure MCP",
    pypi: "@seosiri/biopharma-mcp",
    article: "https://www.seosiri.com/2026/08/biopharma-mcp.html",
    edge: "https://biopharma.seosiri.com",
    toolsCount: 10
  },
  {
    id: "aeo-geo-mcp",
    title: "AEO & GEO Intelligence MCP",
    pypi: "seosiri-aeo-geo-mcp",
    article: "https://www.seosiri.com/2026/07/aeo-geo-mcp.html",
    edge: "https://aeo.seosiri.com",
    toolsCount: 10
  },
  {
    id: "content-schema-mcp",
    title: "Content Schema & GA4 MCP",
    pypi: "seosiri-content-schema-mcp",
    article: "https://www.seosiri.com/2026/08/content-schema-mcp.html",
    edge: "https://schema.seosiri.com",
    toolsCount: 10
  },
  {
    id: "dns-sec-audit-mcp",
    title: "DNS & Security Audit MCP",
    pypi: "seosiri-dns-sec-audit-mcp",
    article: "https://www.seosiri.com/2026/08/dns-sec-audit-mcp.html",
    edge: "https://dns.seosiri.com",
    toolsCount: 10
  },
  {
    id: "keyword-cluster-mcp",
    title: "Keyword Clustering & Vector RAG MCP",
    pypi: "seosiri-keyword-cluster-mcp",
    article: "https://www.seosiri.com/2026/08/keyword-cluster-mcp.html",
    edge: "https://keywords.seosiri.com",
    toolsCount: 13
  },
  {
    id: "search-governance-mcp",
    title: "AI Search Governance MCP",
    pypi: "seosiri-search-governance-mcp",
    article: "https://www.seosiri.com/2026/08/search-governance-mcp.html",
    edge: "https://governance.seosiri.com",
    toolsCount: 10
  },
  {
    id: "semantic-entity-mcp",
    title: "Knowledge Graph & Entity MCP",
    pypi: "seosiri-semantic-entity-mcp",
    article: "https://www.seosiri.com/2026/08/semantic-entity-mcp.html",
    edge: "https://entity.seosiri.com",
    toolsCount: 10
  },
  {
    id: "ops-comm-mcp",
    title: "Enterprise Ops & Incident Response MCP",
    pypi: "seosiri-ops-comm-mcp",
    article: "https://www.seosiri.com/2026/08/ops-comm-mcp.html",
    edge: "https://ops.seosiri.com",
    toolsCount: 10
  },
  {
    id: "seosiri-db-infra-mcp",
    title: "Database Query & Cloud Infra MCP",
    pypi: "seosiri-db-infra-mcp",
    article: "https://www.seosiri.com/2026/08/seosiri-db-infra-mcp.html",
    edge: "https://db.seosiri.com",
    toolsCount: 10
  },
  {
    id: "bioassay-mcp",
    title: "BioAssay & HTS Automation MCP",
    pypi: "seosiri-bioassay-mcp",
    article: "https://www.seosiri.com/2026/07/bioassay-mcp.html",
    edge: "https://bioassay.seosiri.com",
    toolsCount: 10
  },
  {
    id: "etl-pipeline-mcp",
    title: "Enterprise ETL Pipeline MCP",
    pypi: "etl-pipeline-mcp",
    article: "https://www.seosiri.com/2026/07/etl-pipeline-mcp.html",
    edge: "https://hubappapi.seosiri.com",
    toolsCount: 9
  },
  {
    id: "lambda-data-pipeline-mcp",
    title: "Lambda Big Data Pipeline MCP",
    pypi: "lambda-data-pipeline-mcp",
    article: "https://www.seosiri.com/2026/07/etl-pipeline-mcp.html",
    edge: "https://hubappapi.seosiri.com",
    toolsCount: 10
  },
  {
    id: "seosiri-api-guard-mcp-server",
    title: "Universal API Security Guard MCP",
    pypi: "seosiri-api-guard",
    article: "https://www.seosiri.com/2026/07/seosiri-mcp-servers.html",
    edge: "https://mcp.seosiri.com",
    toolsCount: 10
  },
  {
    id: "biorobotics",
    title: "Bio-Robotics Kinematics Core",
    pypi: "seosiri-biorobotics",
    article: "https://www.seosiri.com/2026/07/seosiri-bio-robotics-core-engine.html",
    edge: "https://mcp.seosiri.com",
    toolsCount: 6
  },
  {
    id: "learning-orchestrator-mcp",
    title: "EdTech Learning Orchestrator MCP",
    pypi: "seosiri-learning-orchestrator",
    article: "https://www.seosiri.com/2026/07/seosiri-mcp-servers.html",
    edge: "https://mcp.seosiri.com",
    toolsCount: 8
  },
  {
    id: "biometric-iot-bridge-mcp",
    title: "Biometric IoT Hardware Bridge MCP",
    pypi: "biometric-iot-bridge-mcp",
    article: "https://www.seosiri.com/2026/02/biometric-iot-bridge.html",
    edge: "https://mcp.seosiri.com",
    toolsCount: 7
  }
];

function generateDynamicSitemapXml(currentDate) {
  let urls = [
    "https://developers.seosiri.com/",
    "https://developers.seosiri.com/llm.txt",
    "https://www.seosiri.com/2026/07/seosiri-mcp-servers.html"
  ];
  MCP_SERVERS_REGISTRY.forEach(item => { if (item.article) urls.push(item.article); });
  const uniqueUrls = Array.from(new Set(urls));
  let xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
  uniqueUrls.forEach(loc => {
    xml += "  <url>\n    <loc>" + loc + "</loc>\n    <lastmod>" + currentDate + "</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n";
  });
  xml += "</urlset>";
  return xml;
}

function generateDynamicLlmText(currentDate) {
  let markdown = "# SEOSiri Model Context Protocol (MCP) Ecosystem\n";
  markdown += "> Official Developer Portal: https://developers.seosiri.com/\n";
  markdown += "> Central Master Directory: https://www.seosiri.com/2026/07/seosiri-mcp-servers.html\n";
  markdown += "> Last Updated: " + currentDate + "\n\n";
  markdown += "## Overview\nSEOSiri maintains " + MCP_SERVERS_REGISTRY.length + " open-source MCP servers with 163 autonomous tools for AEO, GEO, Biopharma, and Data Engineering.\n\n";
  markdown += "## Registered MCP Servers\n";
  MCP_SERVERS_REGISTRY.forEach(item => {
    markdown += "- **" + item.title + "** (`" + item.pypi + "`)\n  - Guide: " + item.article + "\n  - Gateway: " + item.edge + "\n  - Tools: " + item.toolsCount + "\n\n";
  });
  return markdown;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const currentDate = new Date().toISOString().split("T")[0];

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://*.seosiri.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
        },
      });
    }

    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "HEALTHY", active_mcp_servers: MCP_SERVERS_REGISTRY.length }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Content-Security-Policy": "default-src 'self';" }
      });
    }

    if (url.pathname === "/sitemap.xml" || url.pathname === "/sitemap") {
      return new Response(generateDynamicSitemapXml(currentDate), { headers: { "Content-Type": "application/xml" } });
    }

    if (url.pathname === "/llm.txt") {
      return new Response(generateDynamicLlmText(currentDate), { headers: { "Content-Type": "text/plain" } });
    }

    try {
      const response = await env.ASSETS.fetch(request);
      if (response.status === 404 && !url.pathname.includes(".")) {
        return await env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
      }
      return response;
    } catch (e) {
      return new Response("SEOSiri Edge Active", { status: 200 });
    }
  }
};

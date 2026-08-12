// worker.js - Dynamic SEOSiri MCP Gateway, Sitemap & LLM.txt Engine

const MCP_SERVERS_REGISTRY = [
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
    id: "seosiri-vscode-mcp-manager",
    title: "VS Code Extension & MCP Suite Manager",
    pypi: "seosiri-vscode-mcp-manager",
    article: "https://www.seosiri.com/2026/08/seosiri-vscode-mcp-manager.html",
    edge: "https://vscode.seosiri.com",
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
  let urlsXml = `  <url>\n    <loc>https://developers.seosiri.com/</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
  urlsXml += `  <url>\n    <loc>https://developers.seosiri.com/llm.txt</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  urlsXml += `  <url>\n    <loc>https://www.seosiri.com/2026/07/seosiri-mcp-servers.html</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.95</priority>\n  </url>\n`;

  MCP_SERVERS_REGISTRY.forEach(item => {
    urlsXml += `  <url>\n    <loc>${item.article}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsXml}</urlset>`;
}

function generateDynamicLlmText(currentDate) {
  let markdown = `# SEOSiri Model Context Protocol (MCP) Ecosystem
> Official Developer Portal: https://developers.seosiri.com/
> Central Master Directory: https://www.seosiri.com/2026/07/seosiri-mcp-servers.html
> Last Updated: ${currentDate}

## Overview
SEOSiri-Official maintains a sovereign, local-first ecosystem of ${MCP_SERVERS_REGISTRY.length} open-source Model Context Protocol (MCP) servers. The suite provides high-throughput tools for AI Search Governance, AEO/GEO Analytics, Schema Engineering, Technical SEO, Data Engineering, Bio-Robotics, and Biometric IoT.

## Registered MCP Servers & Technical Architecture Guides
`;

  MCP_SERVERS_REGISTRY.forEach(item => {
    markdown += `- **${item.title}** (\`${item.pypi}\`)\n  - Architecture Guide: ${item.article}\n  - Cloudflare Edge Gateway: ${item.edge}\n  - Total Tools: ${item.toolsCount}\n\n`;
  });

  markdown += `## Developer Execution
All packages are published on PyPI and can be executed via Python's \`uv\` package manager or installed directly via \`pip install <package-name>\`.
`;

  return markdown;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const currentDate = new Date().toISOString().split('T')[0];

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://*.seosiri.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
        },
      });
    }

    if (url.pathname === "/health") {
      return new Response(JSON.stringify({
        status: "HEALTHY",
        service: "SEOSiri Developer Portal & Dynamic MCP Gateway",
        active_mcp_servers_count: MCP_SERVERS_REGISTRY.length,
        version: "1.0.0",
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    if (url.pathname === "/sitemap.xml" || url.pathname === "/sitemap") {
      const xmlContent = generateDynamicSitemapXml(currentDate);
      return new Response(xmlContent, {
        status: 200,
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=3600, s-maxage=86400",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    if (url.pathname === "/llm.txt") {
      const markdownContent = generateDynamicLlmText(currentDate);
      return new Response(markdownContent, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600, s-maxage=86400",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    try {
      const response = await env.ASSETS.fetch(request);
      if (response.status === 404 && !url.pathname.includes(".")) {
        return await env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
      }
      return response;
    } catch (e) {
      return new Response("SEOSiri Developer Portal Edge Active", { status: 200 });
    }
  }
};

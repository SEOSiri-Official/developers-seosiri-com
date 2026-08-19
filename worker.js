// worker.js - Dynamic SEOSiri MCP Gateway, Sitemap & LLM.txt Engine

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

    // 2. Health Endpoint
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

    // 3. Dynamic Serverless Endpoint: /sitemap.xml
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

    // 4. Static / Dynamic Assets & SPA Fallback
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

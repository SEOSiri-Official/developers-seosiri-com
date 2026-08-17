# developers.seosiri.com

> 🌐 **Live Developer Portal & Topology Explorer:** [developers.seosiri.com](https://developers.seosiri.com/)  
> 📖 **Central Ecosystem Directory:** [SEOSiri MCP Directory](https://www.seosiri.com/2026/07/seosiri-mcp-servers.html)


Official enterprise developer portal, interactive D3 network topology graph, and Cloudflare Workers edge gateway manager for the **SEOSiri Model Context Protocol (MCP) Suite**.

[![SEOSiri Developer Portal CI](https://github.com/SEOSiri-Official/developers-seosiri-com/actions/workflows/ci.yml/badge.svg)](https://github.com/SEOSiri-Official/developers-seosiri-com/actions/workflows/ci.yml)

---

## 🚀 Overview & Key Features

- **16-Server Interactive Topology Graph:** Force-directed D3 network graph mapping connections between AI host clients (Claude Desktop, Cursor AI, LangChain), Cloudflare edge gateways (`*.seosiri.com`), PyPI/NPM packages, and technical architecture guides.
- **163 Autonomous MCP Tools:** Real-time tool schema inspector detailing tool parameters, descriptions, and sample JSON input payloads.
- **Zero-Setup Client Config Generator:** Automatically compiles valid `claude_desktop_config.json` files for local `uv` and `npx` package execution.
- **Live Edge Health Inspector:** Monitors sub-millisecond HTTP response latencies across all 11 live Cloudflare Worker edge subdomains.
- **Dynamic Serverless Sitemap & LLM.txt Engine:** Generates real-time `/sitemap.xml` and `/llm.txt` endpoints at the edge for Googlebot and AI crawlers (GPTBot, ClaudeBot, PerplexityBot).

---

---

## 💼 Commercial Licensing & High-Throughput API Keys

Need higher rate limits for enterprise production or autonomous AI pipelines?

- **Free Tier (Default):** 30 requests / minute (Zero setup, no credit card required).
- **Pro Tier ($299 / month):** 1,000 requests / minute across all Cloudflare edge gateways with dedicated HMAC-SHA256 API key.
- **Enterprise Contract ($2,500 / contract):** 5,000 requests / minute, dedicated Cloudflare Zero Trust VPC setup, custom tool engineering, and SLA guarantee.

### How to Upgrade via Payoneer:
1. Transfer **$299** (Pro) or **$2,500** (Enterprise) to our official Payoneer account: **`badhan_pbn@yahoo.com`**
2. Include your **Company Name & Email** in the payment note.
3. Your signed cryptographic API key (`PRO_US_...`) will be dispatched to your email within 15 minutes.
4. **Developer Portal & Documentation:** [developers.seosiri.com](https://developers.seosiri.com/)
5. **Corporate Contact Desk:** `info@seosiri.com`

---

## 🛠️ Local Development & Quickstart

### Prerequisites
- Node.js (v20+) or Bun (v1.2+)

### Commands
```bash
# 1. Clone repository
git clone https://github.com/SEOSiri-Official/developers-seosiri-com.git
cd developers-seosiri-com 

# 2. Install dependencies
bun install   # or: npm install

# 3. Start local development server
bun run dev   # or: npm run dev

# 4. Build for production (outputs to ./dist)
bun run build # or: npm run build
```

---

## 🌐 Cloudflare Workers Edge Gateway Architecture

The application is deployed to Cloudflare Workers using a zero-dependency native ES Module Worker (`worker.js`) that serves compiled static assets from `./dist` while handling CORS preflight headers and health checks.

### Live Endpoint
🔗 [https://developers.seosiri.com/health](https://developers.seosiri.com/health)

```json
{
  "status": "HEALTHY",
  "service": "SEOSiri Developer Portal & Dynamic MCP Gateway",
  "active_mcp_servers_count": 16,
  "version": "1.0.0"
}
```

---


## 💖 Lead Architect & Attribution

Designed and engineered by **Momenul Ahmad**, Lead Architect and Founder of [SEOSiri](https://seosiri.com).

### Enterprise B2B Custom MCP Engineering
SEOSiri provides high-ticket systems architecture, custom MCP server development, HIPAA/GDPR compliance interlocks, and Cloudflare Zero Trust gateway integration for corporate clients in the United States, United Kingdom, Canada, Germany, and Japan.

- **Corporate Contact Desk:** info@seosiri.com
- **Official Portal:** [seosiri.com](https://seosiri.com)
- **GitHub Sponsors:** [Sponsor SEOSiri-Official on GitHub](https://github.com)

---


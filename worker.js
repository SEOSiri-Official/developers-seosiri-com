// worker.js - Native Cloudflare Worker for developers.seosiri.com
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. CORS Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    // 2. Health Check Endpoint
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({
        status: "HEALTHY",
        service: "SEOSiri Developer Portal & Graph Explorer",
        version: "1.0.0",
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    // 3. Fallback to native static asset fetch
    try {
      return await env.ASSETS.fetch(request);
    } catch (e) {
      return new Response("SEOSiri Developer Portal Edge Asset Error", { status: 500 });
    }
  }
};
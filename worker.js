// worker.js - Cloudflare Worker for developers.seosiri.com
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  const request = event.request;
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

  // 2. Health Endpoint
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

  // 3. Serve Static Assets (React/Vite compiled in ./dist)
  try {
    return await getAssetFromKV(event);
  } catch (e) {
    // Single Page Application (SPA) Fallback
    try {
      let notFoundResponse = await getAssetFromKV(event, {
        mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req),
      });
      return new Response(notFoundResponse.body, { ...notFoundResponse, status: 200 });
    } catch (err) {
      return new Response("SEOSiri Developer Portal Asset Error", { status: 500 });
    }
  }
}
export const AGENT_GUARD_STANDARD = {
  version: "1.0.0",
  compliance: ["HIPAA", "GDPR", "SOC2", "FDA-21-CFR-Part11"],
  features: [
    "Deterministic Prompt Sanitization",
    "Real-time Token Budgeting",
    "Immutable Audit Ledger",
    "Hardware-Bound TPM Verification"
  ],
  integration: "Universal (MCP / OpenAI / LangChain)"
};

export const AGENT_GUARD_TOOLS = [
  {
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
  }
];

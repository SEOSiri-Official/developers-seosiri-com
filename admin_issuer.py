# admin_issuer.py - Command-Line Admin Key Issuer for SEOSiri Ecosystem
import hmac
import hashlib
import time
import sys

MASTER_SECRET = "seosiri_master_mcp_secret_key_2026_x99"

def generate_key(client_id: str, scope: str = "BIOPHARMA", tier: str = "PRO", country: str = "US", days: int = 365) -> str:
    user = client_id.strip().lower().replace("_", "-")
    scope = scope.upper()
    tier = tier.upper()
    country = country.upper()
    expires_at = int(time.time()) + (days * 86400)

    payload = f"{tier}_{country}_{user}_{scope}_{expires_at}"
    
    signature = hmac.new(
        MASTER_SECRET.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()[:8]

    return f"{payload}_{signature}"

if __name__ == "__main__":
    client = sys.argv[1] if len(sys.argv) > 1 else "client-us"
    scope = sys.argv[2] if len(sys.argv) > 2 else "BIOPHARMA"
    tier = sys.argv[3] if len(sys.argv) > 3 else "PRO"
    country = sys.argv[4] if len(sys.argv) > 4 else "US"
    days = int(sys.argv[5]) if len(sys.argv) > 5 else 365

    key = generate_key(client, scope, tier, country, days)

    print("\n==================================================")
    print("    SEOSIRI ADMIN CRYPTOGRAPHIC KEY GENERATOR     ")
    print("==================================================")
    print(f" Client ID       : {client}")
    print(f" MCP Scope       : {scope}")
    print(f" Tier Level      : {tier}")
    print(f" Country Code    : {country}")
    print(f" Valid Duration  : {days} Days")
    print(f" HMAC Signed Key : {key}")
    print("==================================================\n")
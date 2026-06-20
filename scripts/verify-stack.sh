#!/usr/bin/env bash
# Verify the local SikaChain monorepo dev stack is reachable.
set -euo pipefail

RPC="${SIKACHAIN_RPC_URL:-http://127.0.0.1:8888}"
SITE="${NEXT_PUBLIC_SITE_URL:-http://127.0.0.1:3004}"
APP="${NEXT_PUBLIC_SIKA_APP_URL:-http://127.0.0.1:3003}"
PASS=0
FAIL=0

check() {
  local name="$1"
  local url="$2"
  if curl -sf "$url" >/dev/null 2>&1; then
    echo "✓ ${name}"
    PASS=$((PASS + 1))
  else
    echo "✗ ${name} — ${url}"
    FAIL=$((FAIL + 1))
  fi
}

echo "=== SikaChain stack health ==="
check "Chain RPC" "${RPC}/v1/chain/get_info"
check "Marketing site" "${SITE}/"
check "Site health API" "${SITE}/api/health"
check "Block explorer page" "${SITE}/explorer"
check "Sika App" "${APP}/"

echo ""
if [[ "${FAIL}" -eq 0 ]]; then
  echo "All ${PASS} checks passed."
  exit 0
fi

echo "${FAIL} check(s) failed, ${PASS} passed."
echo ""
echo "Start missing services:"
echo "  npm run dev:stack          # chain + print URLs"
echo "  sikachaindev/start-web.sh  # marketing site"
echo "  sikachaindev/start-app.sh  # Sika App"
exit 1

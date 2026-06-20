#!/usr/bin/env bash
# Start the full local SikaChain dev stack (chain + print URLs for site + app).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SPRING_SCRIPTS="${SPRING_SCRIPTS:-${ROOT}/../AntelopeOS/spring/sikachaindev/scripts}"
Sika_APP_DIR="${SIKA_APP_DIR:-${ROOT}/../Sika app}"
SITE_PORT="${SITE_PORT:-3004}"
APP_PORT="${APP_PORT:-3003}"
RPC_URL="${SIKACHAIN_RPC_URL:-http://127.0.0.1:8888}"

echo "=== SikaChain local dev stack ==="
echo ""

if [[ ! -d "${SPRING_SCRIPTS}" ]]; then
  echo "error: sikachaindev scripts not found at ${SPRING_SCRIPTS}"
  echo "  set SPRING_SCRIPTS=/path/to/spring/sikachaindev/scripts"
  exit 1
fi

if curl -sf "${RPC_URL}/v1/chain/get_info" >/dev/null 2>&1; then
  echo "✓ Chain already online at ${RPC_URL}"
else
  echo "→ Starting SikaChainDev (keosd + nodeos)..."
  "${SPRING_SCRIPTS}/start-all.sh"
  sleep 2
  if curl -sf "${RPC_URL}/v1/chain/get_info" >/dev/null 2>&1; then
    echo "✓ Chain online"
  else
    echo "warning: chain may still be starting — check ${SPRING_SCRIPTS}/status.sh"
  fi
fi

echo ""
echo "=== Dev URLs ==="
echo "  SikaChain site   http://localhost:${SITE_PORT}"
echo "  Sika App         http://localhost:${APP_PORT}"
echo "  Block explorer   http://localhost:${SITE_PORT}/explorer"
echo "  Admin            http://localhost:${SITE_PORT}/admin"
echo "  Chain RPC        ${RPC_URL}"
echo ""
echo "=== Start in separate terminals ==="
echo "  Website:  cd \"${ROOT}\" && npm run dev"
if [[ -d "${SIKA_APP_DIR}" ]]; then
  echo "  Sika App: ${SPRING_SCRIPTS}/start-app.sh"
else
  echo "  Sika App: (not found at ${SIKA_APP_DIR})"
fi
echo ""
echo "  Full bootstrap: ${SPRING_SCRIPTS}/bootstrap-dev.sh"
echo "  Ecosystem:      ${SPRING_SCRIPTS}/ecosystem-status.sh"

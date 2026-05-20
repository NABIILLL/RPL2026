#!/usr/bin/env bash
set -euo pipefail
echo "[dev:3000] freeing port 3000 if occupied..."
PID=$(lsof -tiTCP:3000 -sTCP:LISTEN || true)
if [ -n "${PID}" ]; then
  echo "[dev:3000] found PID ${PID} on port 3000, attempting to kill..."
  kill ${PID} 2>/dev/null || kill -9 ${PID} 2>/dev/null || true
  sleep 1
  echo "[dev:3000] killed ${PID}"
else
  echo "[dev:3000] no process listening on port 3000"
fi

echo "[dev:3000] starting Next dev on port 3000"
PORT=3000 next dev

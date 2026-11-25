#!/usr/bin/env bash
# Reads only dummy settings supplied for this exercise. Never source unknown files.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "$ROOT/practice/inspect.env"
printf 'Checking http://localhost:%s/health\n' "$APP_PORT"
curl --noproxy '*' --connect-timeout 2 --max-time 3 -fsS "http://localhost:${APP_PORT}/health"
status=$?
printf '\nprobe exit=%s\n' "$status"
exit "$status"

# Terminal Inspection Starter

LU 2.3: inspect the Campus Events application with Bash and curl. This is a copy of the reference app from LU 2.2, with practice files and one deliberate probe configuration fault.

## Prerequisites

- macOS Terminal, Linux Bash, or **Windows WSL Ubuntu**. Commands use Bash, not PowerShell or cmd.
- Git, Node.js 18 or later, npm, curl. Internet needed for the initial install.
- No Docker or PostgreSQL required for this LU. You use the existing `/health` route in a liveness-only preview. Other business endpoints are not enabled in this preview.

Check: `bash --version`, `git --version`, `node --version`, `npm --version`, `curl --version`.

## Start

Create your own copy with **Use this template → Create a new repository**, then clone it. Alternatively clone this starter directly for practice.

```bash
git clone https://github.com/Kalvium-Program/sw-sem6-terminal-inspection-starter.git
cd sw-sem6-terminal-inspection-starter
npm ci
node scripts/preview.js
```

Leave this terminal open. In a second Bash terminal, enter the same repo folder and run:

```bash
curl --noproxy '*' -i http://localhost:3000/health
status=$?
printf 'curl exit=%s\n' "$status"
```

Expected: HTTP 200, `{"status":"ok"}`, `curl exit=0`. Stop the preview with Ctrl+C when finished.

## Inspect

- `src/server.js`: starts the full reference application.
- `src/routes.js`: existing route handlers, including `/health`.
- `src/config.js`: reads application settings. Read this file, not your private `.env`.
- `practice/sample.log`: five dummy log lines, two containing ERROR. No credentials.
- `practice/inspect.env`: dummy probe port, not a password.
- `scripts/probe.sh`: checks `/health` at the port in `practice/inspect.env`.
- `scripts/preview.js`: liveness-only wrapper using the original `/health` handler.

## Supplied failure

With the preview running in terminal A, use terminal B:

```bash
bash scripts/probe.sh
status=$?
printf 'shell exit=%s\n' "$status"
```

One port setting is wrong. Read the URL, the curl error and the script. Correct **only** `practice/inspect.env` so it matches the preview address. Run the same command again and capture its exit status immediately.

Keep the preview running throughout both attempts. Do not edit the HTTP handler or fake a successful output. If something else is listening on port 3001, stop only your own process or ask your mentor before proceeding.

## Scope

The preview proves process liveness only. It does **not** prove PostgreSQL readiness or that `/api/events` works. For the full reference application and database setup see [Campus Events](https://github.com/Kalvium-Program/sw-sem6-campus-events).

No PR, CI workflow or deployment is required in this LU.

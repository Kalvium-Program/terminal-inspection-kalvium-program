const { pool } = require("./db");

function send(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

function log(req, status, started) {
  const ms = Date.now() - started;
  console.log(`${new Date().toISOString()} ${req.method} ${req.url} ${status} ${ms}ms`);
}

async function handle(req, res) {
  const started = Date.now();
  let status = 200;
  try {
    // 1. Liveness: is the Node process up? Does not touch the database.
    if (req.method === "GET" && req.url === "/health") {
      return send(res, 200, { status: "ok" });
    }

    // 2. Readiness: can the app reach PostgreSQL?
    if (req.method === "GET" && req.url === "/ready") {
      await pool.query("SELECT 1");
      return send(res, 200, { status: "ready", database: "up" });
    }

    // 3. Business endpoint: list upcoming events from PostgreSQL.
    if (req.method === "GET" && req.url === "/api/events") {
      const { rows } = await pool.query(
        "SELECT id, title, venue, starts_at, seats_left FROM events ORDER BY starts_at"
      );
      return send(res, 200, rows);
    }

    status = 404;
    return send(res, 404, { error: "Not found" });
  } catch (err) {
    status = 503;
    console.error(`ERROR ${req.url}: ${err.code || err.message}`);
    return send(res, 503, { error: "Database unavailable" });
  } finally {
    log(req, status, started);
  }
}

module.exports = { handle };

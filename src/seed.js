const fs = require("fs");
const path = require("path");
const { pool } = require("./db");

async function main() {
  const sql = fs.readFileSync(path.join(__dirname, "../db/seed.sql"), "utf8");
  await pool.query(sql);
  const { rows } = await pool.query("SELECT COUNT(*)::int AS n FROM events");
  console.log(`Seeded ${rows[0].n} events.`);
  await pool.end();
}

main().catch((err) => {
  console.error(`Seed failed: ${err.message}`);
  process.exit(1);
});

const { Pool } = require("pg");
const config = require("./config");

const pool = new Pool({ ...config.db, connectionTimeoutMillis: 2000 });

// Without this, a database restart crashes the whole app.
pool.on("error", (err) => {
  console.error(`ERROR database connection lost: ${err.message}`);
});

module.exports = { pool };

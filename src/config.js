// All settings come from environment variables, with safe local defaults.
module.exports = {
  port: Number(process.env.PORT || 3000),
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || "events",
    password: process.env.DB_PASSWORD || "events",
    database: process.env.DB_NAME || "events",
  },
};

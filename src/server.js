const http = require("http");
const config = require("./config");
const { handle } = require("./routes");

const server = http.createServer(handle);

server.listen(config.port, () => {
  console.log(`Campus Events API listening on http://localhost:${config.port}`);
  console.log(`Database: ${config.db.host}:${config.db.port}/${config.db.database}`);
});

const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");
const { handle } = require("../src/routes");

test("GET /health returns ok without a database", async () => {
  const server = http.createServer(handle).listen(0);
  const port = server.address().port;
  const res = await fetch(`http://localhost:${port}/health`);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { status: "ok" });
  server.close();
  await require("../src/db").pool.end();
});

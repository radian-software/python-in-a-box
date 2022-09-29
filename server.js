const fs = require("fs");
const process = require("process");

const express = require("express");
const ws = require("express-ws");
const pty = require("node-pty");

const html = fs.readFileSync("index.html");

const app = express();

const expressWs = ws(app);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(html);
});
app.ws("/ws", (ws) => {
  const term = pty.spawn("python3", [], { name: "xterm-color" });
  setTimeout(() => term.kill(), 3600 * 1000); // session timeout
  term.on("data", (data) => {
    try {
      ws.send(data);
    } catch (err) {}
  });
  ws.on("message", (data) => term.write(data));
});

// Prevent malformed packets from crashing server.
expressWs.getWss().on("connection", (ws) => ws.on("error", console.error));

app.listen(parseInt(process.env.PORT), "0.0.0.0");

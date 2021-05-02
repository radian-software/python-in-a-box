const process = require("process");

const express = require("express");
const ws = require("express-ws");
const pty = require("node-pty");

const app = express();

ws(app);

app.get("/", (req, res) => res.sendFile("index.html"));
app.ws("/ws", (ws) => {
  const term = pty.spawn("python3", [], { name: "xterm-color" });
  term.on("data", ws.send);
  ws.on("message", term.write);
});

app.listen(parseInt(process.env.PORT), "0.0.0.0");

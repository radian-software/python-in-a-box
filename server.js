const process = require("process");

const express = require("express");
const ws = require("express-ws");
const pty = require("node-pty");

const app = express();

ws(app);

app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`));
app.ws("/ws", (ws) => {
  const term = pty.spawn("python3", [], { name: "xterm-color" });
  term.on("data", (data) => {
    try {
      ws.send(data);
    } catch (err) {}
  });
  ws.on("message", (data) => term.write(data));
});

app.listen(parseInt(process.env.PORT), "0.0.0.0");

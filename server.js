const http = require("http");
const fs = require("fs");

function isValidLogin(email, password) {
  return typeof email === "string" && typeof password === "string" &&
    email.includes("@") && password.length >= 8;
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(fs.readFileSync("index.html"));
  }

  if (req.method === "GET" && req.url === "/script.js") {
    res.writeHead(200, { "Content-Type": "application/javascript" });
    return res.end(fs.readFileSync("script.js"));
  }

  if (req.method === "POST" && req.url === "/api/login") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const { email, password } = JSON.parse(body || "{}");
      res.writeHead(200, { "Content-Type": "application/json" });
      if (isValidLogin(email, password)) {
        res.end(JSON.stringify({ message: "Passed validation." }));
      } else {
        res.end(JSON.stringify({ message: "Validation failed on the server." }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
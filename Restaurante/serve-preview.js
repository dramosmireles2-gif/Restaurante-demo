const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = 8321;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
};

http
  .createServer((req, res) => {
    const requestedPath = (req.url === "/" ? "/index.html" : req.url).split("?")[0];
    const filePath = path.join(root, decodeURIComponent(requestedPath));

    fs.readFile(filePath, (error, file) => {
      if (error) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not found");
        return;
      }

      res.writeHead(200, {
        "Content-Type": mimeTypes[path.extname(filePath)] || "text/plain; charset=utf-8",
      });
      res.end(file);
    });
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`Preview server running at http://127.0.0.1:${port}`);
  });

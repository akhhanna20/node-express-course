const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Welcome to our home page");
  } else if (req.url === "/about") {
    res.end("Here is our short history");
  } else {
    res.end(`
        <h1>Page not found</h1>
        <a href="/">back home</a>
        `);
  }
});

server.listen(3000);

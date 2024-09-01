const http = require('http');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3000; // Porta fornecida pelo Render

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    const extname = path.extname(filePath);
    const contentType = extname === '.html' ? 'text/html' : 'text/css';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('404 Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

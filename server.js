const http = require('http'); // Módulo para criar o servidor HTTP
const path = require('path'); // Módulo para manipulação de caminhos de arquivos
const fs = require('fs'); // Módulo para operações de sistema de arquivos

const port = process.env.PORT || 3000; // Porta do servidor

const server = http.createServer((req, res) => {
    // Define o caminho do arquivo com base na URL
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    const extname = path.extname(filePath);
    const contentType = extname === '.html' ? 'text/html' : 'text/css';

    // Lê e envia o arquivo solicitado
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

// Inicia o servidor
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

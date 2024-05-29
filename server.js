const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

http.createServer((request, response) => {
    let parsedUrl = url.parse(request.url, true);
    let pathname = parsedUrl.pathname;

    const filePath = pathname === '/' ? './WWW/Libroteca.html' : `./WWW${pathname}`;
    
    if (pathname === '/registro' && request.method === 'POST') {
        let data = [];
        request.on("data", chunk => {
            data.push(chunk);
        }).on("end", () => {
            let params = Buffer.concat(data).toString();
            fs.appendFile('contact_data.txt', params + '\n', (err) => {
                if (err) {
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.write("Error Interno del Servidor");
                    response.end();
                    return;
                }
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write("Datos recibidos y almacenados");
                response.end();
            });
        });
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("No encontrado");
            response.end();
        } else {
            const ext = path.extname(filePath).substring(1);
            const mimeTypes = {
                'html': 'text/html',
                'txt': 'text/plain',
                'css': 'text/css',
                'js': 'application/javascript',
                'json': 'application/json',
                'png': 'image/png',
                'jpg': 'image/jpeg',
                'jpeg': 'image/jpeg',
                'gif': 'image/gif',
                'svg': 'image/svg+xml',
                'ico': 'image/x-icon'
            };
            response.writeHead(200, {"Content-Type": mimeTypes[ext] || 'application/octet-stream'});
            response.write(data);
            response.end();
        }
    });
}).listen(5555);

console.log("Servidor ejecutándose.");
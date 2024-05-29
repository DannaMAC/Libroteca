const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const oracledb = require('oracledb');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5555;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'WWW')));

async function insertUser(data){
    let connection;
    try {
        connection = await oracledb.getConnection({user:"HR", password:"hr", connectionString:"localhost/xepdb1"});
        console.log("Conexion exitosa a la Base de Datos");

        const sql = `INSERT INTO users (first_name, last_name, address, phone_number, email) VALUES (:1, :2, :3, :4, :5)`;
        const result = await connection.execute(sql, [data.newFirstName, data.newLastName, data.newAddress, data.newPhoneNumber, data.newEmail], {autoCommit:true});
        console.log(result.rowsAffected, "Filas insertadas");

        return "Usuario registrado exitosamente";

    }catch(err){
        console.error(err);
        res.status(500).send("Error al registrar el usuario");
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch(err){
                console.err(err);
            }
        }
    }
}

app.post('/registerUser', async (req, res) => {
    try {
        const message = await insertUser(req.body);
        res.send(message);
    }catch(error){
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
/*
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
*/
console.log("Servidor ejecutándose.");
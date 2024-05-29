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
        throw new Error("Error al registrar el usuario");
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

async function insertBook(data){
    let connection;
    try {
        connection = await oracledb.getConnection({user:"HR", password:"hr", connectionString:"localhost/xepdb1"});
        console.log("Conexion exitosa a la Base de Datos");

        const sql = `INSERT INTO books (name, author, description, edition, editor) VALUES (:1, :2, :3, :4, :5)`;
        const result = await connection.execute(sql, [data.bookName, data.bookAuthor, data.bookDescription, data.bookEdition, data.bookEditor], {autoCommit:true});
        console.log(result.rowsAffected, "Filas insertadas");

        return "Libro registrado exitosamente";

    }catch(err){
        console.error(err);
        throw new Error("Error al registrar el libro");
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

app.post('/addBook', async (req, res) => {
    try {
        const message = await insertBook(req.body);
        res.send(message);
    }catch(error){
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

console.log("Servidor ejecutándose.");
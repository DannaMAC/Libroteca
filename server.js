const path = require('path');
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

        const sql = `INSERT INTO client (first_name, last_name, address, phone_number, email) VALUES (:1, :2, :3, :4, :5)`;
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

async function insertLibrarian(data){
    let connection;
    try {
        connection = await oracledb.getConnection({user:"HR", password:"hr", connectionString:"localhost/xepdb1"});
        console.log("Conexion exitosa a la Base de Datos");

        const sql = `INSERT INTO librarian (first_name, last_name, email, address, phone_number, role) VALUES (:1, :2, :3, :4, :5, :6)`;
        const result = await connection.execute(sql, [data.librarianFirstName, data.librarianLastName, data.librarianEmail, data.librarianAddress, data.librarianPhoneNumber, data.librarianRole], {autoCommit:true});
        console.log(result.rowsAffected, "Filas insertadas");

        return "Bibliotecario registrado exitosamente";

    }catch(err){
        console.error(err);
        throw new Error("Error al registrar el bibliotecario");
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

        const sql = `INSERT INTO book (name, author, description, edition, editor) VALUES (:1, :2, :3, :4, :5)`;
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

async function insertLoan(data){
    let connection;
    try {
        connection = await oracledb.getConnection({user:"HR", password:"hr", connectionString:"localhost/xepdb1"});
        console.log("Conexion exitosa a la Base de Datos");

        const sql = `INSERT INTO loan (client_id, librarian_id, stock_id, loan_start_date, loan_due_date, loan_return_date, status) VALUES (:1, :2, :3, :4, :5, :6, :7)`;
        const result = await connection.execute(sql, [data.clientId, data.librarianId, data.stockId, data.loanStartDate, data.loanDueDate, data.loanReturnDate, data.status], {autoCommit:true});
        console.log(result.rowsAffected, "Filas insertadas");

        return "Prestamo registrado exitosamente";

    }catch(err){
        console.error(err);
        throw new Error("Error al registrar el prestamo");
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

async function insertStock(data){
    let connection;
    try {
        connection = await oracledb.getConnection({user:"HR", password:"hr", connectionString:"localhost/xepdb1"});
        console.log("Conexion exitosa a la Base de Datos");

        const sql = `INSERT INTO stock (status, book_id, available) VALUES (:1, :2, :3)`;
        const result = await connection.execute(sql, [data.status, data.bookId, data.available], {autoCommit:true});
        console.log(result.rowsAffected, "Filas insertadas");

        return "Stock registrado exitosamente";

    }catch(err){
        console.error(err);
        throw new Error("Error al registrar el stock");
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

async function insertFine(data){
    let connection;
    try {
        connection = await oracledb.getConnection({user:"HR", password:"hr", connectionString:"localhost/xepdb1"});
        console.log("Conexion exitosa a la Base de Datos");

        const sql = `INSERT INTO fine (amount_to_pay, fine_date, status, loan_id) VALUES (:1, :2, :3, :4)`;
        const result = await connection.execute(sql, [data.amountToPay, data.fineDate, data.status, data.loanId], {autoCommit:true});
        console.log(result.rowsAffected, "Filas insertadas");

        return "Multa registrada exitosamente";

    }catch(err){
        console.error(err);
        throw new Error("Error al registrar la multa");
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

app.post('/registerLibrarian', async (req, res) => {
    try {
        const message = await insertLibrarian(req.body);
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

app.post('/createLoan', async (req, res) => {
    try {
        const message = await insertLoan(req.body);
        res.send(message);
    }catch(error){
        res.status(500).send(error.message);
    }
});

app.post('/createStock', async (req, res) => {
    try {
        const message = await insertStock(req.body);
        res.send(message);
    }catch(error){
        res.status(500).send(error.message);
    }
});

app.post('/createFine', async (req, res) => {
    try {
        const message = await insertFine(req.body);
        res.send(message);
    }catch(error){
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

console.log("Servidor ejecutándose.");
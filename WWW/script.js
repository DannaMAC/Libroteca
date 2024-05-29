var adminUsername = "admin"; // Nombre de usuario del administrador
var adminPassword = "admin10"; // Contraseña del administrador

function authenticate(event) {
    event.preventDefault(); 

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === adminUsername && password === adminPassword) {
        console.log("Inicio de sesión exitoso para el administrador");
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}
function redirectToMainPage() {
  window.location.href = "Libroteca.html";
}

function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(section => {
        section.style.display = 'none';
    });

    document.getElementById(sectionId).style.display = 'block';
}

function logout() {
    document.getElementById('loginPage').style.display = 'flex'; 
    document.getElementById('mainPage').style.display = 'none';
}

function registerUser(event) {
    event.preventDefault();

    var newFirstName = document.getElementById('newFirstName').value;
    var newLastName = document.getElementById('newLastName').value;
    var newAddress = document.getElementById('newAddress').value;
    var newPhoneNumber = document.getElementById('newPhoneNumber').value;
    var newEmail = document.getElementById('newEmail').value;

    fetch('/registerUser', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        newFirstName,
        newLastName,
        newAddress,
        newPhoneNumber,
        newEmail
      })
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
      document.getElementById('userRegistrationForm').reset();
    })
    .catch(error => console.error('Error:', error));


    console.log('Usuario registrado:', {
        firstName: newFirstName,
        lastName: newLastName,
        address: newAddress,
        phoneNumber: newPhoneNumber,
        email: newEmail
    });

    alert('Usuario registrado con éxito');
    document.getElementById('userRegistrationForm').reset();
}

function addBook(event) {
    event.preventDefault();

    var bookName = document.getElementById('bookName').value;
    var bookAuthor = document.getElementById('bookAuthor').value;
    var bookDescription = document.getElementById('bookDescription').value;
    var bookEdition = document.getElementById('bookEdition').value;
    var bookEditor = document.getElementById('bookEditor').value;

    console.log('Libro agregado:', {
        name: bookName,
        author: bookAuthor,
        description: bookDescription,
        edition: bookEdition,
        editor: bookEditor
    });

    // Aquí puedes realizar una llamada AJAX para insertar los datos en la base de datos
    // Por ejemplo, utilizando Fetch API o XMLHttpRequest

    alert('Libro agregado con éxito');
    document.getElementById('bookForm').reset();
}

function createLoan(event) {
  event.preventDefault();

  var clientId = document.getElementById('clientId').value;
  var librarianId = document.getElementById('librarianId').value;
  var stockId = document.getElementById('stockId').value;
  var loanStartDate = document.getElementById('loanStartDate').value;
  var loanDueDate = document.getElementById('loanDueDate').value;
  var loanReturnDate = document.getElementById('loanReturnDate').value;
  var status = document.getElementById('status').value;

  console.log('Préstamo creado:', {
      clientId: clientId,
      librarianId: librarianId,
      stockId: stockId,
      loanStartDate: loanStartDate,
      loanDueDate: loanDueDate,
      loanReturnDate: loanReturnDate,
      status: status
  });

  alert('Préstamo creado con éxito');
  document.getElementById('loanForm').reset();
}
function createStock(event) {
  event.preventDefault();

  var stockId = document.getElementById('stockId').value;
  var status = document.getElementById('status').value;
  var bookId = document.getElementById('bookId').value;
  var available = document.getElementById('available').value;

  console.log('Stock agregado:', {
      stockId: stockId,
      status: status,
      bookId: bookId,
      available: available
  });

  alert('Stock agregado con éxito');
  document.getElementById('stockForm').reset();
}
function createFine(event) {
  event.preventDefault();

  var fineId = document.getElementById('fineId').value;
  var amountToPay = document.getElementById('amountToPay').value;
  var fineDate = document.getElementById('fineDate').value;
  var status = document.getElementById('status').value;
  var loanId = document.getElementById('loanId').value;

  console.log('Fine agregado:', {
      fineId: fineId,
      amountToPay: amountToPay,
      fineDate: fineDate,
      status: status,
      loanId: loanId
  });

  alert('Fine agregado con éxito');
  document.getElementById('fineForm').reset();
}
function logout() {
  window.location.href = 'Login.html'; // Redirige a Login.html
}
/*const oracledb = require('oracledb');
async function runApp()
{
  let connection;
  try {
    connection = await oracledb.getConnection({ user: "HR", password: "hr", connectionString: "localhost/xepdb1" });
    console.log("Conexion exitosa a la Base de Datos Oracle");
    
    // Insertar datos
    const sql = `insert into cliente (clienteid, nombrecliente, direccion, ciudad, estado, cp) values(:1, :2, :3, :4, :5, :6)`;
    const rows = [ [1, 'Juan', 'Calle Benavides', 'Chihuahua', 'Chihuahua', '31429'], [2, 'Roberto', 'Calle Skibidi', 'Chihuahua', 'Chihuahua', '31426'], [3, 'Raul', 'Calle Ola', 'Chihuahua', 'Chihuahua', '31510']];
    let result = await connection.executeMany(sql, rows);
    console.log(result.rowsAffected, "Filas insertadas");
    connection.commit();
    console.log("Insercion exitosa a la base de datos");
    
    // Actualizar datos
    const sql2 = `update cliente set cp = '31110' WHERE estado = 'Chihuahua'`;
    let result2 = await connection.execute(sql2);
    console.log(result2.rowsAffected, "Filas actualizadas");
    connection.commit();

    // Eliminar datos
    const sql3 = `delete from cliente where ciudad = 'Chihuahua'`;
    let result3 = await connection.execute(sql3);
    console.log(result3.rowsAffected, "Filas eliminadas");
    connection.commit();

  } catch (err) {
    console.error(err);
  } finally {
    if (connection)
    {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}
runApp();
*/
function register(){
  var newUsername = document.getElementById('newUsername').value;
  var newPassword = document.getElementById('newPassword').value;
  var email = document.getElementById('email').value;
  var fullName = document.getElementById('fullName').value;

  const oracledb = require('oracledb');
  async function runApp()
  {
  let connection;
  try {
      connection = await oracledb.getConnection({ user: "HR", password: "hr", connectionString: "localhost/xepdb1" });
      console.log("Conexion exitosa a la Base de Datos Oracle");
      const sql = `insert into prueba1 (client_id, username, email, first_name, last_name) values(:1, :2, :3, :4, :5)`;
      const parts = fullName.split(" ");
      const name = parts[0];
      const lastName = parts[1];
      const rows = [[newUsername, newPassword, email, name, lastName]];
      let result = await connection.executeMany(sql, rows);
      console.log(result.rowsAffected, "Filas insertadas");
      connection.commit();
      console.log("Insercion exitosa a la base de datos");
      
  } catch (err) {
      console.error(err);
  } finally {
      if (connection)
      {
      try {
          await connection.close();
      } catch (err) {
          console.error(err);
      }
      }
  }
  }
}
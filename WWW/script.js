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

    document.getElementById('userRegistrationForm').reset();
}

function registerLibrarian(event) {
  event.preventDefault();

  var librarianFirstName = document.getElementById('librarianFirstName').value;
  var librarianLastName = document.getElementById('librarianLastName').value;
  var librarianEmail = document.getElementById('librarianEmail').value;
  var librarianAddress = document.getElementById('librarianAddress').value;
  var librarianPhoneNumber = document.getElementById('librarianPhoneNumber').value;
  var librarianRole = document.getElementById('librarianPhoneNumber').value;

  fetch('/registerLibrarian', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      librarianFirstName,
      librarianLastName,
      librarianEmail,
      librarianAddress,
      librarianPhoneNumber,
      librarianRole
    })
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
    document.getElementById('librarianRegistrationForm').reset();
  })
  .catch(error => console.error('Error:', error));

  console.log('Bibliotecario registrado:', {
      librarianFirstName: librarianFirstName,
      librarianLastName: librarianLastName,
      librarianEmail: librarianEmail,
      librarianAddress: librarianAddress,
      librarianPhoneNumber: librarianPhoneNumber,
      librarianRole: librarianRole
  });

  document.getElementById('librarianRegistrationForm').reset();
}

function addBook(event) {
    event.preventDefault();

    var bookName = document.getElementById('bookName').value;
    var bookAuthor = document.getElementById('bookAuthor').value;
    var bookDescription = document.getElementById('bookDescription').value;
    var bookEdition = document.getElementById('bookEdition').value;
    var bookEditor = document.getElementById('bookEditor').value;

    fetch('/addBook', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        bookName,
        bookAuthor,
        bookDescription,
        bookEdition,
        bookEditor
      })
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
      document.getElementById('bookForm').reset();
    })
    .catch(error => console.error('Error:', error));

    console.log('Libro agregado:', {
        name: bookName,
        author: bookAuthor,
        description: bookDescription,
        edition: bookEdition,
        editor: bookEditor
    });

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

  fetch('/createLoan', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      clientId,
      librarianId,
      stockId,
      loanStartDate,
      loanDueDate,
      loanReturnDate,
      status
    })
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
    document.getElementById('loanForm').reset();
  })
  .catch(error => console.error('Error:', error));

  console.log('Préstamo creado:', {
      clientId: clientId,
      librarianId: librarianId,
      stockId: stockId,
      loanStartDate: loanStartDate,
      loanDueDate: loanDueDate,
      loanReturnDate: loanReturnDate,
      status: status
  });

  document.getElementById('loanForm').reset();
}

function createStock(event) {
  event.preventDefault();

  var status = document.getElementById('statusStock').value;
  var bookId = document.getElementById('bookId').value;
  var available = 1; // 1 = True. Esta disponible. 0 = False. No esta disponible.

  console.log(status)

  fetch('/createStock', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      status,
      bookId,
      available
    })
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
    document.getElementById('stockForm').reset();
  })
  .catch(error => console.error('Error:', error));

  document.getElementById('stockForm').reset();
}

function createFine(event) {
  event.preventDefault();

  var amountToPay = document.getElementById('amountToPay').value;
  var fineDate = document.getElementById('fineDate').value;
  var status = document.getElementById('status').value;
  var loanId = document.getElementById('loanId').value;

  fetch('/createFine', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      amountToPay,
      fineDate,
      status,
      loanId
    })
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
    document.getElementById('fineForm').reset();
  })
  .catch(error => console.error('Error:', error));

  console.log('Fine agregado:', {
      amountToPay: amountToPay,
      fineDate: fineDate,
      status: status,
      loanId: loanId
  });

  document.getElementById('fineForm').reset();
}

function logout() {
  window.location.href = 'Login.html'; // Redirige a Login.html
}

$(document).ready(function(){
  $('.gallery').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true
  });
});

function showImage() {
      document.getElementById("imageContainer").style.display = "block";
    }
n
function hideImage() {
      document.getElementById("imageContainer").style.display = "none";
    }

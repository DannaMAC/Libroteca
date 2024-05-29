const oracledb = require('oracledb');

var password = 'hr' 

async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
        user: "hr",
        password: password,
        connectString: "localhost:1521/xepdb1"
    });
    console.log('Conectado a la Base de Datos');
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close(); 
        console.log('Conexion cerrada exitosamente');
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

checkConnection();
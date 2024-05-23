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
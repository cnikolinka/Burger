const mysql = require("mysql");
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: null,
    database: "burgers_db",
    port: 3306
  });
}
connection.connect();
module.exports = connection;
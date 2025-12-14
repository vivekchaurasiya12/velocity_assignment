const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root123",
  port: 3307,
  database: "library_app",
});

const promisePool = pool.promise();

// Test the connection
promisePool.getConnection()
  .then((conn) => {
    console.log("MySQL Connected Successfully");
    conn.release(); // release the connection back to the pool
  })
  .catch((err) => {
    console.error("MySQL Connection Failed:", err.message);
  });

module.exports = promisePool;

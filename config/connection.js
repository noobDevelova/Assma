import mysql2 from "mysql2/promise";

const sql = mysql2;

const db = await sql.createConnection({
  host: "localhost",
  database: "db_assma",
  user: "root",
  password: "",
  port: 3306,
});

export default db;

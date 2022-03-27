const mysql = require("mysql");

//Connection pool
const connection = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

exports.updateDevice = (table, id, field, content) => {
    let sql = 'UPDATE ' + table + ' SET ' + field + ' = "' + content + '" WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) throw err;
    })
}
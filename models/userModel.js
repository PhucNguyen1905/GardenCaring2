const mysql = require("mysql");

//Connection pool
const connection = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


exports.getUserByEmail = (email) => {
    const promise = new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM user WHERE GMAIL = ?';
        connection.query(sql, email, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
    return promise;
}
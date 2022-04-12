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

exports.insertUser = (fname, lname, username, password, phone, address, adaname, adakey) => {
    let checkMail = 'SELECT * FROM user WHERE GMAIL = ?';
    connection.query(checkMail, [username], (err, results) => {
        if (err) throw err;
        if (results.length !== 0) {
            return false;
        } else {
            let sql = 'INSERT INTO user (ADAKEY, ADANAME, GMAIL, ADDRESS, FNAME, LNAME, PHONE, PASSWORD) VALUES(?,?,?,?,?,?,?,?)'
            connection.query(sql, [adakey, adaname, username, address, fname, lname, phone, password], (err, rows) => {
                if (err) throw err;
                return true;
            })
        }
    })
}
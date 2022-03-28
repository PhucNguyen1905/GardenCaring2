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

exports.updateChange = (deviceId, change) => {
    let sql = "INSERT INTO `update` (`DEVICEID`, `CHANGE`) VALUES (?, ?)";
    connection.query(sql, [Number(deviceId), String(change)], (err, data) => {
        if (err) throw err;
    })
}

exports.getDeviceByType = (deviceType) => {
    const promise = new Promise((resolve, reject) => {
        const sql = "SELECT * FROM device WHERE TYPE = ?";
        connection.query(sql, String(deviceType), (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
    })
    return promise;
}
const mysql = require("mysql");

//Connection pool
const connection = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

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

exports.submitLimit = (req, res) => {
    var sensor = 'Tempsen'
    var edge = 'UPLIMIT'
    var value = 0
    if (req.params.type == "uptemp") {
        value = req.body.upTemp
    } else if (req.params.type == "lowtemp") {
        value = req.body.lowTemp
        edge = 'LOWLIMIT'
    } else if (req.params.type == "upmoist") {
        value = req.body.upMoist
        sensor = 'Moistsen'
    } else if (req.params.type == "lowmoist") {
        value = req.body.lowMoist
        sensor = 'Moistsen'
        edge = 'LOWLIMIT'
    }
    let selectIDSql = 'SELECT `ID` FROM `DEVICE`, `SENSOR` WHERE `ID` = `SENSORID` AND `TYPE` = \'' + sensor + '\''
    let insertChangelimitSql = 'INSERT INTO `CHANGELIMIT`(`DEVICEID`,`TYPE`,`NEWVALUE`) VALUES (?, \'' + req.params.type + '\',?)'
    let updateSensorSql = 'UPDATE `SENSOR` SET ' + edge + ' = ? WHERE `SENSORID` = ?'
    let selectChangelimitSql = 'SELECT * FROM `CHANGELIMIT` ORDER BY `TIMEUPDATE` DESC LIMIT 5'
    let selectSensorSql = 'SELECT `UPLIMIT`, `LOWLIMIT` FROM `SENSOR`'
    
    connection.query(selectIDSql, (err, ids) => {
        if (!err) {
            connection.query(insertChangelimitSql,[ids[0].ID, value], (err, rows) => {
                if (!err) {
                    connection.query(updateSensorSql,[value, ids[0].ID], (err, rows) => {
                        if (!err) {
                            connection.query(selectChangelimitSql, (err, rows) => {
                                if (!err) {
                                    connection.query(selectSensorSql, (err, values) => {
                                        if (!err) {
                                            res.render('setlimitation', {
                                                values: values,
                                                rows: rows,
                                                alert: 'Update successfully!',
                                                convertTime
                                            });
                                        } else { console.log(err); }
                                    });
                                } else { console.log(err); }
                            });
                        } else { console.log(err); }
                    });
                } else { console.log(err); }
            });
        } else { console.log(err); }
    });
}

function convertTime(timeStr) {
    var date = new Date(timeStr);
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' + 
        ('00' + (date.getUTCHours()+7)).slice(-2) + ':' + 
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);
    return(date);
}

exports.viewLimit = (req, res, alert) => {
    let selectChangelimitSql = 'SELECT * FROM `CHANGELIMIT` ORDER BY `TIMEUPDATE` DESC LIMIT 5'
    let selectSensorSql = 'SELECT `UPLIMIT`, `LOWLIMIT` FROM `SENSOR`'
    connection.query(selectChangelimitSql, (err, rows) => {
        if (!err) {
            connection.query(selectSensorSql, (err, values) => {
                if (!err) {
                    res.render('setlimitation', {
                        values: values,
                        rows: rows,
                        alert: alert,
                        convertTime
                    });
                } else { console.log(err); }
            });
        } else { console.log(err); }
    });
}
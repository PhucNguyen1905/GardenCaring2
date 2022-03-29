const axios = require('axios');
const deviceModel = require('../models/deviceModel');

// Later we will get adaname through MySQL
let AIO_USERNAME = "PhucBKU"

const tempAPI = 'https://io.adafruit.com/api/v2/' + AIO_USERNAME + '/feeds/co3109-temp/data?limit=1';
const moistAPI = 'https://io.adafruit.com/api/v2/' + AIO_USERNAME + '/feeds/co3109-moisture/data?limit=1';
const lightAPI = 'https://io.adafruit.com/api/v2/' + AIO_USERNAME + '/feeds/co3109-light/data?limit=1';
const pumpAPI = 'https://io.adafruit.com/api/v2/' + AIO_USERNAME + '/feeds/co3109-pump/data?limit=1';
const domeAPI = 'https://io.adafruit.com/api/v2/' + AIO_USERNAME + '/feeds/co3109-dome/data?limit=1';


// Format time to time and date
function foramtTime(time) {
    time = time.slice(11, 19)
    let hour = parseInt(time.slice(0, 2))
    hour = hour + 7;
    if (hour >= 24) {
        hour = hour - 24;
    }
    time = time.replace(time.slice(0, 2), String(hour))
    return time
}

// View homepage
exports.viewIndex = (req, res) => {
    (async () => {

        try {
            const tempData = await axios.get(tempAPI)
                .then(function (res) {
                    let value = parseInt(res.data[0].value)
                    let time = foramtTime(res.data[0].created_at)
                    let date = res.data[0].created_at.slice(0, 10)
                    let data = []
                    data.push(value)
                    data.push(time)
                    data.push(date)
                    return data
                })
            const moistData = await axios.get(moistAPI)
                .then(function (res) {
                    let value = parseInt(res.data[0].value)
                    let time = foramtTime(res.data[0].created_at)
                    let date = res.data[0].created_at.slice(0, 10)
                    let data = []
                    data.push(value)
                    data.push(time)
                    data.push(date)
                    return data
                })
            res.render('index', {
                tempData: tempData,
                moistData: moistData
            });

        } catch (err) {
            console.log("Error!", err);
        }
    })()
}

// View Temperature analystic page
exports.viewTemp = (req, res) => {
    (async () => {

        try {
            const tempData = await axios.get(tempAPI)
                .then(function (res) {
                    let value = parseInt(res.data[0].value)
                    let time = foramtTime(res.data[0].created_at)
                    let date = res.data[0].created_at.slice(0, 10)
                    let data = []
                    data.push(value)
                    data.push(time)
                    data.push(date)
                    return data
                })

            res.render('temperature', {
                tempData: tempData
            });

        } catch (err) {
            console.log("Error!", err);
        }
    })()
}

// View Moisture analystic page
exports.viewMoist = (req, res) => {
    (async () => {

        try {
            const moistData = await axios.get(moistAPI)
                .then(function (res) {
                    let value = parseInt(res.data[0].value)
                    let time = foramtTime(res.data[0].created_at)
                    let date = res.data[0].created_at.slice(0, 10)
                    let data = []
                    data.push(value)
                    data.push(time)
                    data.push(date)
                    return data
                })

            res.render('moisture', {
                moistData: moistData
            });

        } catch (err) {
            console.log("Error!", err);
        }
    })()
}

// View Control Device page
exports.viewDevice = (req, res) => {
    (async () => {

        try {
            const lightData = await axios.get(lightAPI)
                .then(function (res) {
                    let value = parseInt(res.data[0].value)
                    let time = foramtTime(res.data[0].created_at)
                    let date = res.data[0].created_at.slice(0, 10)
                    let data = []
                    data.push(value)
                    data.push(time)
                    data.push(date)
                    return data
                })
            const pumpData = await axios.get(pumpAPI)
                .then(function (res) {
                    let value = parseInt(res.data[0].value)
                    let time = foramtTime(res.data[0].created_at)
                    let date = res.data[0].created_at.slice(0, 10)
                    let data = []
                    data.push(value)
                    data.push(time)
                    data.push(date)
                    return data
                })

            const domeData = await axios.get(domeAPI)
                .then(function (res) {
                    let value = parseInt(res.data[0].value)
                    let time = foramtTime(res.data[0].created_at)
                    let date = res.data[0].created_at.slice(0, 10)
                    let data = []
                    data.push(value)
                    data.push(time)
                    data.push(date)
                    return data
                })

            res.render('device', {
                lightData: lightData,
                pumpData: pumpData,
                domeData: domeData
            });
        } catch (err) {
            console.log("Error!", err);
        }
    })()

}

// View Set limit page
exports.viewLimit = (req, res) => {
    res.render('setlimitation');
}


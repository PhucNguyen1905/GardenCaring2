const axios = require('axios');
const deviceModel = require('../models/deviceModel');

// Later we will get adaname through MySQL
let AIO_USERNAME = "PhucBKU"

const tempAPI = 'https://io.adafruit.com/api/v2/' + AIO_USERNAME + '/feeds/co3109-temp/data?limit=20';
const moistAPI = 'https://io.adafruit.com/api/v2/' + AIO_USERNAME + '/feeds/co3109-moisture/data?limit=20';
const lightAPI = 'https://io.adafruit.com/api/v2/' + AIO_USERNAME + '/feeds/co3109-light/data?limit=3';
const pumpAPI = 'https://io.adafruit.com/api/v2/' + AIO_USERNAME + '/feeds/co3109-pump/data?limit=3';
const domeAPI = 'https://io.adafruit.com/api/v2/' + AIO_USERNAME + '/feeds/co3109-dome/data?limit=3';


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

//get newset recent update
function sortData(lightData, pumpData, domeData){
    const arr = [...lightData, ...pumpData, ...domeData];
    for (let i = 0; i < arr.length; i++) {
        const data1 = arr[i];
        const time1 = new Date(data1.date + "T" + data1.time);
        for (let j = i+1; j < arr.length; j++) {
            const data2 = arr[j];
            const time2 = new Date(data2.date + "T" + data2.time);
            if(time2.getTime() > time1.getTime()){
                const tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr;
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
                const lightData = await axios.get(lightAPI)
                .then(function (res) {
                    let data = [];
                    for (let index = 0; index < res.data.length; index++) {
                        const datares = res.data[index];
                        let value = parseInt(datares.value);
                        let time = foramtTime(datares.created_at);
                        let date = datares.created_at.slice(0, 10);
                        const dataPiece = {
                            value: value,
                            time: time,
                            date: date,
                            type: "Light"
                        };
                        data.push(dataPiece);
                    }
                    return data;
                })
                const pumpData = await axios.get(pumpAPI)
                .then(function (res) {
                    let data = [];
                    for (let index = 0; index < res.data.length; index++) {
                        const datares = res.data[index];
                        let value = parseInt(datares.value);
                        let time = foramtTime(datares.created_at);
                        let date = datares.created_at.slice(0, 10);
                        const dataPiece = {
                            value: value,
                            time: time,
                            date: date,
                            type: "Pump"
                        };
                        data.push(dataPiece);
                    }
                    return data;
                })
                const domeData = await axios.get(domeAPI)
                .then(function (res) {
                    let data = [];
                    for (let index = 0; index < res.data.length; index++) {
                        const datares = res.data[index];
                        let value = parseInt(datares.value);
                        let time = foramtTime(datares.created_at);
                        let date = datares.created_at.slice(0, 10);
                        const dataPiece = {
                            value: value,
                            time: time,
                            date: date,
                            type: "Dome"
                        };
                        data.push(dataPiece);
                    }
                    return data;
                })
                const outputData = sortData(lightData, pumpData, domeData);

                const avgTempData = await axios.get(tempAPI)
            .then(function (res) {
                let data = 0;
                for (let index = 0; index < res.data.length; index++) {
                    const datares = res.data[index];
                    data = data + Number(datares.value);
                }
                data = (data) / res.data.length;
                data = Number(data.toFixed(1))
                return data;
            })

            const avgMoiseData = await axios.get(domeAPI)
            .then(function (res) {
                let data = 0;
                for (let index = 0; index < res.data.length; index++) {
                    const datares = res.data[index];
                    data = data + datares.value;
                }
                data = (data) / res.data.length;
                data = Number(data.toFixed(1));
                return data;
            })

            res.render('index', {
                tempData: tempData,
                moistData: moistData,
                outputData: outputData,
                avgMoise: avgMoiseData,
                avgTemp: avgTempData
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
                    let avg10 = 0;
                    let avg20 = 0;
                    let data = [];
                    for (let i = 0; i < res.data.length; i++) {
                        const piece = res.data[i];
                        let value = parseInt(piece.value)
                        let time = foramtTime(piece.created_at)
                        let date = piece.created_at.slice(0, 10)
                        const tmp = {
                            value: value,
                            time: time,
                            date: date
                        };
                        data.push(tmp);
                        avg10 = (i < 10) ? avg10 + value : avg10 + 0;
                        avg20 += value;
                    }
                    avg10 = avg10 / 10;
                    avg20 = avg20 / 20;
                    
                    const result =  {
                        data: data,
                        avg10: avg10,
                        avg20: avg20
                    }
                    return result;
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
                let avg10 = 0;
                let avg20 = 0;
                let data = [];
                for (let i = 0; i < res.data.length; i++) {
                    const piece = res.data[i];
                    let value = parseInt(piece.value)
                    let time = foramtTime(piece.created_at)
                    let date = piece.created_at.slice(0, 10)
                    const tmp = {
                        value: value,
                        time: time,
                        date: date
                    };
                    data.push(tmp);
                    avg10 = (i < 10) ? avg10 + value : avg10 + 0;
                    avg20 += value;
                }
                avg10 = avg10 / 10;
                avg20 = avg20 / 20;
                
                const result =  {
                    data: data,
                    avg10: avg10,
                    avg20: avg20
                }
                console.log(result);
                return result;
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
                domeData: domeData,
                updateDevice: deviceModel.updateDevice
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

exports.getTemp20 = (req, res) => {
    (async () => {

        try {
            const tempData = await axios.get(tempAPI)
                .then(function (res) {
                    let data = [];
                    for (let i = 0; i < res.data.length; i++) {
                        const piece = res.data[i];
                        let value = parseInt(piece.value)
                        let time = foramtTime(piece.created_at)
                        let date = piece.created_at.slice(0, 10)
                        const tmp = {
                            value: value,
                            time: time,
                            date: date
                        };
                        data.push(tmp);
                    }
                    return data;
                })

            res.send(JSON.stringify(tempData));

        } catch (err) {
            console.log("Error!", err);
        }
    })()
}

exports.getMoist20 = (req, res) => {
    (async () => {

        try {
            const moistData = await axios.get(moistAPI)
                .then(function (res) {
                    let data = [];
                    for (let i = 0; i < res.data.length; i++) {
                        const piece = res.data[i];
                        let value = parseInt(piece.value)
                        let time = foramtTime(piece.created_at)
                        let date = piece.created_at.slice(0, 10)
                        const tmp = {
                            value: value,
                            time: time,
                            date: date
                        };
                        data.push(tmp);
                    }
                    return data;
                })

            res.send(JSON.stringify(moistData));

        } catch (err) {
            console.log("Error!", err);
        }
    })()
}
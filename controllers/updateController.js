const db = require('../models/deviceModel');

const update = (req, res)=>{
    const {DEVICEID, CHANGE} = req.body;
    try {
        db.updateChange(DEVICEID, CHANGE);
        res.json({message: "Update change success"});
    } catch (error) {
        res.json({message: error.message});
    }
}

const updateAll = async (req, res)=>{
    const {DEVICETYPE, CHANGE} = req.body;
    try {
        const listDevice = await db.getDeviceByType(DEVICETYPE);
        for (let index = 0; index < listDevice.length; index++) {
            const device = listDevice[index];
            db.updateChange(device.ID, CHANGE);
        }
        res.json({message: "update success"});
    } catch (error) {
        res.json({message: error.message});
    }
}


module.exports = {
    update,
    updateAll
}

// View homepage
exports.viewIndex = (req, res) => {
    res.render('index');
}

// View Temperature analystic page
exports.viewTemp = (req, res) => {
    res.render('temperature');
}

// View Moisture analystic page
exports.viewMoist = (req, res) => {
    res.render('moisture');
}

// View Control Device page
exports.viewDevice = (req, res) => {
    res.render('device');
}

// View Set limit page
exports.viewLimit = (req, res) => {
    res.render('setlimitation');
}


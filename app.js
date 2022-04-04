const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// For authentication
const passport = require('passport');
const session = require('express-session');

require("dotenv").config();
const app = express();

// Config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));


// Express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))
// Passport config
require('./config/passport')(passport);
// Passport middlware
app.use(passport.initialize());
app.use(passport.session());



app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
})



// Router
const userRoute = require('./routes/user');

app.use('/', userRoute);
app.get('/test', (req, res) => {
    res.render('test')
})

let port = process.env.PORT || 8080;

let server = app.listen(port, () => {
    console.log("Running on port: " + port);
    console.log("http://localhost:8080");
});

// Socket.io section
const io = require('socket.io')(server);
io.on('connection', client => {
    console.log('New connection: ' + client.id);

    // Get request from client and send to gateway
    client.on('Client-control-light', data => {
        io.sockets.emit('Server-control-light', data)
    });
    client.on('Client-control-pump', data => {
        io.sockets.emit('Server-control-pump', data)
    });
    client.on('Client-control-dome', data => {
        io.sockets.emit('Server-control-dome', data)
    });

    // Get new data from gateway and update in page
    client.on('Gateway-send-temp', data => {
        io.sockets.emit('Server-send-temp-data', data)
    })
    client.on('Gateway-send-moist', data => {
        io.sockets.emit('Server-send-moist-data', data)
    })

    client.on('disconnect', () => {
        console.log(client.id + ' disconnected!')
    });
});
// Socket.io section
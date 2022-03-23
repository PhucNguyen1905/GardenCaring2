const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

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



// Router
const userRoute = require('./routes/user');

app.use('/', userRoute);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Running on port: " + port);
    console.log("http://localhost:8080");
});

// import express module
const express = require('express');

// import express-handlebars
const { engine } = require('express-handlebars');

// import config.json
const config = require('./config.json');

// import mysql2 moduule
const mysql = require('mysql2');

// app
const app = express();

// add bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

// add custom css
app.use('/css', express.static('./css'));

// express-handlebars config
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// use json data 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mysql connection config
const connection = mysql.createConnection(config.db);

// connection test
connection.connect((err) => {
    if (err) throw err;
    console.log('successfully connected!');
});

// main route
app.get('/', (req, res) => {
    res.render('forms');
});

// add product route
app.post('/cadastrar', (req, res) => {
    console.log(req.body);
    res.end();
})

// server
app.listen(8080, () => {
    console.log('server running on http://localhost:8080');
});
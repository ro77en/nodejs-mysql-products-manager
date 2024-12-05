// import express module
const express = require('express');

// import config.json
const config = require('./config.json');

// import mysql2 moduule
const mysql = require('mysql2');

// app
const app = express();

// mysql connection config
const connection = mysql.createConnection(config.db);

// connection test
connection.connect((err) => {
    if (err) throw err;
    console.log('successfully connected!');
});

// hello world route
app.get('/', (req, res) => {
    res.write('hello world');
    res.end();
});

// server
app.listen(8080, () => {
    console.log('server running...');
});
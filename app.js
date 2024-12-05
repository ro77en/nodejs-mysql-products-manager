// import express module
const express = require('express');

// app
const app = express();

// hello world route
app.get('/', (req, res) => {
    res.write('hello world');
    res.end();
});

// server
app.listen(8080, () => {
    console.log('server running...');
});
// import express module
const express = require('express');

// fileupload module
const fileUpload = require('express-fileupload');

// import express-handlebars
const { engine } = require('express-handlebars');

// import config.json
const config = require('./config.json');

// import mysql2 moduule
const mysql = require('mysql2');

// app
const app = express();

// use express-fileupload
app.use(fileUpload());

// add bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

// add custom css
app.use('/css', express.static('./css'));

// use img folder
app.use('/img', express.static('./img'));

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
    // SQL query
    let sql = 'SELECT * FROM produtos';
    connection.query(sql, (err, response) => {
        if (err) throw err;
        res.render('forms', {productsData: response});
    })
});

// add product route
app.post('/cadastrar', (req, res) => {
    // get product data
    let nome = req.body.nome;
    let valor = req.body.valor;
    let imagem = req.files.imagem.name;

    // sql query
    let sql = `INSERT INTO produtos (nome, valor, imagem) VALUES ('${nome}', ${valor}, '${imagem}')`;
    connection.query(sql, (err, response) => {
        // Error
        if (err) throw err;
        // Success
        req.files.imagem.mv(__dirname + '/img/' + req.files.imagem.name);
        console.log(response);
    });

    // redirect
    res.redirect('/');
})

// remove product
app.get('/remover/:codigo&:imagem', (req, res) => {
    console.log(req.params.codigo);
    console.log(req.params.imagem);
    res.end();
})

// server
app.listen(8080, () => {
    console.log('server running on http://localhost:8080');
});
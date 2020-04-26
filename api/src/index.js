/*
// 1. Importar pacotes/bibliotecas
const express = require('express');
const mysql = require('mysql');

// 2. Instanciar pacotes/bibliotecas
const app = express();

// 4. Criar ima conexão com o banco
const connection = mysql.createConnection({
    host: '172.17.0.2',
    user: 'usr_teste',
    password: 'usrteste',
    database: 'db_teste'
});

// 5. Estabelecer uma conexão
connection.connect();
*/

/*
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query('SELECT * FROM products', function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  });
*/

/*
// 6. Criar uma rota, para responder qdo. digitar '<endereço>/products'
app.get('/products', function(req, res) {
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) {
            throw error
        };

        res.send(results.map(item => ({ name: item.name, price: item.price })));
        //res.send(results);
        //connection.end();
    });
});
*/
//connection.end();

/* Teste de envio
app.get('/products', function(req, res) {
    res.send('Hello Teste!');
});
*/

/*
// 3. Informar a Porta que a palicação estará ouvindo e respondendo
app.listen(9001, '0.0.0.0', function() {
    console.log('Listening on Port 9001');
});
*/

// 1. Importar pacotes/bibliotecas
const express = require('express');
const mysql = require('mysql');

// 2. Instanciar pacotes/bibliotecas
const app = express();

// 4. Criar ima conexão com o banco
const connection = mysql.createConnection({
  host: 'mysql-ctr',
  user: 'usr_teste',
  password: 'usrteste',
  database: 'db_teste'
});

// 5. Estabelecer uma conexão
connection.connect();

// 6. Criar uma rota, para responder qdo. digitar '<endereço>/products'
app.get('/products', function(req, res) {
  connection.query('SELECT * FROM products', function (error, results) {

    if (error) { 
      throw error
    };

    res.send(results.map(item => ({ name: item.name, price: item.price })));
  });
});

// 3. Informar a Porta que a palicação estará ouvindo e respondendo
app.listen(9001, '0.0.0.0', function() {
  console.log('Listening on port 9001');
})

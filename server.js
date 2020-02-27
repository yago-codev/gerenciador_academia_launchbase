const express = require('express');
const nunjucks = require('nunjucks');

const routes = require('./routes');

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(routes);

server.set('view engine', 'njk');

nunjucks.configure('views', {
  express: server,
  autoescape: false, // vai permitir a inclusão de HTML dentro do njk
  noCache: true // desabilitando o cache do njk
});

server.listen(5000, function() {
  console.log('Servidor rodando');
});
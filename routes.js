const express = require('express');
const routes = express.Router();
const instrutores = require('./instrutores');

routes.get('/', (req, res) => {
  return res.redirect('/instrutores');
});

routes.get('/instrutores', (req, res) => {
  return res.render('instrutores/index');
});

routes.get('/instrutores/registro', (req, res) => {
  return res.render('instrutores/create');
});

routes.get('/instrutores/:id', instrutores.show);

routes.get('/instrutores/:id/editar', instrutores.edit);

routes.post('/instrutores', instrutores.post);

routes.get('/membros', (req, res) => {
  return res.send('/membros');
});

module.exports = routes;
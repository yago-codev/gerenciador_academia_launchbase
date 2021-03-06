const express = require('express');
const routes = express.Router();
const instrutores = require('./app/controllers/instrutores');
const membros = require('./app/controllers/membros');

// instrutores

routes.get('/', (req, res) => {
  return res.redirect('/instrutores')
});

routes.get('/instrutores', instrutores.index);
routes.get('/instrutores/criar', instrutores.create);
routes.get('/instrutores/:id', instrutores.show);
routes.get('/instrutores/:id/editar', instrutores.edit);
routes.post('/instrutores', instrutores.post);
routes.put('/instrutores', instrutores.put);
routes.delete('/instrutores', instrutores.delete);
routes.get('/instrutores', instrutores.index);


// membros
routes.get('/membros', membros.index);
routes.get('/membros/criar', membros.create);
routes.get('/membros/:id', membros.show);
routes.get('/membros/:id/editar', membros.edit);
routes.post('/membros', membros.post);
routes.put('/membros', membros.put);
routes.delete('/membros', membros.delete);
routes.get('/membros', membros.index);

module.exports = routes;
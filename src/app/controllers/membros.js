const { idade, dataNascimento } = require('../lib/utils');

module.exports = {
  index(req, res) {
    return res.render('membros/index');
  },
  create(req, res) {
    return res.render('membros/create');
  },
  post(req, res) {
    // vai criar um array com as chaves do objeto que é retornado por cada campo do form
    const keys = Object.keys(req.body); // resultado = ["avatar_url","nome","nascimento","genero","servicos"]
  
    for (key of keys) {
      if (req.body[key] == '') return res.send('Por favor, preencha todos os campos!');
    }
    
    return

  },
  show(req, res) {
    return
  },
  edit(req, res) {
    return
  },
  put(req, res) {
    // vai criar um array com as chaves do objeto que é retornado por cada campo do form
    const keys = Object.keys(req.body); // resultado = ["avatar_url","nome","nascimento","genero","servicos"]

    for (key of keys) {
      if (req.body[key] == '') return res.send('Por favor, preencha todos os campos!');
    }
    
    return
  },
  delete(req, res) {
    return
  }
}
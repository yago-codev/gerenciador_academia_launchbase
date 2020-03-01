const { idade, dataNascimento } = require('../lib/utils');

module.exports = {
  index(req, res) {
    return res.render('instrutores/index');
  },
  create(req, res) {
    return res.render('instrutores/create');
  },
  post(req, res) {
    // vai criar um array com as chaves do objeto que é retornado por cada campo do form
    const keys = Object.keys(req.body); // resultado = ["avatar_url","nome","nascimento","genero","servicos"]
  
    for (key of keys) {
      if (req.body[key] == '') return res.send('Por favor, preencha todos os campos!');
    }
    
    let { avatar_url, nascimento, nome, servicos, genero } = req.body;
    
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
    
    let { avatar_url, nascimento, nome, servicos, genero } = req.body;
    
    return
  },
  delete(req, res) {
    return
  }
}
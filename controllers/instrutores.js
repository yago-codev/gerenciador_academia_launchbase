const fs = require('fs');
const data = require('../data.json');
const { idade, dataNascimento } = require('../utils');

// index
exports.index = (req, res) => {
  return res.render('instrutores/index', { instrutores: data.instrutores });
}

// create 
exports.create = (req, res) => {
  return res.render('instrutores/create');
}

exports.post = (req, res) => {
  // vai criar um array com as chaves do objeto que é retornado por cada campo do form
  const keys = Object.keys(req.body); // resultado = ["avatar_url","nome","nascimento","genero","servicos"]

  for (key of keys) {
    if (req.body[key] == '') return res.send('Por favor, preencha todos os campos!');
  }
  
  let { avatar_url, nascimento, nome, servicos, genero } = req.body;
  
  nascimento = Date.parse(nascimento);
  const data_registro = Date.now(); // criando um campo no corpo da requisição para pegar a data em que o registro ocorreu
  const id = Number(data.instrutores.length + 1);


  data.instrutores.push({
    avatar_url,
    nome,
    nascimento,
    data_registro,
    servicos,
    genero,
    id
  }); // inserindo os dados do formulário dentro do array do arquivo data.json

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Ocorreu um erro ao tentar gravar o arquivo!');

    return res.redirect('/instrutores');
  });

  // return res.send(req.body);
}

// read
exports.show = (req, res) => {
  const { id } = req.params;

  const foundInstructor = data.instrutores.find((instrutor) => {
    return id == instrutor.id;
  });

  if (!foundInstructor) return res.send('Instrutor não encontrado!');

  const instrutor = {
    ...foundInstructor,
    idade: idade(foundInstructor.nascimento),
    servicos: foundInstructor.servicos.split(','),
    data_registro: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.data_registro)
  }

  return res.render('instrutores/show', { instrutor });
}

// update ... método para retornar os dados dos instrutores dentro do form de edição
exports.edit = (req, res) => {
  const { id } = req.params;
  
  const foundInstructor = data.instrutores.find((instrutor) => {
    return id == instrutor.id;
  });
  
  if (!foundInstructor) return res.send('Instrutor não encontrado!');

  // const instrutor = {
  //   ...foundInstructor,
  //   nascimento: new Date(foundInstructor.nascimento).toLocaleDateString('pt-BR', {
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: 'numeric',
  //     timeZone: 'UTC'
  //   }),
  //   servicos: foundInstructor.servicos.split(','),
  // }

  const instrutor = {
    ...foundInstructor,
    nascimento: dataNascimento(foundInstructor.nascimento),
  }

  return res.render('instrutores/edit', { instrutor });
}

// update ... método para enviar os dados do form, atualizando os registros do instrutor
exports.put = (req, res) => {
  const { id } = req.body; // capturando o id presente na url
  let index = 0;

  const foundInstructor = data.instrutores.find((instrutor, foundIndex) => {
    if (id == instrutor.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundInstructor) return res.send('Instrutor não encontrado!');

  const instrutor = {
    ...foundInstructor,
    ...req.body,
    nascimento: Date.parse(req.body.nascimento), // fazendo o parse da data de nascimento para o formato timestamp
    id: Number(req.body.id),
  }

  // buscando o id do usuário a ser editado dentro do arquivo data.json
  // como o id do usuário está contido em um array, iremos acessar o índice exato do usuário através do id que pegamos no req.body
  // estamos subtraindo -1 do valor do id porque um array sempre começa na posição 0, por exemplo:
  // { instrutores: [ { id: 1 }] };
  data.instrutores[index] = instrutor;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Não foi possível gravar o arquivo!');

    return res.redirect(`/instrutores/${id}`);
  });
}

// delete
exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredInstructors = data.instrutores.filter((instrutor) => instrutor.id != id);

  data.instrutores = filteredInstructors;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Não foi possível gravar o arquivo!');

    return res.redirect('/instrutores');
  });
}
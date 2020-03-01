const fs = require('fs');
const data = require('../data.json');
const { dataNascimento } = require('../utils');

// index
exports.index = (req, res) => {
  return res.render('membros/index', { membros: data.membros });
}

// create 
exports.create = (req, res) => {
  return res.render('membros/create');
}

exports.post = (req, res) => {
  // vai criar um array com as chaves do objeto que é retornado por cada campo do form
  const keys = Object.keys(req.body); // resultado = ["avatar_url","nome","nascimento","genero","servicos"]

  for (key of keys) {
    if (req.body[key] == '') return res.send('Por favor, preencha todos os campos!');
  }
  
  nascimento = Date.parse(req.body.nascimento);

  let id = 1;
  const lastMember = data.membros[data.membros.length - 1];
  
  if (lastMember) {
    id = lastMember.id + 1;
  }


  data.membros.push({
    ...req.body,
    id,
    nascimento
  }); // inserindo os dados do formulário dentro do array do arquivo data.json

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Ocorreu um erro ao tentar gravar o arquivo!');

    return res.redirect(`/membros/${id}`);
  });

  // return res.send(req.body);
}

// read
exports.show = (req, res) => {
  const { id } = req.params;

  const foundMember = data.membros.find((membro) => {
    return id == membro.id;
  });

  if (!foundMember) return res.send('Membro não encontrado!');

  const membro = {
    ...foundMember,
    nascimento: dataNascimento(foundMember.nascimento).aniversario,
  }

  return res.render('membros/show', { membro });
}

// update ... método para retornar os dados dos membros dentro do form de edição
exports.edit = (req, res) => {
  const { id } = req.params;
  
  const foundMember = data.membros.find((membro) => {
    return id == membro.id;
  });
  
  if (!foundMember) return res.send('Membro não encontrado!');

  // const membro = {
  //   ...foundMember,
  //   nascimento: new Date(foundMember.nascimento).toLocaleDateString('pt-BR', {
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: 'numeric',
  //     timeZone: 'UTC'
  //   }),
  //   servicos: foundMember.servicos.split(','),
  // }

  const membro = {
    ...foundMember,
    nascimento: dataNascimento(foundMember.nascimento).iso,
  }

  return res.render('membros/edit', { membro });
}

// update ... método para enviar os dados do form, atualizando os registros do membro
exports.put = (req, res) => {
  const { id } = req.body; // capturando o id presente na url
  let index = 0;

  const foundMember = data.membros.find((membro, foundIndex) => {
    if (id == membro.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundMember) return res.send('Membro não encontrado!');

  const membro = {
    ...foundMember,
    ...req.body,
    nascimento: Date.parse(req.body.nascimento), // fazendo o parse da data de nascimento para o formato timestamp
    id: Number(req.body.id),
  }

  // buscando o id do usuário a ser editado dentro do arquivo data.json
  // como o id do usuário está contido em um array, iremos acessar o índice exato do usuário através do id que pegamos no req.body
  // estamos subtraindo -1 do valor do id porque um array sempre começa na posição 0, por exemplo:
  // { membros: [ { id: 1 }] };
  data.membros[index] = membro;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Não foi possível gravar o arquivo!');

    return res.redirect(`/membros/${id}`);
  });
}

// delete
exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredMembers = data.membros.filter((membro) => membro.id != id);

  data.membros = filteredMembers;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Não foi possível gravar o arquivo!');

    return res.redirect('/membros');
  });
}
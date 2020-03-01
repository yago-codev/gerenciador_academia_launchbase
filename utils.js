module.exports = {
  idade: function(timestamp) {
    const dataAtual = new Date();
    const dataAniversario = new Date(timestamp);
  
    let idade = dataAtual.getFullYear() - dataAniversario.getFullYear();
    const mes = dataAtual.getMonth() - dataAniversario.getMonth();
  
    if (mes < 0 || mes == 0 && dataAtual.getDate() <= dataAniversario.getDate()) {
      idade = idade - 1;
    }
  
    return idade;
  },
  dataNascimento: function(timestamp) {
    const data = new Date(timestamp);

    const ano = data.getUTCFullYear();

    const mes = `0${ data.getUTCMonth() + 1 }`.slice(-2); // o mês é retornado de 0(jan) a 11(dez), portanto adicionamos +1 pra formatar os dados.

    const dia = `0${ data.getUTCDate() }`.slice(-2); // retorna os dias do mês, de 1 a 31.UTC

    return {
      dia,
      mes,
      ano,
      iso: `${ano}-${mes}-${dia}`,
      aniversario: `${dia}/${mes}`
    }
  }
}
function validarModelo(modelo) {
  const verificarModelo = modelo?.trim();

  if (!verificarModelo) {
    return { valido: false, campo: "modelo", mensagem: "campo obrigatorio" };
  }

  if (verificarModelo.length < 2) {
    return { valido: false, campo: "modelo", mensagem: "modelo invalido" };
  }

  if (!/^[A-Za-zÀ-ÿ0-9\s\.-]+$/.test(verificarModelo)) {
    return { valido: false, campo: "modelo", mensagem: "modelo invalido" };
  }

  return { valido: true, valor: verificarModelo };
}

function validarPrecoDiaria(preco) {
  const verificarPreco = preco;

  if (!verificarPreco) {
    return {
      valido: false,
      campo: "PrecoDiaria",
      mensagem: "campo o brigatorio",
    };
  }

  if (isNaN(verificarPreco)) {
    return { valido: false, campo: "PrecoDiaria", mensagem: "preço invalido" };
  }

  if (verificarPreco <= 0) {
    return {
      valido: false,
      campo: "PrecoDiaria",
      mensagem: "Preço deve ser maior que 0",
    };
  }

  return { valido: true, valor: parseFloat(verificarPreco) };
}

function validarData(ano) {
  const anoAtual = new Date().getFullYear();
  const verificarData = ano;

  if (!verificarData) {
    return { valido: false, campo: "ano", mensagem: "Campo obrigatorio" };
  }

  const converterData = parseInt(verificarData);

  if (isNaN(converterData)) {
    return { valido: false, campo: "ano", mensagem: "Data invalida" };
  }

  if (converterData < 1886 || converterData > anoAtual) {
    return { valido: false, campo: "ano", mensagem: "Data invalida" };
  }

  return { valido: true, valor: converterData };
}

function validarDisponibilidade(disponivel) {
  const disponibilidade = disponivel?.trim();

  if (!disponibilidade) {
    return {
      valido: false,
      campo: "disponibilidade",
      mensagem: "Campo obrigatorio",
    };
  }

  if (disponibilidade != "True" && disponibilidade != "False") {
    return {
      valido: false,
      campo: "disponibilidade",
      mensagem: "Disponibilidade invalida",
    };
  }

  return { valido: true, valor: disponibilidade };
}

async function validarDados(dados) {
  const erros = [];
  const dadosValidos = {};

  // Validar modelo
  const resultadoModelo = validarModelo(dados.modelo);
  if (!resultadoModelo.valido) {
    erros.push(resultadoModelo);
  } else {
    dadosValidos.modelo = resultadoModelo.valor;
  }

  // Validar preço
  const resultadoPreco = validarPrecoDiaria(dados.preco);
  if (!resultadoPreco.valido) {
    erros.push(resultadoPreco);
  } else {
    dadosValidos.preco = resultadoPreco.valor;
  }

  // Validar ano
  const resultadoAno = validarData(dados.ano);
  if (!resultadoAno.valido) {
    erros.push(resultadoAno);
  } else {
    dadosValidos.ano = resultadoAno.valor;
  }

  // Validar disponibilidade
  const resultadoDisponibilidade = validarDisponibilidade(dados.disponivel);
  if (!resultadoDisponibilidade.valido) {
    erros.push(resultadoDisponibilidade);
  } else {
    dadosValidos.disponibilidade = resultadoDisponibilidade.valor;
  }

  // Retornar resultado
  if (erros.length > 0) {
    return {
      valido: false,
      erros: erros,
    };
  }

  return {
    valido: true,
    dados: dadosValidos,
  };
}

module.exports = { validarDados };

function validarCategoria(categoria) {
  if (!categoria) {
    return { valido: false, campo: "categoria", mensagem: "campo obrigatorio" };
  }

  if (categoria.length < 2 || !/^[A-Za-zÀ-ÿ0-9\s\.-]+$/.test(categoria)) {
    return {
      valido: false,
      campo: "categoria",
      mensagem: "categoria invalida",
    };
  }

  return { valido: true, valor: categoria };
}

function validarId(id) {
  if (!id || id != parseInt(id) || id < 0) {
    return { valido: false, campo: "id", mensagem: "Id invalido" };
  }

  return { valido: true, valor: id };
}

module.exports = { validarCategoria, validarId };

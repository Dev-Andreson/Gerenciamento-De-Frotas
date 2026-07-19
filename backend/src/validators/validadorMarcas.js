function validarMarca(marca) {
  if (!marca) {
    return { valido: false, campo: "marca", mensagem: "campo obrigatorio" };
  }

  if (marca.length < 2 || !/^[A-Za-zÀ-ÿ0-9\s\.-]+$/.test(marca)) {
    return {
      valido: false,
      campo: "marca",
      mensagem: "marca invalida",
    };
  }

  return { valido: true, valor: marca };
}

function validarId(id) {
  if (!id || id != parseInt(id) || id < 0) {
    return { valido: false, campo: "id", mensagem: "Id invalido" };
  }

  return { valido: true, valor: id };
}

module.exports = { validarMarca, validarId };
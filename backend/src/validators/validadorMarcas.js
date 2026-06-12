function validarMarca(marca) {

  if (!marca) {
    return { valido: false, campo: "marca", mensagem: "campo obrigatorio" };
  }

  if (marca.length < 2 || !/^[A-Za-zÀ-ÿ0-9\s\.-]+$/.test(marca)) {
    return { valido: false, campo: "marca", mensagem: "marca invalida" };
  }

  return { valido: true, valor: marca };
}

module.exports = { validarMarca };

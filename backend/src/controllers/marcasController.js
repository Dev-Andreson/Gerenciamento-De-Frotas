const model = require("../model/marcasModel");
const validador = require("../validators/validadorMarcas");

async function criar(req, res) {
  try {
    const { nome } = req.body;

    const validacao = validador.validarMarca(nome);

    if (!validacao.valido) {
      return res.status(400).json(validacao);
    }

    const marca = await model.criar_marca(validacao.valor);
    res.status(201).json({ mensagem: "Marca cadastrada" });
  } catch (error) {
    console.error("Erro ao criar marca", error);
    if (error.code === "23505") {
      return res.status(500).json({ erro: "Marca já existe" });
    }
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function listar(req, res) {
  try {
    const marca = await model.listar_marcas();
    if (!marca || marca.length === 0) {
      return res.status(400).json({ erro: "Lista de marcas vazia" });
    }
    res.status(200).json(marca);
  } catch (error) {
    console.error("Erro ao listar marcas", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function listar_por_nome(req, res) {
  try {
    const { nome } = req.query;

    const validacao = validador.validarMarca(nome);

    if (!validacao.valido) {
      return res.status(400).json(validacao);
    }

    const marca = await model.listar_marcas_nome(validacao.valor);

    res.status(200).json(marca);
  } catch (error) {
    console.error("Erro ao listar marcas", error);

    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function listar_por_id(req, res) {
  const id = req.params.id;

  const marca = await model.listar_marcas_id(id);
  res.status(200).json(marca);
}

async function alterar(req, res) {
  const id = req.params.id;
  const { nome } = req.body;

  const marca = await model.alterar_marca(id, nome);
  res.status(200).json({ mensagem: "Marca alterada" });
}

async function deletar(req, res) {
  const id = req.params.id;

  const marca = await model.deletar_marca(id);
  res.status(200).json({ mensagem: "Marca excluiada" });
}

module.exports = {
  criar,
  listar,
  listar_por_nome,
  listar_por_id,
  alterar,
  deletar,
};

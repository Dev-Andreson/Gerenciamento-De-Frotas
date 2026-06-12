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

    if (!marca) {
      return res.status(400).json({ erro: "Nenhuma marca encontrada" });
    }
    if (marca.length === 0) {
      return res.status(200).json({ erro: "Lista de marcas vazia" });
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

    if (!marca) {
      return res.status(400).json({ erro: "Marca indefinida" });
    }
    if (marca.length === 0) {
      return res.status(200).json({ erro: "Nenhuma marca encontrada" });
    }

    res.status(200).json(marca);
  } catch (error) {
    console.error("Erro ao listar marcas", error);

    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function listar_por_id(req, res) {
  try {
    const id = req.params.id;

    const marca = await model.listar_marcas_id(id);

    if (!marca) {
      return res.status(400).json({ erro: "Marca indefinida" });
    }
    if (marca.length === 0) {
      return res.status(200).json({ erro: "Marca não encontrada" });
    }

    res.status(200).json(marca);
  } catch (error) {
    console.error("Erro ao listar marca", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function alterar(req, res) {
  try {
    const id = req.params.id;
    const { nome } = req.body;

    const validarId = validador.validarId(id);

    if (!validarId.valido) {
      return res.status(400).json(validarId);
    }

    const validarMarca = validador.validarMarca(nome);

    if (!validarMarca.valido) {
      return res.status(400).json(validarMarca);
    }

    const marca = await model.listar_marcas_id(id);

    if (!marca) {
      return res.status(400).json({ erro: "Marca indefinida" });
    }
    if (marca.length === 0) {
      return res
        .status(200)
        .json({ erro: "Nenhuma marca encontrada com esse id" });
    }

    const alterMarca = await model.alterar_marca(id, nome);

    res.status(200).json({ mensagem: "Marca alterada" });
  } catch (error) {
    console.error("Erro ao alterar marca", error);
    if (error.code === "23505") {
      return res.status(500).json({ erro: "Marca já existe" });
    }
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function deletar(req, res) {
  try {
    const id = req.params.id;

    const validarId = validador.validarId(id);

    if (!validarId.valido) {
      return res.status(400).json(validarId);
    }

    const marca = await model.listar_marcas_id(id)

    if(!marca){
      return res.status(400).json({erro: "Marca indefinida"})
    }
    if(marca.length === 0){
      return res.status(200).json({erro: "Nenhuma marca encontrada com esse id"})
    }

    const marca = await model.deletar_marca(id);
    res.status(200).json({ mensagem: "Marca excluiada" });
  } catch (error) {
    console.error("Erro ao deletar marca", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

module.exports = {
  criar,
  listar,
  listar_por_nome,
  listar_por_id,
  alterar,
  deletar,
};

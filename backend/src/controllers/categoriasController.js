const model = require("../model/categoriasModel");
const validador = require("../validators/validadorCategorias");

async function criar(req, res) {
  try {
    const { descricao } = req.body;

    const validacao = validador.validarCategoria(descricao);

    if (!validacao.valido) {
      return res.status(400).json(validacao);
    }

    const categoria = await model.criar_categoria(validacao.valor);
    res.status(201).json({ mensagem: "Categoria criada." });
  } catch (error) {
    console.error("Erro ao criar categoria", error);
    if (error.code === "23505") {
      return res.status(500).json({ erro: "Categoria já existe" });
    }
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function listar(req, res) {
  try {
    const categorias = await model.listar_categorias();

    if (!categorias || categorias.length === 0) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    res.status(200).json(categorias);
  } catch (error) {
    console.error("Erro ao listar categorias", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function listar_por_id(req, res) {
  try {
    const id = req.params.id;

    const validacao = validador.validarId(id);
    
    if (!validacao.valido) {
      return res.status(400).json(validacao);
    }

    const categoria = await model.listar_categorias_id(validacao.valor);

    if (!categoria || categoria.length === 0) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    res.status(200).json(categoria);
  } catch (error) {
    console.error("Erro ao listar por id", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function alterar(req, res) {
  try {
    const id = req.params.id;
    const validacaoId = validador.validarId(id);

    if (!validacaoId.valido) {
      return res.status(400).json(validacaoId);
    }

    const { descricao } = req.body;
    const validacaoDes = validador.validarCategoria(descricao);

    if (!validacaoDes.valido) {
      return res.status(400).json(validacaoDes);
    }

    const categoria = await model.listar_categorias_id(id);

    if (!categoria || categoria.length === 0) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    await model.alterar_categoria(validacaoId.valor, validacaoDes.valor);
    res.status(200).json({ mensagem: "Categoria editada" });
  } catch (error) {
    console.error("Erro ao alterar categoria", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function deletar(req, res) {
  try {
    const id = req.params.id;
    const verificar = await model.listar_categorias_id(id);

    if (!verificar || verificar.length === 0) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    await model.deletar_categoria(id);
    res.status(200).json({ mensagem: "Categoria excluida" });
  } catch (error) {
    console.error("Erro ao deletar categoria", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

module.exports = { criar, listar, listar_por_id, alterar, deletar };
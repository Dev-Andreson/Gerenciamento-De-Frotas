const model = require("../model/veiculosModel");
const validador = require("../validators/validadorVeiculos");

async function criar(req, res) {
  try {
    const {
      modelo,
      ano,
      preco_diaria,
      disponibilidade,
      id_marca,
      id_categoria,
    } = req.body;

    const validacao = await validador.validarDados({
      modelo: modelo,
      preco: preco_diaria,
      ano: ano,
      disponivel: disponibilidade,
    });

    if (!validacao.valido) {
      return res.status(400).json(validacao);
    }

    const veiculo = await model.criar_veiculo(
      validacao.dados.modelo,
      validacao.dados.ano,
      validacao.dados.preco,
      validacao.dados.disponibilidade,
      id_marca,
      id_categoria,
    );
    res.status(201).json({ mensagem: "Veiculo criado" });
  } catch (error) {
    console.error("Erro ao criar veiculo", error);

    if (error.code === "23503") {
      return res.status(404).json({ erro: "Marca ou categoria invalida" });
    }

    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function listar(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const veiculos = await model.listar_veiculos(limit, offset);

    if (!veiculos) {
      return res.status(404).json({ erro: "Lista de veiculos indefinida" });
    }
    if (veiculos.length === 0) {
      return res.status(200).json({ erro: "Lista de veiculos vazia" });
    }

    const total = await model.contar_veiculos();

    const totalPaginas = Math.ceil(total / limit);
    res.status(200).json({
      dados: veiculos,
      paginacao: {
        pagina_atual: page,
        itens_por_pagina: limit,
        total_itens: total,
        total_paginas: totalPaginas,
        tem_proxima: page < totalPaginas,
        tem_anterior: page > 1,
      },
    });
  } catch (error) {
    console.error("Erro ao listar veiculos", error);

    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function listar_por_id(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({ erro: "Digite um id" });
    }

    if (isNaN(id) || id != parseInt(id)) {
      return res.status(404).json({ erro: "Id invalido" });
    }
    const veiculo = await model.listar_veiculos_id(id);

    if (!veiculo || veiculo.length === 0) {
      return res.status(404).json({ erro: "Veiculo não encontrado" });
    }
    res.status(200).json(veiculo);
  } catch (error) {
    console.error("Erro ao encontrar veiculo", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function listar_por_modelo(req, res) {
  try {
    const { modelo } = req.query;

    if (!modelo) {
      return res.status(404).json({ erro: "Modelo invalido" });
    }
    if (modelo.length === 0) {
      return res.status(404).json({ erro: "Digite um modelo" });
    }

    const veiculo = await model.listar_veiculos_modelo(modelo);

    if (!veiculo) {
      return res.status(404).json({ erro: "Veiculo indefinido" });
    }
    if (veiculo.length === 0) {
      return res.status(200).json({ erro: "Nenhuma veiculo encontrado" });
    }

    res.status(200).json(veiculo);
  } catch (error) {
    console.error("Erro ao encontrar modelo do veiculo", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function listar_disponiveis(req, res) {
  try {
    const veiculo = await model.listar_veiculos_disponiveis();

    if (!veiculo) {
      return res.status(404).json({ erro: "Veiculos não encontrados" });
    }
    if (veiculo.length === 0) {
      return res.status(200).json({ erro: "Nenhum veiculo disponivel" });
    }

    res.status(200).json(veiculo);
  } catch (error) {
    console.error("Erro ao listar veiculos disponiveis");
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function alterar(req, res) {
  try {
    const id = req.params.id;
    const {
      modelo,
      ano,
      preco_diaria,
      disponibilidade,
      id_marca,
      id_categoria,
    } = req.body;

    const validacao = await validador.validarDados({
      modelo: modelo,
      preco: preco_diaria,
      ano: ano,
      disponivel: disponibilidade,
    });

    if (!validacao.valido) {
      return res.status(400).json(validacao);
    }

    const veiculo = await model.alterar_veiculo(
      id,
      validacao.dados.modelo,
      validacao.dados.ano,
      validacao.dados.preco,
      validacao.dados.disponibilidade,
      id_marca,
      id_categoria,
    );
    res.status(200).json({ mensagem: "Veiculo alterado" });
  } catch (error) {
    console.error("Erro ao alterar veiculo", error);

    if (error.code === "23503") {
      return res.status(404).json({ erro: "Marca ou categoria invalida" });
    }

    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function receita(req, res) {
  try {
    const receita = await model.receita();
    if (!receita) {
      return res.status(404).json({ erro: "Erro interno" });
    }
    if (receita.length === 0) {
      return res.status(404).json({ erro: "Nenhum veiculo disponivel" });
    }

    res.status(200).json(receita);
  } catch (error) {
    console.error("Erro ao calcular receita potencial", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function deletar(req, res) {
  try {
    const id = req.params.id;

    const veiculoExistente = await model.listar_veiculos_id(id);
    if (!veiculoExistente) {
      return res.status(404).json({ erro: "Veiculo não encontrado" });
    }
    if (veiculoExistente.length === 0) {
      return res.status(200).json({ erro: "Nenhum veiculo encontrado" });
    }

    const veiculo = await model.deletar_veiculo(id);
    res.status(200).json({ mensagem: "Veiculo excluido" });
  } catch (error) {
    console.error("Erro ao excluir veiculo", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

module.exports = {
  criar,
  listar,
  listar_por_id,
  listar_por_modelo,
  listar_disponiveis,
  alterar,
  receita,
  deletar,
};

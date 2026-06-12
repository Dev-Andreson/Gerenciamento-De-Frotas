document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-cadastro");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (validaForm()) {
      const modelo = document.querySelector("#modelo").value;
      const marca = document.querySelector("#marcas").value;
      const categoria = document.querySelector("#categorias").value;
      const ano = document.querySelector("#ano").value;
      const preco = document.querySelector("#precoDiaria").value;
      const disponivel = document.querySelector("#disponibilidade").value;

      const conectado = await fetch("http://localhost:3000/api/veiculos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modelo: modelo,
          ano: ano,
          preco_diaria: preco,
          disponibilidade: disponivel,
          id_marca: marca,
          id_categoria: categoria,
        }),
      });

      if (conectado.ok) {
        const dados = await conectado.json();
        const mensagem = document.querySelector("#sussMsg");
        mensagem.innerHTML = `
                        <p>Veiculo Cadastrado</p>
                    `;
      } else {
        const mensagem = document.querySelector("#sussMsg");
        mensagem.innerHTML = `
                        <p>Erro de conexão</p>
                    `;
      }
    }
  });
});

document
  .querySelector("#listarVeiculos")
  .addEventListener("click", async function listarVeiculos() {
    const content = document.querySelector("#content");
    const veiculos = await (
      await fetch("http://localhost:3000/api/veiculos")
    ).json();
    const card = document.createElement("div");
    card.className = "card-tabela";

    if (veiculos.length === 0) {
      content.innerHTML = `
      <p>Nenhum veiculo cadastrado.</p>
    `;
      return;
    }

    content.innerHTML = `
    <h3>Lista De Veiculos</h3>
  `;

    let tabela = `
    <table>
      <thead>
          <tr>
              <th>ID</th>
              <th>MODELO</th>
              <th>MARCA</th>
              <th>CATEGORIA</th>
              <th>ANO</th>
              <th>PREÇO</th>
              <th>STATUS</th>
              <th>EDIÇÃO</th>
          </tr>
      </thead>
      <tbody>
      `;

    veiculos.forEach((veiculo) => {
      tabela += `
      <tr>
          <td>${veiculo.id}</td>
          <td>${veiculo.modelo}</td>
          <td>${veiculo.nome}</td>
          <td>${veiculo.descricao}</td>
          <td>${veiculo.ano}</td>
          <td>R$ ${veiculo.preco_diaria}</td>
          <td>${veiculo.disponibilidade}</td>
          <td id="botoes">
            <button class="btn-editar" data-id="${veiculo.id}">Editar</button>
            <button class="btn-excluir" data-id="${veiculo.id}">Excluir</button>
          </td>
      </tr>
    `;
    });

    tabela += `
      </tbody>
    </table>
  `;

    card.innerHTML = tabela;
    content.appendChild(card);

    const botaoEditar = document.querySelectorAll(".btn-editar");
    const botaoExcluir = document.querySelectorAll(".btn-excluir");

    botaoExcluir.forEach(function (botao) {
      botao.addEventListener("click", async function (e) {
        const linha = e.target.closest("tr");
        const id = parseInt(botao.getAttribute("data-id"));

        const botoes = linha.querySelector("#botoes");
        botoes.innerHTML = `
        <button class="btn-confirma" data-id="${id}">Confirmar</button>
        <button class="btn-cancela" data-id="${id}">Cancelar</button>
      `;

        const confirma = linha.querySelector(".btn-confirma");
        confirma.addEventListener("click", async function () {
          const excluirVeiculo = await fetch(
            `http://localhost:3000/api/veiculos/${id}`,
            {
              method: "DELETE",
            },
          );

          listarVeiculos();
        });

        const cancela = linha.querySelector(".btn-cancela");
        cancela.addEventListener("click", function () {
          listarVeiculos();
        });
      });
    });

    botaoEditar.forEach(function (botao) {
      botao.addEventListener("click", async function () {
        const id = parseInt(botao.getAttribute("data-id"));
        const veiculoEditar = await (
          await fetch(`http://localhost:3000/api/veiculos/${id}`)
        ).json();
        card.innerHTML = `
      <form id="form">
          <input type="text" id="modelo" placeholder="Modelo...">
          <span id="errorModelo"></span>
          <select id="marcas" required>
              <option value="">Marca</option>
              <option value="1">Toyota</option>
              <option value="2">Honda</option>
              <option value="3">Volkswagen</option>
          </select>
          <select id="categorias" required>
              <option value="">Categoria</option>
              <option value="1">Sedan’</option>
              <option value="2">SUV</option>
              <option value="3">Hatchback</option>
          </select>
          <input type="number" id="ano" placeholder="Ano...">
          <span id="errorAno"></span>
          <input type="number" id="precoDiaria" placeholder="Preço Diaria...">
          <span id="errorPrecoDiaria"></span>
          <select id="disponibilidade">
              <option value="Disponivel">Disponivel</option>
              <option value="Indisponivel">Indisponivel</option>
          </select>
          <button id="btn-salvar">Salvar</button>
          <button id="btn-cancelar">Cancelar</button>
          <span id="sussMsg"></span>
      </form>
      `;
        document.querySelector("#modelo").value = veiculoEditar.modelo;
        document.querySelector("#marcas").value = veiculoEditar.nome;
        document.querySelector("#categorias").value = veiculoEditar.descricao;
        document.querySelector("#ano").value = veiculoEditar.ano;
        document.querySelector("#precoDiaria").value =
          veiculoEditar.preco_diaria;
        document.querySelector("#disponibilidade").value =
          veiculoEditar.disponibilidade;

        document
          .querySelector("#btn-cancelar")
          .addEventListener("click", () => {
            listarVeiculos();
          });

        document
          .querySelector("#btn-salvar")
          .addEventListener("click", async function (e) {
            e.preventDefault();

            if (validaForm()) {
              const modelo = document.querySelector("#modelo").value;
              const marca = document.querySelector("#marcas").value;
              const categoria = document.querySelector("#categorias").value;
              const ano = document.querySelector("#ano").value;
              const preco = document.querySelector("#precoDiaria").value;
              const disponivel =
                document.querySelector("#disponibilidade").value;

              const conexao = await fetch(
                `http://localhost:3000/api/veiculos/edicao/${id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/Json",
                  },
                  body: JSON.stringify({
                    modelo: modelo,
                    ano: ano,
                    preco_diaria: preco,
                    disponibilidade: disponivel,
                    id_marca: marca,
                    id_categoria: categoria,
                  }),
                },
              );

              if (conexao.ok) {
                const sussMsg = document.querySelector("#sussMsg");
                sussMsg.innerHTML = `
            <p>Veiculo Atualizado.</p>
            `;
                listarVeiculos();
              }
            }
          });
      });
    });
  });

document
  .querySelector("#disponiveis")
  .addEventListener("click", async function () {
    const content = document.querySelector("#content");
    const veiculos = await (
      await fetch("http://localhost:3000/api/veiculos/disponiveis")
    ).json();
    const card = document.createElement("div");
    card.className = "card-tabela";

    if (veiculos.length === 0) {
      content.innerHTML = `
      <p>Nenhum veiculo disponivel.</p>
    `;
      return;
    }

    content.innerHTML = `
    <h3>Veiculos Disponiveis</h3>
  `;

    let tabela = `
    <table>
      <thead>
          <tr>
              <th>ID</th>
              <th>MODELO</th>
              <th>MARCA</th>
              <th>CATEGORIA</th>
              <th>ANO</th>
              <th>PREÇO</th>
              <th>STATUS</th>
          </tr>
      </thead>
      <tbody>
      `;
    {
      veiculos.forEach((veiculo) => {
        tabela += `
      <tr>
          <td>${veiculo.id}</td>
          <td>${veiculo.modelo}</td>
          <td>${veiculo.nome}</td>
          <td>${veiculo.descricao}</td>
          <td>${veiculo.ano}</td>
          <td>R$ ${veiculo.preco_diaria}</td>
          <td>${veiculo.disponibilidade}</td>
      </tr>
    `;
      });
    }

    tabela += `
      </tbody>
    </table>
  `;

    card.innerHTML = tabela;
    content.appendChild(card);
  });

async function receitaPotencial() {
  const content = document.querySelector("#content");
  const veiculos = await (
    await fetch("http://localhost:3000/api/veiculos/disponiveis")
  ).json();
  const receita = await (
    await fetch("http://localhost:3000/api/veiculos/receita")
  ).json();

  content.innerHTML = `
  <h3>Receita Potencial</h3>
    <div class="card-receita">
        <p>Digite a quantidade de dias:</p>
        <div class="input">
            <input type="number" placeholder="Número De Dias" class="dias">
            <button id="calcular">Calcular</button>
        </div>
    </div>
  `;

  document.querySelector("#calcular").addEventListener("click", () => {
    const dias = document.querySelector(".dias").value;
    const card = document.querySelector(".card-receita");
    card.innerHTML = `
      <p>Veiculos disponiveis: ${veiculos.length}</p>
      <p>Receita potencial para ${dias} dias:</p>
      <p>R$ ${receita[0].preco_diaria * dias}</p>
    `;
  });
}

function validaForm() {
  const modelo = document.querySelector("#modelo").value;
  const ano = document.querySelector("#ano").value;
  const preco = document.querySelector("#precoDiaria").value;
  const data = new Date().getFullYear();

  const errorModelo = document.querySelector("#errorModelo");
  const errorAno = document.querySelector("#errorAno");
  const errorPreco = document.querySelector("#errorPrecoDiaria");

  let isValid = true;

  if (modelo === "") {
    errorModelo.innerHTML = `
         <p>Campo Obrigatorio</p>
        `;
    isValid = false;
  } else {
    errorModelo.innerHTML = "";
  }

  if (ano === "") {
    errorAno.innerHTML = `
         <p>Campo Obrigatorio</p>
        `;
    isValid = false;
  } else if (ano < 1885 || ano > data) {
    errorAno.innerHTML = `
      <p>Digite um ano valido</p>
    `;
    isValid = false;
  } else {
    errorAno.innerHTML = "";
  }

  if (preco === "") {
    errorPreco.innerHTML = `
         <p>Campo Obrigatorio</p>
        `;
    isValid = false;
  } else {
    errorPreco.innerHTML = "";
  }

  return isValid;
}

const { pool } = require("../config/db");

async function criar_veiculo(
  modelo,
  ano,
  preco_diaria,
  disponibilidade,
  id_marca,
  id_categoria,
) {
  const sql = `insert into veiculos (modelo, ano, preco_diaria, disponibilidade, id_marca, id_categoria, ativo)
        values( $1, $2, $3, $4, $5, $6,'true')
        returning *`;
  const result = await pool.query(sql, [
    modelo,
    ano,
    preco_diaria,
    disponibilidade,
    id_marca,
    id_categoria,
  ]);
}

async function contar_veiculos() {
  const sql = `select count(*) as total from veiculos
  where ativo = 'true'`;
  const result = await pool.query(sql);
  return parseInt(result.rows[0].total);
}

async function listar_veiculos(limit, offset) {
  const sql = `select veiculos.id, modelo, ano, nome, descricao, preco_diaria, disponibilidade from veiculos
              inner join marcas on veiculos.id_marca = marcas.id
              inner join categorias on veiculos.id_categoria = categorias.id
              where veiculos.ativo = 'true'
              limit $1 offset $2`;
  const result = await pool.query(sql, [limit, offset]);
  return result.rows;
}

async function listar_veiculos_id(id) {
  const sql = `select veiculos.id, modelo, nome, descricao, ano, preco_diaria from veiculos
            inner join marcas on veiculos.id_marca = marcas.id
            inner join categorias on veiculos.id_categoria = categorias.id
            where veiculos.id = $1 and veiculos.ativo = 'true'`;
  const result = await pool.query(sql, [id]);
  return result.rows;
}

async function listar_veiculos_modelo(modelo) {
  const sql = `select veiculos.id, modelo, nome, descricao, ano, preco_diaria from veiculos
            inner join marcas on veiculos.id_marca = marcas.id
            inner join categorias on veiculos.id_categoria = categorias.id
            where veiculos.modelo = $1 and veiculos.ativo = 'true'`;
  const result = await pool.query(sql, [modelo]);
  return result.rows;
}

async function listar_veiculos_disponiveis() {
  const sql = `
            select veiculos.id, modelo, nome, descricao, ano, preco_diaria, disponibilidade from veiculos
            inner join marcas on veiculos.id_marca = marcas.id
            inner join categorias on veiculos.id_categoria = categorias.id
            where veiculos.disponibilidade = 'Disponivel' and veiculos.ativo = 'true'`;
  const result = await pool.query(sql);
  return result.rows;
}

async function alterar_veiculo(
  id,
  modelo,
  ano,
  preco_diaria,
  disponibilidade,
  id_marca,
  id_categoria,
) {
  const sql = `
        update veiculos 
        set modelo = $2, ano = $3, preco_diaria = $4, disponibilidade = $5, id_marca = $6, id_categoria = $7
        where veiculos.id = $1 and veiculos.ativo = 'true'
        RETURNING * `;
  const result = await pool.query(sql, [
    id,
    modelo,
    ano,
    preco_diaria,
    disponibilidade,
    id_marca,
    id_categoria,
  ]);
}

async function receita() {
  const sql = `
            select sum(preco_diaria) as preco_diaria from veiculos
            where disponibilidade = 'Disponivel' and veiculos.ativo = 'true'
    `;
  const result = await pool.query(sql);
  return result.rows;
}

async function deletar_veiculo(id) {
  const sql = `
        update veiculos
        set ativo = 'false'
        where veiculos.id = $1 and veiculos.ativo = 'true'`;
  const result = await pool.query(sql, [id]);
}

module.exports = {
  criar_veiculo,
  listar_veiculos,
  listar_veiculos_modelo,
  listar_veiculos_disponiveis,
  listar_veiculos_id,
  receita,
  alterar_veiculo,
  deletar_veiculo,
  contar_veiculos,
};

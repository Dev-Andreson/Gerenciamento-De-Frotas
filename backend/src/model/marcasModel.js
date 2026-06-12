const { pool } = require("../config/db");

async function criar_marca(nome) {
  const sql = `
            insert into marcas ( nome, ativo)
            values ( $1,'true')
            RETURNING *`;
  const result = await pool.query(sql, [nome]);
}

async function listar_marcas() {
  const sql = `
    select * from marcas
    where marcas.ativo = 'true'
    `;
  const result = await pool.query(sql);
  return result.rows;
}

async function listar_marcas_nome(nome) {
  const sql = `
            select nome from marcas
            where marcas.nome= $1 and marcas.ativo = 'true'
    `;
  const result = await pool.query(sql, [nome]);
  return result.rows;
}

async function listar_marcas_id(id) {
  const sql = `
            select nome from marcas
            where marcas.id = $1 and marcas.ativo = 'true'
    `;
  const result = await pool.query(sql, [id]);
  return result.rows;
}

async function alterar_marca(id, nome) {
  const sql = `
            update marcas
            set nome = $2
            where marcas.id = $1 and marcas.ativo = 'true'
            RETURNING *
    `;
  const result = await pool.query(sql, [id, nome]);
}

async function deletar_marca(id) {
  const sql = `
            update marcas
            set ativo = 'false'
            where marcas.id = $1 and marcas.ativo = 'true'
            RETURNING *
    `;
  const result = await pool.query(sql, [id]);
}

module.exports = {
  criar_marca,
  listar_marcas,
  listar_marcas_nome,
  listar_marcas_id,
  alterar_marca,
  deletar_marca,
};

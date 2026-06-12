const { pool } = require("../config/db");

async function criar_categoria(descricao) {
  const sql = `
            insert into categorias ( descricao, ativo )
            values ( $1, 'true')
            RETURNING *
    `;
  const result = await pool.query(sql, [descricao]);
}

async function listar_categorias() {
  const sql = `
            select * from categorias
            where categorias.ativo = 'true'
    `;
  const result = await pool.query(sql);
  return result.rows;
}

async function listar_categorias_id(id) {
  const sql = `
            select * from categorias
            where categorias.id = $1 and categorias.ativo = 'true'
    `;
  const result = await pool.query(sql, [id]);
  return result.rows;
}

async function alterar_categoria(id, descricao) {
  const sql = `
            update categorias
            set descricao = $2
            where categorias.id = $1 and categorias.ativo = 'true'
            RETURNING *
    `;
  const result = await pool.query(sql, [id, descricao]);
}

async function deletar_categoria(id) {
  const sql = `
            update categorias
            set ativo = 'false'
            where categorias.id = $1 and categorias.ativo = 'true'
            RETURNING *`;
  const result = await pool.query(sql, [id]);
}

module.exports = {
  criar_categoria,
  listar_categorias,
  listar_categorias_id,
  alterar_categoria,
  deletar_categoria,
};

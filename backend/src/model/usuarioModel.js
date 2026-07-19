const { pool } = require("../config/db");

async function buscarUsuarioPorEmail(email) {
  const sql = `SELECT * FROM usuarios WHERE email = $1 AND ativo = true`;
  const result = await pool.query(sql, [email]);
  console.log('Resultado da busca:', result.rows); // PARA DEBUG
  return result.rows[0];
}

module.exports = { buscarUsuarioPorEmail };
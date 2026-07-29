const { pool } = require("../config/db");

async function buscarUsuarioPorEmail(email) {
  const sql = `SELECT * FROM usuarios WHERE email = $1 AND ativo = true`;
  const result = await pool.query(sql, [email]);
  console.log('Resultado da busca:', result.rows); // PARA DEBUG
  return result.rows[0];
}

async function salvarTokenRecuperacao(email, token) {
  const sql = `UPDATE usuarios 
               SET token_recuperacao = $1, 
                   token_expiracao = NOW() + INTERVAL '1 hour' 
               WHERE email = $2`;
  await pool.query(sql, [token, email]);
}

async function buscarUsuarioPorToken(token) {
  // Verifica se o token existe e não expirou
  const sql = `SELECT * FROM usuarios 
               WHERE token_recuperacao = $1 
               AND token_expiracao > NOW()`;
  const result = await pool.query(sql, [token]);
  return result.rows[0];
}

async function atualizarSenha(email, novaSenhaHash) {
  // Atualiza a senha e limpa o token
  const sql = `UPDATE usuarios 
               SET senha = $1, 
                   token_recuperacao = NULL, 
                   token_expiracao = NULL 
               WHERE email = $2`;
  await pool.query(sql, [novaSenhaHash, email]);
}

module.exports = { 
  buscarUsuarioPorEmail, 
  salvarTokenRecuperacao, 
  buscarUsuarioPorToken, 
  atualizarSenha 
};


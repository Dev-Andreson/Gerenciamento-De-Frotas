const { v4: uuidv4 } = require('uuid');
const usuarioModel = require("../model/usuarioModel");
const { enviarEmailRecuperacao } = require("../config/email");
const bcrypt = require('bcrypt');
const db = require('../config/db');

const redefinirSenha = async (req, res) => {
  try {
    const { email } = req.body;
    
    // 1. Verificar se usuário existe
    const result = await db.query('SELECT id FROM usuarios WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      // Segurança: Não revelamos se o e-mail existe ou não para o usuário final
      return res.status(200).json({ message: 'Se o e-mail existir, enviamos um link.' });
    }

    const userId = result.rows[0].id;
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 3600000); // 1 hora

    // 2. Salvar token no banco
    // IMPORTANTE: A tabela 'redefinicoes_senha' deve ter UNIQUE constraint na coluna 'token'
    await db.query(
      'INSERT INTO redefinicoes_senha (user_id, token, expires_at) VALUES ($1, $2, $3) ON CONFLICT (token) DO UPDATE SET expires_at = $3, user_id = $1',
      [userId, token, expiresAt]
    );

    // 3. Montar o HTML
    const frontendUrl = process.env.FRONTEND_URL;
    const link = `${frontendUrl}/recuperar-senha?token=${token}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Recuperação de Senha</h2>
        <p>Você solicitou a redefinição de senha para sua conta.</p>
        <p>Clique no botão abaixo para definir uma nova senha:</p>
        <a href="${link}" style="background-color: #6f42c1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">Redefinir Senha</a>
        <p>Ou copie e cole o link no seu navegador:</p>
        <p style="word-break: break-all; color: #666;">${link}</p>
        <p>Este link expira em 1 hora.</p>
        <p>Se você não solicitou isso, ignore este e-mail.</p>
      </div>
    `;

    // 4. Enviar e-mail
    await enviarEmailRecuperacao(email, 'Redefinição de Senha', htmlContent);

    // Resposta genérica por segurança
    res.status(200).json({ message: 'Se o e-mail existir, enviamos um link.' });

  } catch (error) {
    console.error('Erro na redefinição:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Nova função para confirmar o reset com a nova senha
async function confirmarRedefinicao(req, res) {
  try {
    const { token, novaSenha } = req.body;

    if (!token || !novaSenha) {
      return res.status(400).json({ erro: "Token e nova senha são obrigatórios" });
    }

    // Busca o token válido e não expirado
    const query = `
      SELECT rs.user_id, u.email 
      FROM redefinicoes_senha rs
      JOIN usuarios u ON u.id = rs.user_id
      WHERE rs.token = $1 AND rs.expires_at > NOW()
      ORDER BY rs.created_at DESC
      LIMIT 1
    `;
    
    const result = await db.query(query, [token]);
    
    if (result.rows.length === 0) {
      return res.status(400).json({ erro: "Token inválido ou expirado" });
    }

    const user = result.rows[0];

    // Criptografa a nova senha
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(novaSenha, salt);

    // Atualiza a senha do usuário
    await db.query('UPDATE usuarios SET password = $1 WHERE id = $2', [hash, user.user_id]);

    // Opcional: Invalidar o token após uso (delete ou update)
    await db.query('DELETE FROM redefinicoes_senha WHERE token = $1', [token]);

    return res.status(200).json({ mensagem: "Senha alterada com sucesso" });

  } catch (error) {
    console.error("Erro ao confirmar redefinição:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

module.exports = { redefinirSenha, confirmarRedefinicao };

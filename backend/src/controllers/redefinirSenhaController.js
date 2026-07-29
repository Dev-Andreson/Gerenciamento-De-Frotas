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
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const userId = result.rows[0].id;
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 3600000); // 1 hora

    // 2. Salvar token no banco
    await db.query(
      'INSERT INTO redefinicoes_senha (user_id, token, expires_at) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET token = $2, expires_at = $3',
      [userId, token, expiresAt]
    );

    // 3. Montar o HTML (O ERRO ESTAVA AQUI)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
    const link = `${frontendUrl}/recuperar-senha?token=${token}`;
    
    // Garanta que esta variável não seja undefined
    const htmlContent = `
      <h1>Recuperação de Senha</h1>
      <p>Clique no link abaixo para redefinir sua senha:</p>
      <a href="${link}">${link}</a>
      <p>Este link expira em 1 hora.</p>
    `;

    // 4. Enviar e-mail
    await sendEmail(email, 'Redefinição de Senha', htmlContent);

    res.status(200).json({ message: 'E-mail de recuperação enviado com sucesso' });

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

    const usuario = await usuarioModel.buscarUsuarioPorToken(token);

    if (!usuario) {
      return res.status(400).json({ erro: "Token inválido ou expirado" });
    }

    // Criptografa a nova senha
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(novaSenha, salt);

    // Atualiza no banco
    await usuarioModel.atualizarSenha(usuario.email, hash);

    return res.status(200).json({ mensagem: "Senha alterada com sucesso" });

  } catch (error) {
    console.error("Erro ao confirmar redefinição:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

module.exports = { redefinirSenha, confirmarRedefinicao };

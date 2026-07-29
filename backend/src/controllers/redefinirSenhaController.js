const { v4: uuidv4 } = require('uuid');
const usuarioModel = require("../model/usuarioModel");
const { enviarEmailRecuperacao } = require("../config/email");
const bcrypt = require('bcrypt'); 

async function redefinirSenha(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ erro: "Email é obrigatório" });

    const usuario = await usuarioModel.buscarUsuarioPorEmail(email);
    
    // Retornamos 200 mesmo se não achar o usuário para não revelar dados
    if (!usuario) {
      return res.status(200).json({ mensagem: "Se o e-mail estiver cadastrado, você receberá as instruções." });
    }

    const token = uuidv4();
    await usuarioModel.salvarTokenRecuperacao(email, token);
    
    // Tenta enviar o e-mail
    try {
      await enviarEmailRecuperacao(email, token);
    } catch (emailError) {
      console.error("Erro ao enviar e-mail:", emailError);
      // Mesmo com erro no e-mail, não revelamos ao usuário
    }

    return res.status(200).json({ mensagem: "Se o e-mail estiver cadastrado, você receberá as instruções." });

  } catch (error) {
    console.error("Erro na recuperação de senha:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

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

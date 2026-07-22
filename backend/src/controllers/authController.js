const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usuarioModel = require("../model/usuarioModel");
const { pool } = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET;

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    
    if (email === '' || senha === '') {
      return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    if(!email || !senha){
      return res.status(400).json({erro: 'Email e senha inválidos'})
    }

    const usuario = await usuarioModel.buscarUsuarioPorEmail(email);

    if (!usuario) {
      console.log("Usuário NÃO encontrado");
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    console.log("Senha do banco (hash):", usuario.senha_hash);

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    console.log("Resultado da comparação:", senhaValida);

    if (!senhaValida) {
      console.log("Senha inválida");
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        perfil: usuario.perfil,
      },
      JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

async function registrar(req, res) {
  try {
    const { nome, email, senha } = req.body;

    // Validações
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    if (nome.length < 3) {
      return res.status(400).json({ erro: "Nome deve ter pelo menos 3 caracteres" });
    }

    if (!email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ erro: "E-mail inválido" });
    }

    if (senha.length < 6) {
      return res.status(400).json({ erro: "Senha deve ter pelo menos 6 caracteres" });
    }

    // Verificar se email já existe
    const usuarioExistente = await usuarioModel.buscarUsuarioPorEmail(email);
    if (usuarioExistente) {
      return res.status(409).json({ erro: "E-mail já cadastrado" });
    }

    // Hash da senha
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // Inserir no banco (perfil padrão = 'comum')
    const sql = `
      INSERT INTO usuarios (nome, email, senha_hash, perfil, ativo)
      VALUES ($1, $2, $3, 'comum', true)
      RETURNING id, nome, email, perfil
    `;
    
    const result = await pool.query(sql, [nome, email, senhaHash]);
    const novoUsuario = result.rows[0];

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: novoUsuario
    });

  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
}

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}

function verificarAdmin(req, res, next) {
  if (req.usuario.perfil !== "administrador") {
    return res
      .status(403)
      .json({ erro: "Acesso negado. Permissão de administrador necessária." });
  }
  next();
}

module.exports = { login, registrar, verificarToken, verificarAdmin };
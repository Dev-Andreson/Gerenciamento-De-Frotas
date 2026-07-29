module.exports = (app) => {
  const controller = require("../controllers/redefinirSenhaController");

  // Solicita o e-mail para iniciar o processo
  app.post("/api/recuperarSenha", controller.redefinirSenha);
  
  // Confirma o token e define a nova senha
  app.post("/api/confirmarRecuperacao", controller.confirmarRedefinicao);
};

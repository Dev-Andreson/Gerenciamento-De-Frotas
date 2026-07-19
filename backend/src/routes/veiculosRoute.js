module.exports = (app) => {
  const controller = require("../controllers/veiculosController");
  const auth = require("../controllers/authController");

  app.post("/api/veiculos", auth.verificarToken, auth.verificarAdmin, controller.criar);
  app.get("/api/veiculos", auth.verificarToken, controller.listar);
  app.get("/api/veiculo/", auth.verificarToken, controller.listar_por_modelo);
  app.get("/api/veiculos/disponiveis", auth.verificarToken, controller.listar_disponiveis);
  app.get("/api/veiculos/receita", auth.verificarToken, auth.verificarAdmin, controller.receita);
  app.get("/api/veiculos/:id", auth.verificarToken, controller.listar_por_id);
  app.put("/api/veiculos/editar/:id", auth.verificarToken, auth.verificarAdmin, controller.alterar);
  app.delete("/api/veiculos/:id", auth.verificarToken, auth.verificarAdmin, controller.deletar);
};
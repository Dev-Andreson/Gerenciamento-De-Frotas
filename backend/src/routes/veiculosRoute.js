module.exports = (app) => {
  const controller = require("../controllers/veiculosController");

  app.post("/api/veiculos", controller.criar);
  app.get("/api/veiculos", controller.listar);
  app.get("/api/veiculo/", controller.listar_por_modelo);
  app.get("/api/veiculos/disponiveis", controller.listar_disponiveis);
  app.get("/api/veiculos/receita", controller.receita);
  app.get("/api/veiculos/:id", controller.listar_por_id);
  app.put("/api/veiculos/editar/:id", controller.alterar);
  app.delete("/api/veiculos/:id", controller.deletar);
};

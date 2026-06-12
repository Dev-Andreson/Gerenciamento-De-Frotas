module.exports = (app) => {
  const controller = require("../controllers/categoriasController");

  app.post("/api/categoria", controller.criar);
  app.get("/api/categorias", controller.listar);
  app.get("/api/categoria/:id", controller.listar_por_id);
  app.put("/api/categoria/:id", controller.alterar);
  app.delete("/api/categoria/:id", controller.deletar);
};

module.exports = (app) => {
  const controller = require("../controllers/marcasController");

  app.post("/api/marca", controller.criar);
  app.get("/api/marcas", controller.listar);
  app.get("/api/marca/", controller.listar_por_nome);
  app.get("/api/marcas/:id", controller.listar_por_id);
  app.put("/api/marca/:id", controller.alterar);
  app.delete("/api/marca/:id", controller.deletar);
};

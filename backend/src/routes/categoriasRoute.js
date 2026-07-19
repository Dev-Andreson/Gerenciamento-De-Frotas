module.exports = (app) => {
  const controller = require("../controllers/categoriasController");
  const auth = require("../controllers/authController");

  app.post("/api/categoria", auth.verificarToken, auth.verificarAdmin, controller.criar);
  app.get("/api/categorias", auth.verificarToken, controller.listar);
  app.get("/api/categoria/:id", auth.verificarToken, controller.listar_por_id);
  app.put("/api/categoria/:id", auth.verificarToken, auth.verificarAdmin, controller.alterar);
  app.delete("/api/categoria/:id", auth.verificarToken, auth.verificarAdmin, controller.deletar);
};
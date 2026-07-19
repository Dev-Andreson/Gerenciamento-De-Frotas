module.exports = (app) => {
  const controller = require("../controllers/authController");

  app.post("/api/login", controller.login);
  app.post("/api/registro", controller.registrar);
};
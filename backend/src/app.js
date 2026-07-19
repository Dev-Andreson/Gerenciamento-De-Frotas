const express = require("express");
const cors = require("cors");
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

require("../src/routes/categoriasRoute")(app);
require("../src/routes/marcasRoute")(app);
require("../src/routes/veiculosRoute")(app);
require("../src/routes/authRoute")(app);

module.exports = { app };

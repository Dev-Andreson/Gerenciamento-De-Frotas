const { app } = require("./app");
const { pool } = require("./config/db");

const port = process.env.PORT;
app.listen(port);
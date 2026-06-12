const { app } = require("./backend/src/app");
const { pool } = require("./backend/src/config/db");

const port = process.env.PORT;
app.listen(port);
require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const morganBody = require("morgan-body");
const cors = require("cors");
const app = express();
const dbConnectNoSql = require("./config/mongo");
const swaggerSpec = require("./docs/swagger");
const { loggerSlack } = require("./utils/handleLoger");
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const engine = process.env.DB_ENGINE || null;
const port = process.env.PORT || 3000;

morganBody(app, {
  skip: function (req, res) {
    return (
      [403, 404, 409, 401].includes(res.statusCode) || res.statusCode < 400
    );
  },
  stream: loggerSlack,
});

/**
 * API - Documentation
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * API Rest
 */
app.use("/api", require("./routes"));

/**
 * Rutas no definidas
 */
app.use((req, res) => {
  res.status(404).send({ error: 'Not found' });
});


app.listen(port, () =>
  console.log(`Tu server esta listo: http://localhost:${port}`)
);

/**
 * Define your database engine
 */

if (engine === "nosql") {
  dbConnectNoSql();
  return;
}
// server/server.js
require('dotenv').config(); 
const envs         = require('../config/envs');        
const express    = require('express');
const swaggerUi  = require('swagger-ui-express');
const cors       = require('cors');
const cookieParser = require('cookie-parser');


const swaggerSpec  = require('../docs/swagger');

class Server {
  /**
   * NO aceptamos el puerto por parámetro; lo resolvemos desde envs
   * Permitimos inyectar las rutas para mantener el acoplamiento bajo.
   */
  constructor({ routes }) {
    this.port = envs.PORT;                               // ② lee PORT desde envs
    this.app  = express();
    

    /* ---------- Middlewares genéricos ---------- */
    this.app.use(cookieParser());
    this.app.use(cors({
      origin: envs.FRONTEND_ORIGIN,
      credentials: true,
    }));
    console.log("FRONTEND_ORIGIN: " + envs.FRONTEND_ORIGIN)


    this.app.use(express.json());
    this.app.use(express.static('storage'));
    

    /* ---------- Documentación Swagger ---------- */
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    /* ---------- Rutas principales ---------- */
    this.app.use('/api', routes);

    /* ---------- 404 por defecto ---------- */
    this.app.use((_req, res) => res.status(404).send({ error: 'Not found' }));
  }

  /** Patrón Singleton */
  static getInstance(options) {
    if (!Server._instance) Server._instance = new Server(options);
    return Server._instance;
  }

  /** Arranca el listener */
  start() {
    this.app.listen(this.port, () =>
      console.log(`🚀  Server ready: http://localhost:${this.port}`),
    );
  }
}

module.exports = Server;

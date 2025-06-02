require('dotenv').config(); 
const envs            = require('./config/envs');     // ← lee .env UNA vez
const MongoDataSource = require('./config/mongo');
const Server          = require('./server/server');
const routes          = require('./routes');          // ./routes/index.js

(async () => {
  try {
    // 2. Conexión a BD solo si el motor definido es 'nosql'
    if (envs.DB_ENGINE === 'nosql') {
      await MongoDataSource.getInstance();
    }

    // 3. Arranque del servidor Express (puerto tomado de envs)
    Server.getInstance({ routes }).start();
  } catch (err) {
    console.error('❌  Error al iniciar la aplicación:', err);
    process.exit(1);
  }
})();
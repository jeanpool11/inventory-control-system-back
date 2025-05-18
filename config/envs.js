// config/envs.js
require('dotenv').config();          // ① Carga .env SOLO una vez

const envs = {
  DB_URI        : process.env.DB_URI     ?? '',
  DB_ENGINE     : process.env.DB_ENGINE  ?? 'nosql',
  NODE_ENV      : process.env.NODE_ENV   ?? 'development',
  JWT_SECRET    : process.env.JWT_SECRET ?? '',
  PORT          : Number(process.env.PORT) || 3000,
};

Object.freeze(envs);                // ② Evita que se modifique en tiempo de ejecución
module.exports = envs;              // ③ Exporta SIEMPRE la misma referencia

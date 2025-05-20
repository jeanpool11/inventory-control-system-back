require('dotenv').config();

const envs = {
  DB_URI        : process.env.DB_URI     ?? '',
  DB_ENGINE     : process.env.DB_ENGINE  ?? 'nosql',
  NODE_ENV      : process.env.NODE_ENV   ?? 'development',
  JWT_SECRET    : process.env.JWT_SECRET ?? '',
  PORT          : Number(process.env.PORT) || 3000,
  FRONTEND_DEV_ORIGIN : process.env.FRONTEND_DEV_ORIGIN ?? 'http://localhost:4200',
  FRONTEND_PROD_ORIGIN: process.env.FRONTEND_PROD_ORIGIN ?? '',
};

envs.FRONTEND_ORIGIN = envs.NODE_ENV === 'production'
  ? envs.FRONTEND_PROD_ORIGIN
  : envs.FRONTEND_DEV_ORIGIN;

Object.freeze(envs);
module.exports = envs;

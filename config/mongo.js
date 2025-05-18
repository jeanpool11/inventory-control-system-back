// config/mongo.js
const mongoose = require('mongoose');
const { DB_URI } = require('./envs');   // ← aquí lo integramos

class MongoDataSource {
  constructor() {
    throw new Error('Use MongoDataSource.getInstance()');
  }

  static async getInstance() {
    if (!MongoDataSource._instance) {
      if (!DB_URI) throw new Error('DB_URI no definido en variables de entorno');

      try {
        await mongoose.connect(DB_URI);
        MongoDataSource._instance = mongoose;
        console.log('🗄️  MongoDB connected');
      } catch (err) {
        console.error('❌ Mongo connection error:', err.message);
        throw err;
      }
    }
    return MongoDataSource._instance;
  }

  static async disconnect() {
    if (MongoDataSource._instance) {
      await mongoose.disconnect();
      MongoDataSource._instance = null;
      console.log('🔌 MongoDB disconnected');
    }
  }
}

module.exports = MongoDataSource;

const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["seller", "admin"], default: "seller" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Configuración CORRECTA del plugin
UserSchema.plugin(mongooseDelete, { 
  overrideMethods: ['count', 'countDocuments', 'find'], // Solo sobrescribe estos métodos
  deletedAt: true,
  use$neOperator: false // Importante para consultas inclusivas
});

module.exports = mongoose.model("User", UserSchema);
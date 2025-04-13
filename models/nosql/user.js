// models/nosql/seller.js
const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const SellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true  },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["seller", "admin"], default: "seller" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

SellerSchema.plugin(mongooseDelete, { overrideMethods: true, deletedAt: true });

module.exports = mongoose.model("user", SellerSchema);
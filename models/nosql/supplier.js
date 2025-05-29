const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const SupplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    ruc: { type: String, required: true, unique: true, match: /^\d{11}$/ },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

SupplierSchema.plugin(mongooseDelete, {
  overrideMethods: true,
  deletedAt: true,
});

module.exports = mongoose.model("supplier", SupplierSchema);

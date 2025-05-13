const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const SupplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true  },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

SupplierSchema.plugin(mongooseDelete, { overrideMethods: true, deletedAt: true });

module.exports = mongoose.model("supplier", SupplierSchema);
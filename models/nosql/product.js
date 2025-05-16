const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const ProductSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },

    minStock: {
      type: Number,
      required: true,
      min: 0,
    },
    maxStock: {
      type: Number,
      required: true,
      min: 0,
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ProductSchema.plugin(mongooseDelete, { overrideMethods: true, deletedAt: true });

module.exports = mongoose.model("product", ProductSchema);

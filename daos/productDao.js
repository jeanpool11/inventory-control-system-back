const { ProductModel } = require('../models');

class ProductDao {
  /* ---------- Lectura ---------- */

  /** Devuelve un producto por su _id */
  static findById(id) {
    return ProductModel.findById(id).lean();
  }

  static findByCode(code) {
    return ProductModel.findOne({ code }).lean();
  }

  static existsCodeExceptId(code, id) {
    return ProductModel.findOne({ code, _id: { $ne: id } }).lean();
  }
  
  static findAllWithSupplier() {
    return ProductModel.findWithDeleted({})
      .populate({ path: "supplier", options: { withDeleted: true } })
      .sort({ createdAt: -1 })
      .lean();
  }
  
  /* ---------- Escritura ---------- */

  static create(data) {
    return ProductModel.create(data);
  }

  static updateById(id, update) {
    return ProductModel.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).lean();
  }

  /* ---------- Eliminación ---------- */

  static softDeleteById(id) {
    return ProductModel.delete({ _id: id });
  }

  static hardDeleteById(id) {
    return ProductModel.deleteOne({ _id: id });
  }

  static restoreById(id) {
    return ProductModel.restore({ _id: id });
  }

  /* ---------- Stock helpers ---------- */

  static increaseStock(id, qty) {
    return ProductModel.findByIdAndUpdate(
      id,
      { $inc: { stock: qty } },
      { new: true, runValidators: true },
    ).lean();
  }

  static decreaseStock(id, qty) {
    return ProductModel.findByIdAndUpdate(
      id,
      { $inc: { stock: -qty } },
      { new: true, runValidators: true },
    ).lean();
  }
}

module.exports = ProductDao;

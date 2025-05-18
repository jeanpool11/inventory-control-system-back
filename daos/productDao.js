// daos/productDao.js
const ProductModel = require('../models/nosql/product');

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

  static findActiveWithSupplier() {
    return ProductModel.find({ deleted: { $ne: true } })
                       .populate('supplier')
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

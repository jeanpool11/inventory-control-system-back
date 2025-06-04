const { ProductModel } = require('../models');

class ProductDao {
  static findById(id) {
    return ProductModel.findById(id).populate('supplier');
  }

  static findByCode(code) {
    return ProductModel.findOne({ code });
  }

  static existsCodeExceptId(code, id) {
    return ProductModel.exists({ code, _id: { $ne: id } });
  }

  static findActiveWithSupplier() {
    return ProductModel.find({ deleted: false }).populate('supplier').lean();
  }

  static findAllWithSupplier() {
    return ProductModel.find().populate('supplier').lean();
  }

  static create(data) {
    return ProductModel.create(data);
  }

  static updateById(id, update) {
    return ProductModel.findByIdAndUpdate(id, update, { new: true });
  }

  static softDeleteById(id) {
    return ProductModel.findByIdAndUpdate(id, { deleted: true }, { new: true });
  }

  static hardDeleteById(id) {
    return ProductModel.deleteOne({ _id: id });
  }

  static restoreById(id) {
    return ProductModel.findByIdAndUpdate(id, { deleted: false }, { new: true });
  }

  static increaseStock(id, qty) {
    return ProductModel.findByIdAndUpdate(id, { $inc: { stock: qty } }, { new: true });
  }

  static decreaseStock(id, qty) {
    return ProductModel.findByIdAndUpdate(id, { $inc: { stock: -qty } }, { new: true });
  }
}

module.exports = ProductDao;

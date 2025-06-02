const { SupplierModel } = require('../models');

class SupplierDao {
  static findByEmail(email) {
    return SupplierModel.findOne({ email, deleted: { $ne: true } }).lean();
  }

  static findByRuc(ruc) {
    return SupplierModel.findOne({ ruc, deleted: { $ne: true } }).lean();
  }

  static create(data) {
    return SupplierModel.create(data);
  }

  static updateById(id, update) {
    return SupplierModel.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true
    }).lean();
  }

  static findById(id) {
    return SupplierModel.findById(id).lean();
  }

  static softDeleteById(id) {
    return SupplierModel.delete({ _id: id });
  }

  static hardDeleteById(id) {
    return SupplierModel.deleteOne({ _id: id });
  }

  static restoreById(id) {
    return SupplierModel.restore({ _id: id });
  }

  static findAllActiveRaw() {
    return SupplierModel.find({ deleted: { $ne: true } }).sort({ createdAt: -1 }).lean();
  }

  static findAllWithDeletedRaw() {
    return SupplierModel.findWithDeleted({}).sort({ createdAt: -1 }).lean();
  }
}

module.exports = SupplierDao;

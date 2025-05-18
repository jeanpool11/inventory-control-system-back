// daos/supplierDao.js
const SupplierModel = require('../models/nosql/supplier');

class SupplierDao {
  /* ------------------ Lectura ------------------ */
  static findByEmail(email) {
    return SupplierModel.findOne({ email }).lean();
  }

  static findActive(queryExtras = {}) {
    return SupplierModel.find({ deleted: { $ne: true }, ...queryExtras }).lean();
  }

  static findById(id) {
    return SupplierModel.findById(id).lean();
  }

  /* ------------------ Escritura ------------------ */
  static create(data) {
    return SupplierModel.create(data);
  }

  static updateById(id, update) {
    return SupplierModel.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).lean();
  }

  /* ------------ Eliminación lógica/física ----------- */
  static softDeleteById(id) {
    return SupplierModel.delete({ _id: id });
  }

  static hardDeleteById(id) {
    return SupplierModel.deleteOne({ _id: id });
  }
}

module.exports = SupplierDao;

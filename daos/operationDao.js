const { OperationModel  }= require('../models');

class OperationDao {
  /* ------------------ Lectura ------------------ */
  static countAll() {
    return OperationModel.countDocuments();
  }

  static findAllWithProduct() {
    return OperationModel.find()
      .populate('product')
      .sort({ createdAt: -1 })        // más recientes primero
      .lean();
  }

  /* ------------------ Escritura ------------------ */
  static create(data) {
    return OperationModel.create(data);
  }

  static findById(id) {
    return OperationModel.findById(id).populate('product');
  }
  
  static softDeleteById(id) {
    return OperationModel.findByIdAndUpdate(id, { deleted: true }, { new: true });
  }
  
  static restoreById(id) {
    return OperationModel.findByIdAndUpdate(id, { deleted: false }, { new: true });
  }
  
  static deleteOneById(id) {
    return OperationModel.findByIdAndDelete(id);
  }

  static findAllIncludingDeleted() {
    return OperationModel.find()
      .populate('product')
      .sort({ createdAt: -1 })
      .lean();
  }
  
  
}

module.exports = OperationDao;

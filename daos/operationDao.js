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
}

module.exports = OperationDao;

const { ProductModel, SupplierModel, OperationModel } = require("../models");

class DashboardDao {
  static countProducts() {
    return ProductModel.countDocuments({ deleted: false });
  }

  static countProductsSince(date) {
    return ProductModel.countDocuments({
      createdAt: { $gte: date },
      deleted: false
    });
  }

  static countSuppliers() {
    return SupplierModel.countDocuments({ deleted: false });
  }

  static countSuppliersSince(date) {
    return SupplierModel.countDocuments({
      createdAt: { $gte: date },
      deleted: false
    });
  }

  static getOperationsSince(date) {
    return OperationModel.find({ createdAt: { $gte: date } }).lean();
  }

  static findAllProducts() {
    return ProductModel.find({ deleted: false }).lean();
  }

  static findLastOperations(limit) {
    return OperationModel.find({ deleted: false })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("product")
      .lean();
  }

  static findOperationsByType(type) {
    return OperationModel.find({ type, deleted: false }).populate("product").lean();
  }

  static findOperationsByYear(year) {
    const start = new Date(`${year}-01-01T00:00:00.000Z`);
    const end = new Date(`${year + 1}-01-01T00:00:00.000Z`);
  
    return OperationModel.find({
      createdAt: { $gte: start, $lt: end },
      deleted: false
    }).lean();
  }
  
   

}

module.exports = DashboardDao;

const DashboardDao = require("../../daos/dashboardDao");

const DashboardRepository = {
  countAllProducts: () => DashboardDao.countProducts(),
  countProductsSince: (date) => DashboardDao.countProductsSince(date),
  countAllSuppliers: () => DashboardDao.countSuppliers(),
  countSuppliersSince: (date) => DashboardDao.countSuppliersSince(date),
  getOperationsSince: (date) => DashboardDao.getOperationsSince(date),
  findAllProducts: () => DashboardDao.findAllProducts(),
  findLastOperations: (limit) => DashboardDao.findLastOperations(limit),
  findOperationsByType: (type) => DashboardDao.findOperationsByType(type),
  findOperationsByYear: (year) => DashboardDao.findOperationsByYear(year)
};

module.exports = DashboardRepository;

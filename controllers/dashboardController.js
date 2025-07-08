const DashboardService = require("../services/dashboardService");
const { handleError } = require("../errors");

const getDashboardResumen = async (req, res) => {
    try {
        if (req.user.role !== 'admin') throw new Error("NOT_ALLOWED");

        const data = await DashboardService.getDashboardResumen();
        res.json(data);
    } catch (e) {
        handleError(res, e);
    }
};

const getProductStockStatus = async (req, res) => {
    try {
        if (req.user.role !== 'admin') throw new Error("NOT_ALLOWED");
        const data = await DashboardService.getProductStockStatus();
        res.json(data);
    } catch (e) {
        handleError(res, e);
    }
};

const getUltimasOperaciones = async (req, res) => {
    try {
        if (req.user.role !== 'admin') throw new Error("NOT_ALLOWED");
        const data = await DashboardService.getUltimasOperaciones();
        res.json(data);
    } catch (e) {
        handleError(res, e);
    }
};

const getTopProductos = async (req, res) => {
    try {
      if (req.user.role !== 'admin') throw new Error("NOT_ALLOWED");
      const data = await DashboardService.getTopProductos();
      res.json(data);
    } catch (e) {
      handleError(res, e);
    }
  };

  const getPedidosDevolucionesMensual = async (req, res) => {
    try {
      if (req.user.role !== 'admin') throw new Error("NOT_ALLOWED");
      const data = await DashboardService.getPedidosDevolucionesMensual();
      res.json(data);
    } catch (e) {
      handleError(res, e);
    }
  };

module.exports = {
    getDashboardResumen,
    getProductStockStatus,
    getUltimasOperaciones,
    getTopProductos,
    getPedidosDevolucionesMensual
};

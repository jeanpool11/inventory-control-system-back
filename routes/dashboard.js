const express = require("express");
const router = express.Router();

const { getDashboardResumen, getProductStockStatus, getUltimasOperaciones, getTopProductos, getPedidosDevolucionesMensual } = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");

// tarjetas de resumen
router.get("/resumen", authMiddleware, getDashboardResumen);

// Estado de stock
router.get("/stock-status", authMiddleware, getProductStockStatus);

// ultimas operaciones
router.get("/ultimas-operaciones", authMiddleware, getUltimasOperaciones);


router.get("/top-productos", authMiddleware, getTopProductos);

router.get("/pedidos-devoluciones-mensual", authMiddleware, getPedidosDevolucionesMensual);




module.exports = router;

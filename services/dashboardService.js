const { DashboardRepository } = require("../repositories");

const getDashboardResumen = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const totalProducts = await DashboardRepository.countAllProducts();
  const productsThisMonth = await DashboardRepository.countProductsSince(startOfMonth);
  const productGrowth = totalProducts ? ((productsThisMonth / totalProducts) * 100).toFixed(2) : 0;

  const totalSuppliers = await DashboardRepository.countAllSuppliers();
  const suppliersThisWeek = await DashboardRepository.countSuppliersSince(startOfWeek);

  const operacionesHoy = await DashboardRepository.getOperationsSince(startOfDay);
  const ingresosHoy = operacionesHoy.filter(op => op.type === 'devolucion').length;
  const salidasHoy = operacionesHoy.filter(op => op.type === 'pedido').length;

  const operacionesMes = await DashboardRepository.getOperationsSince(startOfMonth);
  const productosSet = new Set();
  operacionesMes.forEach(op => {
    if (op.product) {
      productosSet.add(op.product.toString());
    }
  });

  return {
    totalProducts,
    productsThisMonth,
    productGrowth: Number(productGrowth),
    totalSuppliers,
    suppliersThisWeek,
    operacionesHoy: operacionesHoy.length,
    ingresosHoy,
    salidasHoy,
    productosMovilizadosEsteMes: productosSet.size
  };
};

const getProductStockStatus = async () => {
  const productos = await DashboardRepository.findAllProducts();

  let critico = 0, moderado = 0, suficiente = 0;

  productos.forEach(p => {
    if (p.stock <= p.minStock) {
      critico++;
    } else if (p.stock > p.minStock && p.stock <= p.maxStock) {
      moderado++;
    } else if (p.stock > p.maxStock) {
      suficiente++;
    }
  });

  return { critico, moderado, suficiente };
};

const getUltimasOperaciones = async () => {
    const operaciones = await DashboardRepository.findLastOperations(5);
  
    return operaciones.map(op => ({
      producto: op.product?.name || "Desconocido",
      tipo: op.type === 'pedido' ? 'Pedido' : 'Devolución',
      codigo: op.code,
      fecha: formatFecha(op.createdAt),
      cantidad: op.quantity,
      descripcion: op.description
    }));
  };
  
  // Función auxiliar para formatear la fecha
  function formatFecha(fecha) {
    const d = new Date(fecha);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const anio = d.getFullYear();
    const hora = String(d.getHours()).padStart(2, '0');
    const minuto = String(d.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${anio} ${hora}:${minuto}`;
  }

  const getTopProductos = async () => {
    const pedidos = await DashboardRepository.findOperationsByType("pedido");
    const devoluciones = await DashboardRepository.findOperationsByType("devolucion");
  
    const pedidosTotales = pedidos.reduce((sum, op) => sum + op.quantity, 0);
    const devolucionesTotales = devoluciones.reduce((sum, op) => sum + op.quantity, 0);
  
    const contarPorProducto = (ops, total) => {
      const contador = {};
  
      ops.forEach(op => {
        const id = op.product?._id?.toString();
        const nombre = op.product?.name || "Desconocido";
        if (!id) return;
        if (!contador[id]) {
          contador[id] = { nombre, cantidad: 0 };
        }
        contador[id].cantidad += op.quantity;
      });
  
      // Convertimos en array y ordenamos
      return Object.values(contador)
        .sort((a, b) => b.cantidad - a.cantidad)
        .slice(0, 5)
        .map(p => ({
          nombre: p.nombre,
          cantidad: p.cantidad,
          porcentaje: total ? Number(((p.cantidad / total) * 100).toFixed(2)) : 0
        }));
    };
  
    return {
      pedidos: contarPorProducto(pedidos, pedidosTotales),
      devoluciones: contarPorProducto(devoluciones, devolucionesTotales)
    };
  };

  const getPedidosDevolucionesMensual = async () => {
    const year = new Date().getFullYear();
    const pedidosPorMes = Array(12).fill(0);
    const devolucionesPorMes = Array(12).fill(0);
  
    const operaciones = await DashboardRepository.findOperationsByYear(year);
  
    operaciones.forEach(op => {
      const mes = new Date(op.createdAt).getMonth(); // 0 = enero
      if (op.type === "pedido") {
        pedidosPorMes[mes] += op.quantity;
      } else if (op.type === "devolucion") {
        devolucionesPorMes[mes] += op.quantity;
      }
    });
  
    return {
      pedidosData: pedidosPorMes,
      devolucionesData: devolucionesPorMes,
      meses: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    };
  };
  
  

  

module.exports = {
  getDashboardResumen,
  getProductStockStatus,
  getUltimasOperaciones,
  getTopProductos,
  getPedidosDevolucionesMensual
};

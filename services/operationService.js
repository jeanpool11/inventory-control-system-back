const { OperationRepository, ProductRepository } = require('../repositories');

const createOperation = async ({ type, product, quantity, description }) => {
  // 1. Verificar existencia de producto
  const productDoc = await ProductRepository.findById(product);
  if (!productDoc) throw new Error('PRODUCT_NOT_FOUND');

  // 2. Validar stock si es pedido
  if (type === 'pedido' && productDoc.stock < quantity)
    throw new Error('STOCK_INSUFFICIENT');

  // 3. Ajustar stock
  const updated =
    type === 'pedido'
      ? await ProductRepository.decreaseStock(product, quantity)
      : await ProductRepository.increaseStock(product, quantity);

  // 4. Generar código correlativo
  const count = await OperationRepository.countAll();
  const newCode = `OP-${(count + 1).toString().padStart(4, '0')}`;

  // 5. Crear operación
  const data = await OperationRepository.create({
    code: newCode,
    type,
    product,
    quantity,
    description,
  });

  return { data, newStock: updated.stock };
};

const getOperations = () => OperationRepository.findAllWithProduct();

module.exports = {
  createOperation,
  getOperations,
};

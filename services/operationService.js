const { OperationRepository, ProductRepository } = require('../repositories');

const createOperation = async ({ type, product, quantity, description }) => {
  const productDoc = await ProductRepository.findById(product);
  if (!productDoc) throw new Error('PRODUCT_NOT_FOUND');

  if (type === 'pedido' && productDoc.stock < quantity)
    throw new Error('STOCK_INSUFFICIENT');

  const updated =
    type === 'pedido'
      ? await ProductRepository.decreaseStock(product, quantity)
      : await ProductRepository.increaseStock(product, quantity);

  const count = await OperationRepository.countAll();
  const newCode = `OP-${(count + 1).toString().padStart(4, '0')}`;

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

const softDeleteOperation = async (id) => {
  const operation = await OperationRepository.findById(id);
  if (!operation || operation.deleted) throw new Error('OPERATION_NOT_FOUND_OR_ALREADY_DELETED');

  // Revertir efecto en stock
  if (operation.type === 'pedido') {
    await ProductRepository.increaseStock(operation.product._id, operation.quantity);
  } else {
    await ProductRepository.decreaseStock(operation.product._id, operation.quantity);
  }

  await OperationRepository.softDeleteById(id);

  return { message: 'Operación eliminada lógicamente y stock ajustado' };
};

const restoreOperation = async (id) => {
  const operation = await OperationRepository.findById(id);
  if (!operation || !operation.deleted) throw new Error('OPERATION_NOT_FOUND_OR_NOT_DELETED');

  const productDoc = await ProductRepository.findById(operation.product._id);
  if (!productDoc) throw new Error('PRODUCT_NOT_FOUND');

  if (operation.type === 'pedido') {
    if (productDoc.stock < operation.quantity)
      throw new Error('STOCK_INSUFFICIENT');
    await ProductRepository.decreaseStock(operation.product._id, operation.quantity);
  } else {
    await ProductRepository.increaseStock(operation.product._id, operation.quantity);
  }

  await OperationRepository.restoreById(id);

  return { message: 'Operación restaurada y stock ajustado' };
};

const deleteOperationPermanently = async (id) => {
  const operation = await OperationRepository.findById(id);
  if (!operation) throw new Error('OPERATION_NOT_FOUND');

  // Revertir efecto en stock
  if (operation.type === 'pedido') {
    await ProductRepository.increaseStock(operation.product._id, operation.quantity);
  } else {
    await ProductRepository.decreaseStock(operation.product._id, operation.quantity);
  }

  await OperationRepository.deleteOneById(id);

  return { message: 'Operación eliminada permanentemente y stock ajustado' };
};

const getAllOperations = () => OperationRepository.findAllIncludingDeleted();


module.exports = {
  createOperation,
  getOperations,
  getAllOperations,
  softDeleteOperation,
  restoreOperation,
  deleteOperationPermanently
};

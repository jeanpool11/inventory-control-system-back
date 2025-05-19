const engine = process.env.DB_ENGINE || 'nosql';

const pathRepo = engine === 'mysql' ? './sql' : './nosql';

const repositories = {
  UserRepository: require(`${pathRepo}/userRepository`),
  SupplierRepository: require(`${pathRepo}/supplierRepository`),
  ProductRepository: require(`${pathRepo}/productRepository`),
  OperationRepository: require(`${pathRepo}/operationRepository`),
};

module.exports = repositories;

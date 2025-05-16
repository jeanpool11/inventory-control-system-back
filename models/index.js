const engine = process.env.DB_ENGINE || null;

const pathModel = engine === "mysql" ? "./sql" : "./nosql"

const models = {
  UserModel: require(`${pathModel}/user`),
  SupplierModel: require(`${pathModel}/supplier`),
  ProductModel: require(`${pathModel}/product`),
  OperationModel: require(`${pathModel}/operation`)
};


module.exports = models;
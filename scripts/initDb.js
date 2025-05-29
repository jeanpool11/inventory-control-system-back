const MongoDataSource = require("../config/mongo");
const { encrypt } = require("../utils/handleJwt");

const User = require("../models/nosql/user");
const Supplier = require("../models/nosql/supplier");
const Product = require("../models/nosql/product");
const Operation = require("../models/nosql/operation");

(async () => {
  try {
    await MongoDataSource.getInstance();

    // Crear usuario válido
    const userCount = await User.estimatedDocumentCount();
    if (userCount === 0) {
      const userData = {
        name: "Administrador",
        phone: "987654321",
        email: "admin@correo.com",
        password: await encrypt("claveSegura1"), // 13 caracteres
        role: "admin"
      };

      await User.create(userData);
      console.log("✅ Usuario creado correctamente");
    }

    // Crear proveedor válido
    const supplierCount = await Supplier.estimatedDocumentCount();
    let supplier;
    if (supplierCount === 0) {
      const supplierData = {
        name: "Distribuidora Central",
        phone: "123456789",
        email: "distribuidor@correo.com",
        address: "Av. Siempre Viva 742",
        ruc: "12345678901"
      };

      supplier = await Supplier.create(supplierData);
      console.log("✅ Proveedor creado correctamente");
    } else {
      supplier = await Supplier.findOne();
    }

    // Crear producto válido
    const productCount = await Product.estimatedDocumentCount();
    let product;
    if (productCount === 0) {
      const productData = {
        code: "PRD001",
        name: "Cereal Avena",
        description: "Paquete de 500g de avena integral",
        price: 9.99,
        stock: 100,
        minStock: 20,
        maxStock: 200,
        supplier: supplier._id
      };

      product = await Product.create(productData);
      console.log("✅ Producto creado correctamente");
    } else {
      product = await Product.findOne();
    }

    // Crear operación válida
    const operationCount = await Operation.estimatedDocumentCount();
    if (operationCount === 0) {
      const operationData = {
        code: "OP001",
        type: "pedido",
        product: product._id,
        quantity: 10,
        description: "Pedido inicial de cereal avena"
      };

      await Operation.create(operationData);
      console.log("✅ Operación creada correctamente");
    }

    await MongoDataSource.disconnect();
    console.log("🟢 Inicialización finalizada con éxito");
  } catch (error) {
    console.error("❌ Error durante la inicialización:", error.message);
    process.exit(1);
  }
})();

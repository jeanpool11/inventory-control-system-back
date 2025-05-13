const mongoose = require("mongoose");

const dbConnect = async () => {
  const DB_URI = process.env.DB_URI;
  try {
    await mongoose.connect(DB_URI);
    console.log("**** CONEXIÓN CORRECTA ****");
  } catch (err) {
    console.error("***** ERROR DE CONEXIÓN ****", err.message);
  }
};

module.exports = dbConnect;


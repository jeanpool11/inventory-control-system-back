const { encrypt } = require("../utils/handleJwt");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../utils/handleError");

const { UserModel } = require("../models");
const { matchedData } = require("express-validator");

// Crear vendedor
const createSeller = async (req, res) => {
  try {
    const body = matchedData(req);
    const exists = await UserModel.findOne({ email: body.email });
    if (exists) return handleErrorResponse(res, "SELLER_EXISTS", 409);

    const password = await encrypt(body.password);
    const data = await UserModel.create({ ...body, password });
    res.status(201).json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const updateSeller = async (req, res) => {
    try {
      const { id } = req.params;
      const body = matchedData(req);
  
      // Eliminar el campo 'role' si se envía
      if (body.role) delete body.role;
  
      // Si actualiza la contraseña, la encriptamos
      if (body.password) {
        body.password = await encrypt(body.password);
      }
  
      const data = await UserModel.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
  
      if (!data) return handleErrorResponse(res, "SELLER_NOT_FOUND", 404);
  
      res.json({ message: "Vendedor actualizado", data });
    } catch (e) {
      handleHttpError(res, e);
    }
  };
  

// Listar solo vendedores activos (no eliminados lógicamente)
const getSellers = async (req, res) => {
    try {
      const data = await UserModel.find({ deleted: { $ne: true } }); // solo activos
      res.json({ data });
    } catch (e) {
      handleHttpError(res, e);
    }
  };
  

// Eliminación lógica
const softDeleteSeller = async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.delete({ _id: id });
    res.json({ message: "Vendedor eliminado lógicamente" });
  } catch (e) {
    handleHttpError(res, e);
  }
};

// Eliminación física
const hardDeleteSeller = async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.deleteOne({ _id: id });
    res.json({ message: "Vendedor eliminado permanentemente" });
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = {
  createSeller,
  updateSeller,
  getSellers,
  softDeleteSeller,
  hardDeleteSeller,
};

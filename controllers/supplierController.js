const { handleHttpError, handleErrorResponse} = require("../utils/handleError");

const { SupplierModel } = require("../models");
const { matchedData } = require("express-validator");

// Crear vendedor
const createSupplier = async (req, res) => {
  try {
    const body = matchedData(req);

    // Verificar si el vendedor ya existe
    const exists = await SupplierModel.findOne({ email: body.email });
    if (exists) return handleErrorResponse(res, "SUPPLIER_EXISTS", 409);

    const data = await SupplierModel.create(body);
    res.status(201).json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

// Actualizar vendedor
const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const body = matchedData(req);

    const data = await SupplierModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!data) return handleErrorResponse(res, "SUPPLIER_NOT_FOUND", 404);

    res.json({ message: "Vendedor actualizado", data });
  } catch (e) {
    handleHttpError(res, e);
  }
};


// Obtener todos los vendedores (solo los activos, no eliminados lógicamente)
const getSuppliers = async (req, res) => {
  try {
    const data = await SupplierModel.find({ deleted: { $ne: true } }); // Solo activos
    res.json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

// Eliminación lógica (marca como eliminado sin eliminar físicamente)
const softDeleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await SupplierModel.delete({ _id: id });

    if (!data) return handleErrorResponse(res, "SUPPLIER_NOT_FOUND", 404);

    res.json({ message: "Vendedor eliminado lógicamente" });
  } catch (e) {
    handleHttpError(res, e);
  }
};

// Eliminación física (elimina permanentemente del DB)
const hardDeleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await SupplierModel.deleteOne({ _id: id });

    if (!data) return handleErrorResponse(res, "SUPPLIER_NOT_FOUND", 404);

    res.json({ message: "Vendedor eliminado permanentemente" });
  } catch (e) {
    handleHttpError(res, e);
  }
};



module.exports = {
  createSupplier,
  updateSupplier,
  getSuppliers,
  softDeleteSupplier,
  hardDeleteSupplier,
};

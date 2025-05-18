// daos/userDao.js
//--------------------------------------------------------------------
//  Encapsula TODA la interacción con Mongoose para la entidad “User”
//--------------------------------------------------------------------
const UserModel = require('../models/nosql/user');

class UserDao {
  /* --------------------------------------------------------------- */
  /*  Lectura                                                       */
  /* --------------------------------------------------------------- */

  /**
   * Busca un usuario por e-mail.
   * @param {string} email
   * @returns {Promise<object|null>}
   */
  static findByEmail(email) {
    return UserModel.findOne({ email }).lean();
  }

  /**
   * Devuelve todos los usuarios no eliminados lógicamente.
   * @param {object} [queryExtras] – filtros adicionales
   * @returns {Promise<object[]>}
   */
  static findActive(queryExtras = {}) {
    return UserModel.find({ deleted: { $ne: true }, ...queryExtras }).lean();
  }

  /**
   * Obtiene un documento por ID (incluye borrados).
   * @param {string} id
   * @returns {Promise<object|null>}
   */
  static findById(id) {
    return UserModel.findById(id).lean();
  }

  /* --------------------------------------------------------------- */
  /*  Creación                                                       */
  /* --------------------------------------------------------------- */

  /**
   * Crea un usuario.
   * @param {object} data
   * @returns {Promise<object>} documento creado
   */
  static create(data) {
    return UserModel.create(data);
  }

  /* --------------------------------------------------------------- */
  /*  Actualización                                                  */
  /* --------------------------------------------------------------- */

  /**
   * Actualiza campos y retorna el doc actualizado.
   * @param {string} id
   * @param {object} update
   * @returns {Promise<object|null>}
   */
  static updateById(id, update) {
    return UserModel.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).lean();
  }

  /* --------------------------------------------------------------- */
  /*  Eliminación lógica / física                                    */
  /* --------------------------------------------------------------- */

  /** Elimina lógicamente (usa mongoose-delete). */
  static softDeleteById(id) {
    return UserModel.delete({ _id: id });
  }

  /** Elimina permanentemente de la colección. */
  static hardDeleteById(id) {
    return UserModel.deleteOne({ _id: id });
  }
}

module.exports = UserDao;

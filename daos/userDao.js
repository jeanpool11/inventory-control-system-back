const { UserModel } = require('../models');

class UserDao {

  static findByEmail(email) {
    return UserModel.findOne({ email, deleted: { $ne: true } }).lean();
  }
  

  static findActive({ skip = 0, limit = 10, search = '', ...queryExtras }) {
    const searchQuery = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },    // Búsqueda en nombre
        { email: { $regex: search, $options: 'i' } },   // Búsqueda en email
        { phone: { $regex: search, $options: 'i' } }    // Búsqueda en teléfono como texto
      ]
    } : {};
  
    return Promise.all([
      UserModel.find({ 
        deleted: { $ne: true },
        ...searchQuery,
        ...queryExtras 
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
      
      UserModel.countDocuments({ 
        deleted: { $ne: true },
        ...searchQuery,
        ...queryExtras 
      })
    ]).then(([users, totalCount]) => ({
      data: users,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: Math.floor(skip / limit) + 1
    }));
  }

  static findAll({ skip = 0, limit = 10, search = '', sort = 'createdAt', direction = 'desc', ...queryExtras }) {
    const searchQuery = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ]
    } : {};
  
    const filterQuery = {
      ...searchQuery,
      ...queryExtras
    };
  
    const sortQuery = { [sort]: direction === 'asc' ? 1 : -1 };
  
    return Promise.all([
      // Usar el método especial del plugin para incluir eliminados
      UserModel.findWithDeleted(filterQuery)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .lean(),
  
      // Contar incluyendo eliminados
      UserModel.countDocumentsWithDeleted(filterQuery)
    ]).then(([users, totalCount]) => ({
      data: users,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: Math.floor(skip / limit) + 1
    }));
  }
  

  static restoreById(id) {
    return UserModel.restore({ _id: id });
  }

  static findById(id) {
    return UserModel.findById(id).lean();
  }

  static create(data) {
    return UserModel.create(data);
  }

  static updateById(id, update) {
    return UserModel.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).lean();
  }

  static softDeleteById(id) {
    return UserModel.delete({ _id: id });
  }

  static hardDeleteById(id) {
    return UserModel.deleteOne({ _id: id });
  }

  static findByEmailWithoutDeleted(email) {
    return UserModel.findOne({ email }).lean();
  }
  
}

module.exports = UserDao;

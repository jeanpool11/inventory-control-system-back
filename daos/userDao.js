const { UserModel } = require('../models');

class UserDao {

  static findByEmail(email) {
    return UserModel.findOne({ email }).lean();
  }

  static findActive(queryExtras = {}) {
    return UserModel.find({ deleted: { $ne: true }, ...queryExtras }).lean();
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
}

module.exports = UserDao;

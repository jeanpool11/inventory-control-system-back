const { UserModel } = require('../models');

class UserDao {
  static findByEmail(email) {
    return UserModel.findOne({ email, deleted: { $ne: true } }).lean();
  }

  static findByEmailWithoutDeleted(email) {
    return UserModel.findOne({ email }).lean();
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

  static restoreById(id) {
    return UserModel.restore({ _id: id });
  }

  static findAllActiveRaw() {
    return UserModel.find({ deleted: { $ne: true } }).sort({ createdAt: -1 }).lean();
  }

  static findAllWithDeletedRaw() {
    return UserModel.findWithDeleted({}).sort({ createdAt: -1 }).lean();
  }
}

module.exports = UserDao;

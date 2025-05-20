const { compare } = require('../utils/handleJwt');
const { tokenSign } = require('../utils/handleToken');
const { UserRepository } = require('../repositories');

const loginUser = async (email, plainPassword) => {
  const user = await UserRepository.findByEmail(email);
  if (!user) throw new Error('USER_NOT_EXISTS');

  const isCorrect = await compare(plainPassword, user.password);
  if (!isCorrect) throw new Error('PASSWORD_INVALID');

  const token = await tokenSign({ _id: user._id, role: user.role });

  const { password, ...userSafe } = user; // lo haces aquí una sola vez

  return { token, user: userSafe };
};

module.exports = { loginUser };

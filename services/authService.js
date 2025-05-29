const { compare } = require('../utils/handleJwt');
const { tokenSign } = require('../utils/handleToken');
const { UserRepository } = require('../repositories');

const loginUser = async (email, plainPassword) => {
  // Buscar usuario sin importar deleted para saber si existe
  const userExist = await UserRepository.findByEmailWithoutDeleted(email);
  if (!userExist) throw new Error('USER_NOT_EXISTS');

  // Buscar usuario activo
  const user = await UserRepository.findByEmail(email);
  if (!user) throw new Error('USER_INACTIVE'); // O cualquier otro mensaje

  const isCorrect = await compare(plainPassword, user.password);
  if (!isCorrect) throw new Error('PASSWORD_INVALID');

  const token = await tokenSign({ _id: user._id, role: user.role });

  const { password, ...userSafe } = user;

  return { token, user: userSafe };
};

module.exports = { loginUser };

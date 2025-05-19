const { compare } = require('../utils/handleJwt');
const { tokenSign } = require('../utils/handleToken');
const { UserRepository } = require('../repositories');

const loginUser = async (email, plainPassword) => {
  const user = await UserRepository.findByEmail(email);
  if (!user) throw new Error('USER_NOT_EXISTS');

  const isCorrect = await compare(plainPassword, user.password);
  if (!isCorrect) throw new Error('PASSWORD_INVALID');

  const token = await tokenSign(user);

  return { token, user };
};

module.exports = { loginUser };

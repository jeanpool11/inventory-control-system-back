const engine = process.env.DB_ENGINE || 'nosql';

const pathRepo = engine === 'mysql' ? './sql' : './nosql';

const repositories = {
  UserRepository: require(`${pathRepo}/userRepository`)
};

module.exports = repositories;

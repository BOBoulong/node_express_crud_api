const getAllUsers = 'SELECT * FROM users';
const getUserById = 'SELECT * FROM users WHERE id = $1';
const checkEmailExists = 'SELECT s FROM users s WHERE s.email = $1';
const createUser =
  'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
const updateUser =
  'UPDATE users SET name = $1, email = $2, password = $3 WHERE id =$4';
const removeUser = 'DELETE FROM users WHERE id = $1';

module.exports = {
  getAllUsers,
  getUserById,
  checkEmailExists,
  createUser,
  updateUser,
  removeUser,
};

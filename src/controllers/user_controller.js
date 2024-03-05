const pool = require('../config/db');
const queries = require('../utils/queries');

// Get all user
const getAllUsers = (req, res) => {
  pool.query(queries.getAllUsers, (error, results) => {
    if (error) throw error;
    console.log(`${results.length} users retrieved`);
    res.status(200).json(results);
  });
};

// Get user by id
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUserById, [id], (error, result) => {
    if (error || result.rows.length === 0) {
      return res.status(400).send({
        message: `No user with the id ${id}`,
      });
    } else {
      res.status(200).json(result.rows[0]);
    }
  });
};

// Create user
const createUser = (req, res) => {
  const { name, email, password } = req.body;

  // Check for required fields
  if (!name || !email || !password) {
    return res.status(400).send({
      status: 'fail',
      message: 'Please provide all the required fields',
    });
  }

  // Check if email exists
  pool.query(queries.checkEmailExists, [email], (error, result) => {
    if (result.rows.length) {
      return res.status(409).send({
        status: 'conflict',
        message: 'This email already exists',
      });
    }

    // Add user to DB
    pool.query(queries.createUser, [name, email, password], (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send();
      } else {
        res.status(201).send({ message: `User created successfully.` });
      }
    });
  });
};

// Update user information
const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, password } = req.body;
  pool.query(queries.getUserById, [id], (error, result) => {
    const noUserFound = !result.rows.length;
    if (noUserFound) {
      return res.status(404).send({ message: 'No user found' });
    }
    pool.query(
      queries.updateUser,
      [name, email, password, id],
      (error, results) => {
        if (error) {
          console.error('Error updating user:', error);
          res.status(400).send(error.message || 'Update failed');
        } else {
          res.status(200).json({ message: 'Update successful.' });
        }
      }
    );
  });
};

// Remove User
const removeUser = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUserById, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      return res.status(404).send({
        message:
          'No user with such ID was found. Please check the provided ID and try again.',
      });
    }
    pool.query(queries.removeUser, [id], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send({ message: `Error removing user ${id}` });
      } else {
        res.status(200).json({
          message: `User Id No. ${id} has been removed from the database.`,
        });
      }
    });
  });
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};

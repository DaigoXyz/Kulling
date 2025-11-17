const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  logout
} = require('../controllers/userController');

// GET semua user
router.get('/', getAllUsers);

// GET user by ID
router.get('/:id', getUserById);

// UPDATE user + detail
router.put('/:id', updateUser);

// DELETE user
router.delete('/:id', deleteUser);

// LOGOUT
router.post('/logout', logout);

module.exports = router;

const db = require('../config/db');

exports.getAllUsers = (req, res) => {
  db.query('SELECT id_user, nama, username, role FROM users', (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
};

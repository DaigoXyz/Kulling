const db = require('../config/db');

// Get all users (join users + users_detail)
exports.getAllUsers = (req, res) => {
  const query = `
    SELECT 
      u.id_user,
      u.nama,
      u.username,
      u.role,
      d.email,
      d.no_hp,
      d.alamat
    FROM users u
    LEFT JOIN users_detail d ON u.id_user = d.id_user
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
};

// Get user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT 
      u.id_user,
      u.nama,
      u.username,
      u.role,
      d.email,
      d.no_hp,
      d.alamat
    FROM users u
    LEFT JOIN users_detail d ON u.id_user = d.id_user
    WHERE u.id_user = ?
  `;

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.json(result[0]);
  });
};

// Update user profile + detail
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { nama, email, no_hp, alamat } = req.body;

  // Update table users
  const updateUsersQuery = `
    UPDATE users SET nama = ? WHERE id_user = ?
  `;

  db.query(updateUsersQuery, [nama, id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    // Update table users_detail
    const updateDetailQuery = `
      UPDATE users_detail 
      SET email = ?, no_hp = ?, alamat = ?
      WHERE id_user = ?
    `;

    db.query(updateDetailQuery, [email, no_hp, alamat, id], (err, detailResult) => {
      if (err) return res.status(500).json({ message: err.message });

      res.json({ message: 'Profil berhasil diperbarui' });
    });
  });
};

// Delete user
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  // Cek apakah user ada
  db.query('SELECT id_user FROM users WHERE id_user = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Hapus di users_detail dulu
    db.query('DELETE FROM users_detail WHERE id_user = ?', [id], (err) => {
      if (err) return res.status(500).json({ message: err.message });

      // Lalu hapus di users
      db.query('DELETE FROM users WHERE id_user = ?', [id], (err) => {
        if (err) return res.status(500).json({ message: err.message });

        res.json({ message: 'Akun berhasil dihapus' });
      });
    });
  });
};

// Logout
exports.logout = (req, res) => {
  res.json({ message: 'Logout berhasil' });
};

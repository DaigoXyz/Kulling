const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nama, username, password, role } = req.body;

  if (!nama || !username || !password) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.length > 0) return res.status(400).json({ message: 'Username sudah digunakan' });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (nama, username, password, role) VALUES (?, ?, ?, ?)',
      [nama, username, hashedPassword, role || 'pengguna'],
      (err2) => {
        if (err2) return res.status(500).json({ message: err2.message });
        res.status(201).json({ message: 'Registrasi berhasil' });
      }
    );
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.length === 0) return res.status(401).json({ message: 'Username tidak ditemukan' });

    const user = result[0];
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign(
      { id_user: user.id_user, role: user.role },
      process.env.JWT_SECRET || 'SECRET_KEY_JWT',
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Login berhasil',
      token,
      user: {
        id_user: user.id_user, 
        nama: user.nama,
        username: user.username,
        role: user.role
      }
    });
  });
};

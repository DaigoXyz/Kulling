const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // sesuaikan dengan MySQL kamu
  database: 'kulling' // ganti sesuai nama DB kamu
});

// Tes koneksi
db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL Database');
  }
});

// === ROUTES USERS ===

// Register
app.post('/api/register', async (req, res) => {
  const { nama, username, password, role } = req.body;

  if (!nama || !username || !password)
    return res.status(400).json({ message: 'Semua field wajib diisi' });

  // Cek apakah username sudah ada
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
    if (err) return res.status(500).json({ message: err });
    if (result.length > 0)
      return res.status(400).json({ message: 'Username sudah digunakan' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    db.query(
      'INSERT INTO users (nama, username, password, role) VALUES (?, ?, ?, ?)',
      [nama, username, hashedPassword, role || 'pengguna'],
      (err2, result2) => {
        if (err2) return res.status(500).json({ message: err2 });
        res.status(201).json({ message: 'Registrasi berhasil' });
      }
    );
  });
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
    if (err) return res.status(500).json({ message: err });
    if (result.length === 0)
      return res.status(401).json({ message: 'Username tidak ditemukan' });

    const user = result[0];
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(401).json({ message: 'Password salah' });

    // Buat token JWT
    const token = jwt.sign(
      { id_user: user.id_user, role: user.role },
      'SECRET_KEY_JWT', // ganti jadi env variable
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
});

// Get all users (opsional)
app.get('/api/users', (req, res) => {
  db.query('SELECT id_user, nama, username, role FROM users', (err, result) => {
    if (err) return res.status(500).json({ message: err });
    res.json(result);
  });
});

// === ROUTES DEMO LAMA (Foodtruck) ===
let foodtrucks = [
  { id: 1, name: 'Burger Bros', location: 'Jakarta', menu: ['Burger', 'Fries'] },
  { id: 2, name: 'Taco Town', location: 'Depok', menu: ['Taco', 'Nachos'] }
];

app.get('/api/foodtrucks', (req, res) => res.json(foodtrucks));

// Root
app.get('/', (req, res) => res.send('FoodTruck API + Users API running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

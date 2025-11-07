const db = require("../config/db");

// === GET semua menu ===
exports.getAllMenu = (req, res) => {
  db.query("SELECT * FROM menu", (err, result) => {
    if (err) {
      console.error("❌ SQL Error (getAllMenu):", err);
      return res.status(500).json({ message: err.message });
    }
    res.json(result);
  });
};

// === GET menu by ID ===
exports.getMenuById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM menu WHERE id_menu = ?", [id], (err, result) => {
    if (err) {
      console.error("❌ SQL Error (getMenuById):", err);
      return res.status(500).json({ message: err.message });
    }
    if (result.length === 0)
      return res.status(404).json({ message: "Menu tidak ditemukan" });
    res.json(result[0]);
  });
};

//create menu
exports.createMenu = (req, res) => {
  const { nama_menu, deskripsi, harga } = req.body;
  const gambar = req.file ? `/img/${req.file.filename}` : null; // simpan URL

  if (!nama_menu || !deskripsi || !harga || !gambar)
    return res.status(400).json({ message: "Semua field wajib diisi" });

  const sql = "INSERT INTO menu (nama_menu, deskripsi, harga, gambar) VALUES (?, ?, ?, ?)";
  db.query(sql, [nama_menu, deskripsi, harga, gambar], (err, result) => {
    if (err) {
      console.error("❌ SQL Error (createMenu):", err);
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json({ 
      message: "Menu berhasil ditambahkan", 
      id_menu: result.insertId,
      gambar_url: gambar
    });
  });
};

// === UPDATE menu ===
exports.updateMenu = (req, res) => {
  const { id } = req.params;
  const { nama_menu, deskripsi, harga } = req.body;
  const gambar = req.file ? `/img/${req.file.filename}` : req.body.gambar; // tetap bisa pakai URL lama

  const sql = "UPDATE menu SET nama_menu=?, deskripsi=?, harga=?, gambar=? WHERE id_menu=?";
  db.query(sql, [nama_menu, deskripsi, harga, gambar, id], (err, result) => {
    if (err) {
      console.error("❌ SQL Error (updateMenu):", err);
      return res.status(500).json({ message: err.message });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Menu tidak ditemukan" });
    res.json({ message: "Menu berhasil diperbarui", gambar_url: gambar });
  });
};


// === DELETE menu ===
exports.deleteMenu = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM menu WHERE id_menu = ?", [id], (err, result) => {
    if (err) {
      console.error("❌ SQL Error (deleteMenu):", err);
      return res.status(500).json({ message: err.message });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Menu tidak ditemukan" });
    res.json({ message: "Menu berhasil dihapus" });
  });
};

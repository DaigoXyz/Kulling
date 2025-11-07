const db = require("../config/db");

// === CREATE ===
exports.createBahan = (req, res) => {
  const { nama_bahan, stok } = req.body;

  if (!nama_bahan || stok == null) {
    return res.status(400).json({ message: "nama_bahan dan stok wajib diisi" });
  }

  const sql = "INSERT INTO bahan (nama_bahan, stok) VALUES (?, ?)";
  db.query(sql, [nama_bahan, stok], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    res.status(201).json({
      message: "Bahan berhasil ditambahkan",
      id_bahan: result.insertId,
      nama_bahan,
      stok,
    });
  });
};

// === READ ALL ===
exports.getAllBahan = (req, res) => {
  db.query("SELECT * FROM bahan ORDER BY id_bahan DESC", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json(results);
  });
};

// === READ BY ID ===
exports.getBahanById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM bahan WHERE id_bahan = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Bahan tidak ditemukan" });

    res.status(200).json(results[0]);
  });
};

// === UPDATE ===
exports.updateBahan = (req, res) => {
  const { id } = req.params;
  const { nama_bahan, stok } = req.body;

  const sql = "UPDATE bahan SET nama_bahan = ?, stok = ? WHERE id_bahan = ?";
  db.query(sql, [nama_bahan, stok, id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Bahan tidak ditemukan" });

    res.status(200).json({ message: "Data bahan berhasil diperbarui" });
  });
};

// === DELETE ===
exports.deleteBahan = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM bahan WHERE id_bahan = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Bahan tidak ditemukan" });

    res.status(200).json({ message: "Bahan berhasil dihapus" });
  });
};

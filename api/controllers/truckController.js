const db = require("../config/db");

// === GET semua truck ===
exports.getAllTrucks = (req, res) => {
  const sql = `
    SELECT t.*, u.nama AS petugas
    FROM truck t
    LEFT JOIN users u ON t.id_user = u.id_user
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("❌ SQL Error (getAllTrucks):", err);
      return res.status(500).json({ message: err.message });
    }
    res.json(result);
  });
};

// === GET truck by id ===
exports.getTruckById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM truck WHERE id_truck = ?", [id], (err, result) => {
    if (err) {
      console.error("❌ SQL Error (getTruckById):", err);
      return res.status(500).json({ message: err.message });
    }
    if (result.length === 0)
      return res.status(404).json({ message: "Truck tidak ditemukan" });
    res.json(result[0]);
  });
};

// === CREATE truck ===
exports.createTruck = (req, res) => {
  const { nama_truck, id_user, statusFT } = req.body;

  if (!nama_truck || !id_user || !statusFT)
    return res.status(400).json({ message: "nama_truck, id_user, dan statusFT wajib diisi" });

  // Cek apakah user dengan role petugas
  db.query("SELECT role FROM users WHERE id_user = ?", [id_user], (err, result) => {
    if (err) {
      console.error("❌ SQL Error (check user):", err);
      return res.status(500).json({ message: err.message });
    }
    if (result.length === 0)
      return res.status(404).json({ message: "User tidak ditemukan" });
    if (result[0].role !== "petugas")
      return res
        .status(403)
        .json({ message: "Hanya user dengan role 'petugas' yang bisa ditugaskan" });

    // Insert truck baru
    db.query(
      "INSERT INTO truck (nama_truck, id_user, statusFT) VALUES (?, ?, ?)",
      [nama_truck, id_user, statusFT],
      (err2, result2) => {
        if (err2) {
          console.error("❌ SQL Error (createTruck):", err2);
          return res.status(500).json({ message: err2.message });
        }
        res.status(201).json({
          message: "Truck berhasil ditambahkan",
          id_truck: result2.insertId,
        });
      }
    );
  });
};

// === UPDATE truck ===
exports.updateTruck = (req, res) => {
  const { id } = req.params;
  const { nama_truck, id_user, statusFT } = req.body;

  db.query(
    "UPDATE truck SET nama_truck = ?, id_user = ?, statusFT = ? WHERE id_truck = ?",
    [nama_truck, id_user, statusFT, id],
    (err, result) => {
      if (err) {
        console.error("❌ SQL Error (updateTruck):", err);
        return res.status(500).json({ message: err.message });
      }
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Truck tidak ditemukan" });
      res.json({ message: "Truck berhasil diperbarui" });
    }
  );
};

// === DELETE truck ===
exports.deleteTruck = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM truck WHERE id_truck = ?", [id], (err, result) => {
    if (err) {
      console.error("❌ SQL Error (deleteTruck):", err);
      return res.status(500).json({ message: err.message });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Truck tidak ditemukan" });
    res.json({ message: "Truck berhasil dihapus" });
  });
};

// === UPDATE status truck (buka/tutup aja) ===
exports.updateTruckStatus = (req, res) => {
  const { id } = req.params;
  const { statusFT } = req.body;

  if (!["buka", "tutup"].includes(statusFT))
    return res.status(400).json({ message: "Status tidak valid (buka/tutup)" });

  db.query(
    "UPDATE truck SET statusFT = ? WHERE id_truck = ?",
    [statusFT, id],
    (err, result) => {
      if (err) {
        console.error("❌ SQL Error (updateTruckStatus):", err);
        return res.status(500).json({ message: err.message });
      }
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Truck tidak ditemukan" });
      res.json({ message: `Status truck berhasil diubah ke '${statusFT}'` });
    }
  );
};

const db = require("../config/db");

// === CREATE order + detail ===
exports.createOrderWithDetails = (req, res) => {
  const { id_user, id_truck, items } = req.body;

  if (!id_user || !id_truck || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: "id_user, id_truck, dan items (array menu) wajib diisi",
    });
  }

  const tanggal_order = new Date().toISOString().slice(0, 10);
  const status_order = "menunggu";

  // 1️⃣ Simpan order utama
  const orderSql =
    "INSERT INTO orders (id_user, id_truck, tanggal_order, status_order) VALUES (?, ?, ?, ?)";
  db.query(orderSql, [id_user, id_truck, tanggal_order, status_order], (err, result) => {
    if (err) {
      console.error("❌ Error insert order:", err);
      return res.status(500).json({ message: err.message });
    }

    const id_order = result.insertId;

    // 2️⃣ Ambil harga menu
    const menuIds = items.map((item) => item.id_menu);
    const getHargaSql = `SELECT id_menu, harga FROM menu WHERE id_menu IN (?)`;
    db.query(getHargaSql, [menuIds], (err, hargaResult) => {
      if (err) {
        console.error("❌ Error ambil harga:", err);
        return res.status(500).json({ message: err.message });
      }

      const hargaMap = {};
      hargaResult.forEach((m) => (hargaMap[m.id_menu] = m.harga));

      // 3️⃣ Siapkan data detail
      const detailValues = items.map((item) => {
        const harga = hargaMap[item.id_menu] || 0;
        const total_harga = harga * item.jumlah;
        return [id_order, item.id_menu, item.jumlah, item.catatan || "", total_harga];
      });

      // 4️⃣ Masukkan ke tabel order_detail
      const detailSql =
        "INSERT INTO order_detail (id_order, id_menu, jumlah, catatan, total_harga) VALUES ?";
      db.query(detailSql, [detailValues], (err2) => {
        if (err2) {
          console.error("❌ Error insert detail:", err2);
          return res.status(500).json({ message: err2.message });
        }

        res.status(201).json({
          message: "Order dan detail berhasil dibuat",
          id_order,
          tanggal_order,
          total_item: items.length,
          details: detailValues.map((d) => ({
            id_menu: d[1],
            jumlah: d[2],
            catatan: d[3],
            total_harga: d[4],
          })),
        });
      });
    });
  });
};

// === READ: semua order + join detail ===
exports.getAllOrder = (req, res) => {
  const sql = `
    SELECT o.*, u.nama AS nama_user, t.nama_truck,
           od.id_detail, od.id_menu, m.nama_menu, od.jumlah, od.total_harga, od.catatan
    FROM orders o
    JOIN users u ON o.id_user = u.id_user
    JOIN truck t ON o.id_truck = t.id_truck
    LEFT JOIN order_detail od ON o.id_order = od.id_order
    LEFT JOIN menu m ON od.id_menu = m.id_menu
    ORDER BY o.id_order DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    res.status(200).json(results);
  });
};

// === READ: order by id ===
exports.getOrderById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT o.*, u.nama AS nama_user, t.nama_truck,
           od.id_detail, od.id_menu, m.nama_menu, od.jumlah, od.total_harga, od.catatan
    FROM orders o
    JOIN users u ON o.id_user = u.id_user
    JOIN truck t ON o.id_truck = t.id_truck
    LEFT JOIN order_detail od ON o.id_order = od.id_order
    LEFT JOIN menu m ON od.id_menu = m.id_menu
    WHERE o.id_order = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Order tidak ditemukan" });

    res.status(200).json(results);
  });
};

// === UPDATE status order ===
exports.updateStatusOrder = (req, res) => {
  const { id } = req.params;
  const { status_order } = req.body;

  const validStatus = ["menunggu", "diproses", "dikirim", "selesai"];
  if (!validStatus.includes(status_order)) {
    return res.status(400).json({ message: "Status order tidak valid" });
  }

  const sql = "UPDATE orders SET status_order = ? WHERE id_order = ?";
  db.query(sql, [status_order, id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Order tidak ditemukan" });

    res.status(200).json({ message: "Status order berhasil diperbarui" });
  });
};

// === DELETE order (hapus detail juga) ===
exports.deleteOrder = (req, res) => {
  const { id } = req.params;

  const deleteDetailSql = "DELETE FROM order_detail WHERE id_order = ?";
  const deleteOrderSql = "DELETE FROM orders WHERE id_order = ?";

  db.query(deleteDetailSql, [id], (err) => {
    if (err) return res.status(500).json({ message: err.message });

    db.query(deleteOrderSql, [id], (err2, result) => {
      if (err2) return res.status(500).json({ message: err2.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Order tidak ditemukan" });

      res.status(200).json({ message: "Order dan detail berhasil dihapus" });
    });
  });
};

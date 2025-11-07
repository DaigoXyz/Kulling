const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const menuController = require("../controllers/menuController");

// === Konfigurasi multer ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "img/"); // folder penyimpanan
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

// === Routes ===
router.get("/", menuController.getAllMenu);
router.get("/:id", menuController.getMenuById);
router.post("/", upload.single("gambar"), menuController.createMenu); // ⬅️ pakai upload
router.put("/:id", upload.single("gambar"), menuController.updateMenu);
router.delete("/:id", menuController.deleteMenu);

module.exports = router;

const express = require("express");
const router = express.Router();
const bahanController = require("../controllers/bahanController");

// CRUD Gudang (Bahan)
router.post("/", bahanController.createBahan);
router.get("/", bahanController.getAllBahan);
router.get("/:id", bahanController.getBahanById);
router.put("/:id", bahanController.updateBahan);
router.delete("/:id", bahanController.deleteBahan);

module.exports = router;

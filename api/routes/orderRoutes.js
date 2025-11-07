const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// CRUD routes
router.post("/", orderController.createOrderWithDetails);
router.get("/", orderController.getAllOrder);
router.get("/:id", orderController.getOrderById);
router.put("/:id", orderController.updateStatusOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;

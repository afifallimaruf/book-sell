const router = require("express").Router();
const { createOrder } = require("../controllers/order.controller");
const { verifyToken } = require("../utils/verifyToken");

router.post("/create-order", verifyToken, createOrder);

module.exports = router;

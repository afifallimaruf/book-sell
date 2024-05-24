const {
  logout,
  addToCart,
  removeCart,
} = require("../controllers/user.controller");
const { verifyToken } = require("../utils/verifyToken");
const router = require("express").Router();

router.post("/logout", logout);
router.post("/add-to-cart", verifyToken, addToCart);
router.get("/remove-cart", verifyToken, removeCart);

module.exports = router;

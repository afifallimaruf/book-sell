const {
  logout,
  addToCart,
  removeCart,
  updateUser,
} = require("../controllers/user.controller");
const { verifyToken } = require("../utils/verifyToken");
const router = require("express").Router();

router.post("/logout", logout);
router.post("/add-to-cart", verifyToken, addToCart);
router.get("/remove-cart", verifyToken, removeCart);
router.put("/update/:userId", verifyToken, updateUser);

module.exports = router;

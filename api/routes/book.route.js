const router = require("express").Router();
const { addBook } = require("../controllers/book.controller");
const { verifyToken } = require("../utils/verifyToken");

router.post("/add", verifyToken, addBook);

module.exports = router;

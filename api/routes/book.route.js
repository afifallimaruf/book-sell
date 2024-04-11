const router = require("express").Router();
const { addBook, getBooks } = require("../controllers/book.controller");
const { verifyToken } = require("../utils/verifyToken");

router.post("/add", verifyToken, addBook);
router.get("/get-books", getBooks);

module.exports = router;

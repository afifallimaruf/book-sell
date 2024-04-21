const router = require("express").Router();
const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
} = require("../controllers/book.controller");
const { verifyToken } = require("../utils/verifyToken");

router.post("/add", verifyToken, addBook);
router.get("/get-books", getBooks);
router.get("/get-book", getBookById);
router.post("/update/:bookId/:userId", verifyToken, updateBook);

module.exports = router;

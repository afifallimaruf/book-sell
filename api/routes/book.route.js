const router = require("express").Router();
const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");
const { verifyToken } = require("../utils/verifyToken");

router.post("/add", verifyToken, addBook);
router.get("/get-books", getBooks);
router.get("/get-book", getBookById);
router.put("/update/:bookId", verifyToken, updateBook);
router.delete("/delete/:bookId", verifyToken, deleteBook);

module.exports = router;

const Book = require("../models/book.model");
const errorHandler = require("../utils/error");

const addBook = async (req, res, next) => {
  const { title, author, category, price } = req.body;

  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to add the book"));
  }

  try {
    const newBook = new Book({
      title,
      author,
      category,
      price,
    });

    const bookSaved = await newBook.save();
    res.status(200).json(bookSaved);
  } catch (error) {
    next(error);
  }
};

module.exports = { addBook };

const Book = require("../models/book.model");
const errorHandler = require("../utils/error");

const addBook = async (req, res, next) => {
  const { title, author, categories, price, image } = req.body;

  if (!title || !author || !categories || !price || !image) {
    return next(errorHandler(400, "All fields are required"));
  }

  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to add the book"));
  }

  try {
    const newBook = new Book({
      title,
      author,
      categories,
      price,
      image,
    });

    const bookSaved = await newBook.save();
    res.status(200).json(bookSaved);
  } catch (error) {
    next(error);
  }
};

module.exports = { addBook };

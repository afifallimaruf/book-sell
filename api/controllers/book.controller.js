const Book = require("../models/book.model");
const errorHandler = require("../utils/error");

const addBook = async (req, res, next) => {
  const { title, author, categories, price, stock, image } = req.body;

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
      stock,
      image,
    });

    const bookSaved = await newBook.save();
    res.status(200).json(bookSaved);
  } catch (error) {
    next(error);
  }
};

const getBooks = async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 5;
  try {
    const books = await Book.find().skip(startIndex).limit(limit);

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  const bookId = req.query.bookId;
  try {
    const book = await Book.findById(bookId);

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  const { title, author, categories, price, stock, image } = req.body;

  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to update this product")
    );
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      {
        $set: {
          title,
          author,
          categories,
          price,
          stock,
          image,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

module.exports = { addBook, getBooks, getBookById, updateBook };

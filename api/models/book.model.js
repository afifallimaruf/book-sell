const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default:
        "https://library.pip-semarang.ac.id/assets/images/default-ebook.png",
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookCard from "./BookCard";

function Search() {
  const [books, setBooks] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const fetchBooks = async () => {
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `http://localhost:8080/api/book/get-books?${searchQuery}`
      );

      if (!res.ok) {
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setBooks(data);
      }
    };

    fetchBooks();
  }, [location.search]);

  return (
    <div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Search results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {books.length === 0 && (
            <p className="text-xl text-gray-500">No books found</p>
          )}
          {books && books.map((book) => <BookCard data={book} />)}
        </div>
      </div>
    </div>
  );
}

export default Search;

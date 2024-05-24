import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

function NewAdded() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchNewBooks = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/book/get-books?limit=3&order=dsc"
        );

        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
        } else {
          setBooks(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewBooks();
  }, []);
  return (
    <>
      <div className="mt-14">
        <div className="container">
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              New Books for you
            </p>
            <h1 className="text-3xl font-bold">New Books</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
            {books.map((book) => (
              <div key={book._id}>
                <BookCard data={book} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default NewAdded;

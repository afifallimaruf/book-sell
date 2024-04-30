import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookPage() {
  const [book, setBook] = useState([]);
  const [category, setCategory] = useState("");
  const { bookId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/book/get-book?bookId=${bookId}`
        );

        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
        } else {
          setBook(data);
          setCategory(data.categories[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [bookId]);

  return (
    <>
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
          <div className="flex flex-col gap-6 lg:w-2/4">
            <img
              src={book.image}
              alt=""
              className="w-[250px] h-[360px] aspect-square object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-4 lg:w-2/4">
            <div>
              <span className=" text-violet-600 font-semibold">
                #
                {category === "fiction"
                  ? "Fiction"
                  : category === "science-fiction"
                  ? "Science Fiction"
                  : category === "self-development"
                  ? "Self Development"
                  : category === "technology"
                  ? "Technology"
                  : "History"}
              </span>
              <h1 className="text-3xl font-bold">{book.title}</h1>
            </div>
            <h6 className="text-2xl font-semibold">Rp.{book.price}</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookPage;

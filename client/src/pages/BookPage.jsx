import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/user/userSlice.js";
import { numberToRupiah } from "../utils/numberToRupiah.js";

function BookPage() {
  const [book, setBook] = useState([]);
  const [category, setCategory] = useState("");
  const { bookId } = useParams();
  const dispatch = useDispatch();

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

  const handleClick = async () => {
    try {
      const request = await fetch(
        "http://localhost:8080/api/user/add-to-cart",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookId: bookId,
            image: book.image,
            title: book.title,
            price: book.price,
          }),
        }
      );
      const dataBook = await request.json();
      if (!request.ok) {
        console.log("Error");
      } else {
        dispatch(addToCart(dataBook.userCart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
          <div className="flex flex-col gap-6 items-center lg:w-2/4">
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
            <p className="text-gray-700">{book.description}</p>
            <h6 className="text-2xl font-semibold">
              {numberToRupiah(book.price)}
            </h6>
            <div className="flex flex-row items-center gap-12">
              <button
                onClick={handleClick}
                className="bg-slate-900 text-white font-semibold py-3 px-16 rounded-xl h-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookPage;

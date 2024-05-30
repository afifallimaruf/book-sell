import React from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/user/userSlice.js";
import { numberToRupiah } from "../utils/numberToRupiah.js";

function BookCard({ data }) {
  const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      const request = await fetch(
        "http://localhost:8080/api/user/add-to-cart",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookId: data._id,
            image: data.image,
            title: data.title,
            price: data.price,
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
    <div className="hover:scale-110 duration-200">
      <Card className="w-[300px]" data-aos="zoom-in">
        <div className="">
          <Link to={`/book/${data._id}`}>
            <img
              src={data.image}
              alt=""
              className="h-[100px] w-[100px] mx-auto"
            />
          </Link>
        </div>
        <h1 className="text-center font-semibold tracking-tight text-gray-900">
          {data.title}
        </h1>
        <p className="text-sm text-red-500 text-center">
          {data.author.length > 1 ? data.author[0] + " et al." : data.author}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900 ">
            {numberToRupiah(data.price)}
          </span>
          <button
            onClick={handleClick}
            className="flex items-center rounded-md bg-slate-900 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Add to cart
          </button>
        </div>
      </Card>
    </div>
  );
}

export default BookCard;

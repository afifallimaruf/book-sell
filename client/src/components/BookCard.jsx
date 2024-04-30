import React from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

function BookCard({ data }) {
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
            Rp.{data.price}
          </span>
          <button className="flex items-center rounded-md bg-slate-900 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            Add to cart
          </button>
        </div>
      </Card>
    </div>
  );
}

export default BookCard;

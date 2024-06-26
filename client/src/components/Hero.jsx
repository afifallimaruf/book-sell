import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import BgHero from "../assets/img.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/user/userSlice.js";
import { numberToRupiah } from "../utils/numberToRupiah.js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

function Hero() {
  const { currentUser } = useSelector((state) => state.user);
  const [books, setBooks] = useState([]);
  const [bookMainImg, setBookMainImg] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bgImage = {
    backgroundImage: `url(${BgHero})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
  };

  useEffect(() => {
    const getBooksForHero = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/book/get-books?limit=3"
        );

        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
        } else {
          setBooks(data);
          setBookMainImg(data[0]);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getBooksForHero();
  }, []);

  const handleClick = async () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      try {
        const request = await fetch(
          "http://localhost:8080/api/user/add-to-cart",
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookId: bookMainImg._id,
              image: bookMainImg.image,
              title: bookMainImg.title,
              price: bookMainImg.price,
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
    }
  };

  return (
    <>
      <div
        className="min-h-[550px] sm:min-h-[650px] bg-gray-100"
        style={bgImage}
      >
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* text-content */}
            <div
              data-aos-once="true"
              className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 items-center sm:text-left order-2 sm:order-1"
            >
              <h1
                data-aos="zoom-out"
                data-aos-duration="500"
                data-aos-once="true"
                className="text-5xl font-bold"
              >
                {bookMainImg.title}
              </h1>
              <p className="bg-clip-text text-transparent bg-primary">
                by {bookMainImg.author}
              </p>
              <p className="text-red-500">
                {numberToRupiah(bookMainImg.price)}
              </p>
              <div className="">
                <Button
                  onClick={handleClick}
                  className="bg-slate-900 rounded-full mt-4 hover:scale-105 duration-200"
                >
                  Add to cart
                </Button>
              </div>
            </div>
            {/* Image section */}
            <div className="min-h-[450px] flex justify-center items-center relative order-1 sm:order-2">
              {/* Main image */}
              <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
                <img
                  data-aos="zoom-in"
                  data-aos-once="true"
                  src={bookMainImg.image || <Skeleton />}
                  alt=""
                  className="w-[300px] h-[300px] sm:[h-450px] sm:w-[450px] sm:scale-125 object-contain mx-auto"
                />
              </div>
              {/* Other image */}
              <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute -bottom-4 lg:-right-1 bg-white rounded-full">
                {books.map((book) => (
                  <img
                    key={book._id}
                    src={book.image}
                    alt=""
                    className="max-w-[100px] h-[100px] object-contain hover:scale-110 duration-200"
                    onClick={() => {
                      setBookMainImg(book);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;

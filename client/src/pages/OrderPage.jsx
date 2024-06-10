import { Button } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { numberToRupiah } from "../utils/numberToRupiah";
import { numberToRupiah2 } from "../utils/numberToRupiah2";
import { removeCart } from "../redux/user/userSlice";
import useSnap from "../hooks/useSnap";

function OrderPage() {
  const { currentUser } = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const [snapShow, setSnapShow] = useState(false);

  const { snapPopup } = useSnap();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!firstName.trim()) {
      validationErrors.firstName = "first name is required";
    }
    if (!lastName.trim()) {
      validationErrors.lastName = "last name is required";
    }
    if (!email.trim()) {
      validationErrors.email = "email is required";
    }
    if (!address.trim()) {
      validationErrors.address = "address is required";
    }
    if (!phone.trim()) {
      validationErrors.phone = "phone is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const response = await fetch(
        "http://localhost:8080/api/order/create-order",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            address,
            phone,
            total: currentUser.total,
            delivFee: currentUser.deliveryFee,
            items: currentUser.userCart,
            userCartId: currentUser.userCart.id,
          }),
        }
      ).then((res) => res.json());

      console.log(response);

      if (response.message === "berhasil") {
        dispatch(removeCart(response.userCart));
        setSnapShow(true);
        snapPopup(response.token);
      }
    }
  };

  return (
    <>
      <div className="lg:grid grid-cols-3 lg:px-16 relative mt-32">
        <div className="col-span-2 p-4">
          <h1 className="font-semibold text-lg text-center">
            Delivery Information
          </h1>
          <form className="max-w-md mx-auto mt-6">
            <div className=""></div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="firstName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  onChange={(e) => {
                    errors.firstName = "";
                    setFirstName(e.target.value);
                  }}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  First Name
                </label>
                {errors.firstName && (
                  <span className="text-red-500 mt-1 block text-sm">
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="lastName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus: outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  onChange={(e) => {
                    errors.lastName = "";
                    setLastName(e.target.value);
                  }}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Last Name
                </label>
                {errors.lastName && (
                  <span className="text-red-500 mt-1 block text-sm">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                onChange={(e) => {
                  errors.email = "";
                  setEmail(e.target.value);
                }}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email Address
              </label>
              {errors.email && (
                <span className="text-red-500 mt-1 block text-sm">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="address"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                onChange={(e) => {
                  errors.address = "";
                  setAddress(e.target.value);
                }}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Address
              </label>
              {errors.address && (
                <span className="text-red-500 mt-1 block text-sm">
                  {errors.address}
                </span>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                onChange={(e) => {
                  errors.phone = "";
                  setPhone(e.target.value);
                }}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Phone
              </label>
              {errors.phone && (
                <span className="text-red-500 mt-1 block text-sm">
                  {errors.phone}
                </span>
              )}
            </div>
          </form>
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border">
            <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
            <hr />
            <div className="space-y-3 font-semibold mb-10">
              <div className="flex justify-between pt-3">
                <span>Subtotal</span>
                <span className="text-green-600">
                  {currentUser && currentUser.total === 0
                    ? numberToRupiah(currentUser.totalAfterDelete)
                    : numberToRupiah(currentUser.total)}
                </span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Delivery Fee</span>
                <span className="text-green-600">
                  {currentUser && numberToRupiah(currentUser.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between pt-3 font-bold">
                <span>Total</span>
                <span className="text-green-600">
                  {currentUser &&
                    numberToRupiah2(currentUser.total, currentUser.deliveryFee)}
                </span>
              </div>
            </div>
            <Button
              onClick={handleClick}
              className="w-full mt-5"
              gradientMonochrome="purple"
            >
              Proceed To Payment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderPage;

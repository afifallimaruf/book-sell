import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  getTotal,
  getTotalAfterDelete,
  getDeliveryFee,
  removeCart,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { numberToRupiah } from "../utils/numberToRupiah";
import { numberToRupiah2 } from "../utils/numberToRupiah2";

function CartPage() {
  const { currentUser } = useSelector((state) => state.user);
  const [prices] = useState([]);
  const [pricesAfterDelete] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalAfterDelete, setTotalAfterDelete] = useState(0);
  const [deleteCart, setDeleteCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idForDelete, setIdForDelete] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deliveryFee = 5000;

  const handleDelete = async () => {
    setShowModal(false);
    setDeleteCart(true);
    dispatch(getTotal(0));
    try {
      const res = await fetch(
        `http://localhost:8080/api/user/remove-cart?id=${idForDelete}`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(removeCart(data));
        data.map((product) => pricesAfterDelete.push(product.totalAmount));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_MIDTRANS_APP_URL_SNAP_JS);
    const getPrices = () => {
      currentUser.userCart.map((product) => prices.push(product.totalAmount));
    };

    const getTotal = () => {
      let totalPrice = 0;
      for (let i = 0; i < prices.length; i++) {
        totalPrice = totalPrice + prices[i];
      }
      setTotal(totalPrice);
    };

    const getTotalAfterDelete = () => {
      let totalPrice = 0;
      for (let i = 0; i < pricesAfterDelete.length; i++) {
        totalPrice = totalPrice + pricesAfterDelete[i];
      }
      setTotalAfterDelete(totalPrice);
    };

    getTotalAfterDelete();
    getPrices();
    getTotal();
  }, [currentUser.userCart, prices, pricesAfterDelete]);

  const handleClick = () => {
    deleteCart
      ? dispatch(getTotalAfterDelete(totalAfterDelete))
      : dispatch(getTotal(total));
    dispatch(getDeliveryFee(deliveryFee));
    navigate("/order");
  };

  return (
    <>
      <div>
        <div className="lg:grid grid-cols-3 lg:px-16 relative mt-8">
          <div className="col-span-2">
            <div className="table-auto overflow-x-scroll ml-8 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 ">
              {currentUser.userCart.length > 0 ? (
                <>
                  <Table hoverable className="shadow-md text-center">
                    <Table.Head>
                      <Table.HeadCell>Image</Table.HeadCell>
                      <Table.HeadCell>Title</Table.HeadCell>
                      <Table.HeadCell>Quantity</Table.HeadCell>
                      <Table.HeadCell>Price</Table.HeadCell>
                      <Table.HeadCell>Delete</Table.HeadCell>
                    </Table.Head>
                    {currentUser.userCart.map((product) => (
                      <>
                        <Table.Body key={product._id}>
                          <Table.Row>
                            <Table.Cell>
                              <img
                                src={product.image}
                                alt=""
                                className="lg:w-[100px] lg:h-[150px] object-cover"
                              />
                            </Table.Cell>
                            <Table.Cell>{product.title}</Table.Cell>
                            <Table.Cell>{product.quantity}</Table.Cell>
                            <Table.Cell>
                              {numberToRupiah(product.price)}
                            </Table.Cell>
                            <Table.Cell>
                              <div className="bg-red-400 text-white p-1 rounded-md">
                                <span
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setShowModal(true);
                                    setIdForDelete(product.id);
                                  }}
                                >
                                  Delete
                                </span>
                              </div>
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </>
                    ))}
                  </Table>
                </>
              ) : (
                <h1>No cart yet!</h1>
              )}
            </div>
          </div>
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
            <div className="border">
              <p className="uppercase font-bold opacity-60 pb-4">
                Price details
              </p>
              <hr />
              <div className="space-y-3 font-semibold mb-10">
                <div className="flex justify-between pt-3">
                  <span>Subtotal</span>
                  <span className="text-green-600">
                    {deleteCart
                      ? numberToRupiah(totalAfterDelete)
                      : numberToRupiah(total)}
                  </span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Delivery Fee</span>
                  <span className="text-green-600">
                    {numberToRupiah(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 font-bold">
                  <span>Total</span>
                  <span className="text-green-600">
                    {deleteCart
                      ? numberToRupiah2(totalAfterDelete, deliveryFee)
                      : numberToRupiah2(total, deliveryFee)}
                  </span>
                </div>
              </div>
              <Button
                onClick={handleClick}
                className="w-full mt-5"
                gradientMonochrome="purple"
              >
                Proceed To Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 w-14 h-14 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal">
              Are you sure want to delete this cart?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CartPage;

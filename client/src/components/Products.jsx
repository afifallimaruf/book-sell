import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function Products() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [showLess, setShowLess] = useState(false);
  const [bookIdToDelete, setBookIdToDelete] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchBooks = async () => {
        const response = await fetch(
          "http://localhost:8080/api/book/get-books",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.success === false) {
          console.log(data.message);
        } else {
          setBooks(data);
          if (data.length < 5) {
            setShowMore(false);
          }
        }
      };
      fetchBooks();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleShowMore = async () => {
    const startIndex = books.length;

    try {
      const res = await fetch(
        `http://localhost:8080/api/book/get-books?startIndex=${startIndex}`
      );

      const data = await res.json();

      if (res.ok) {
        if (data.length < 5) {
          setShowMore(false);
        }
        setBooks((prev) => [...prev, data[0]]);
        setShowLess(true);
        setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowLess = () => {
    setBooks(() => books.slice(0, books.length - 1));
    setShowLess(false);
    setShowMore(true);
  };

  const handleDelete = async () => {
    setShowModal(false);

    try {
      const res = await fetch(
        `http://localhost:8080/api/book/delete/${bookIdToDelete}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setBooks((prev) => prev.filter((book) => book._id !== bookIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll mt-4 ml-8 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 ">
      {currentUser.isAdmin && books.length > 0 ? (
        <>
          <Table hoverable className="shadow-md text-center" stripped="true">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Author</Table.HeadCell>
              <Table.HeadCell>Categories</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Stock</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>/<span>Delete</span>
              </Table.HeadCell>
            </Table.Head>
            {books.map((book) => (
              <Table.Body className="divide-y" key={book._id}>
                <Table.Row>
                  <Table.Cell>
                    {new Date(book.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={book.image}
                      alt=""
                      className="w-40 h-30 object-cover"
                    />
                  </Table.Cell>
                  <Table.Cell>{book.title}</Table.Cell>
                  <Table.Cell>{book.author}</Table.Cell>
                  <Table.Cell>{book.categories}</Table.Cell>
                  <Table.Cell>{book.price}</Table.Cell>
                  <Table.Cell>{book.stock}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-3">
                      <div className="bg-green-400 text-white p-1 rounded-md">
                        <Link to={`/update/${book._id}`}>Edit</Link>
                      </div>
                      <div className="bg-red-400 text-white p-1 rounded-md">
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setBookIdToDelete(book._id);
                          }}
                          className="cursor-pointer"
                        >
                          Delete
                        </span>
                      </div>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
          {showLess && (
            <button
              onClick={handleShowLess}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show less
            </button>
          )}
        </>
      ) : (
        <h1>No books yet!</h1>
      )}
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
              Are you sure want to delete this book?
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
    </div>
  );
}

export default Products;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function Products() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
        }
      };
      fetchBooks();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <div className="table-auto overflow-x-scroll mt-4 ml-8">
      {currentUser.isAdmin && books.length > 0 ? (
        <>
          <Table hoverable className="shadow-md" stripped>
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
            <Table.Body className="divide-y">
              {books.map((book) => {
                return (
                  <>
                    <Table.Row>
                      <Table.Cell>
                        {new Date(book.createdAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        <img
                          src={book.image}
                          alt=""
                          className="w-30 h-40 object-cover"
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
                              }}
                              className="cursor-pointer"
                            >
                              Delete
                            </span>
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  </>
                );
              })}
            </Table.Body>
          </Table>
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
              <Button color="failure">Yes, I'm sure</Button>
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

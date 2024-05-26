import React, { useEffect, useState } from "react";
import {
  Navbar,
  TextInput,
  Button,
  Dropdown,
  Avatar,
  Modal,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import Logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import { logoutSuccess } from "../redux/user/userSlice";

function HeaderComponent() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/user/logout", {
        credentials: "include",
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(logoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setToggleSearch(false);

    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const urlSearchQuery = urlParams.toString();
    navigate(`/search?${urlSearchQuery}`);
  };

  const handleClick = () => {
    setToggleSearch(true);
  };

  return (
    <>
      <Navbar className="border-b-2">
        <Navbar.Toggle />
        <Link to="/">
          <img src={Logo} alt="BookSell" className="w-20 rounded-md text-3xl" />
        </Link>
        <form className="" onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <Button
          onClick={handleClick}
          className="w-12 h-10 lg:hidden"
          color="grey"
          pill
        >
          <AiOutlineSearch />
        </Button>
        <div className="md:order-2 cursor-pointer relative">
          <span>
            <Link to="/user/cart">
              <IoCartOutline size={20} />
            </Link>
          </span>
          <div className="bg-red-600 text-white w-4 h-4 rounded-full p-1 flex items-center justify-center absolute -top-1 -right-2">
            <p className="text-xs">
              {currentUser && currentUser.userCart
                ? currentUser.userCart.length
                : 0}
            </p>
          </div>
        </div>
        {currentUser ? (
          <div className="md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  img={currentUser.profilePicture}
                  alt={currentUser.isAdmin ? "Admin" : "User"}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              {currentUser.isAdmin && (
                <Link to="/admin-panel?tab=add-book">
                  <Dropdown.Item>Admin</Dropdown.Item>
                </Link>
              )}
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown>
          </div>
        ) : (
          <>
            <div className="flex gap-2 md:order-2">
              <Link to="/login">
                <Button gradientDuoTone="redToYellow" outline>
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button gradientDuoTone="redToYellow">Register</Button>
              </Link>
            </div>
          </>
        )}
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Dropdown label="Category" inline>
            <Link to="/category/fiction">
              <Dropdown.Item>Fiction</Dropdown.Item>
            </Link>
            <Link to="/category/sci-fi">
              <Dropdown.Item>Sci-fi</Dropdown.Item>
            </Link>
            <Link to="/category/self-dev">
              <Dropdown.Item>Self Development</Dropdown.Item>
            </Link>
            <Link to="/category/tech">
              <Dropdown.Item>Technology</Dropdown.Item>
            </Link>
            <Link to="/category/history">
              <Dropdown.Item>History</Dropdown.Item>
            </Link>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>

      <Modal
        show={toggleSearch}
        size="md"
        onClose={() => setToggleSearch(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div>
            <form className="flex justify-center gap-4" onSubmit={handleSubmit}>
              <TextInput
                type="text"
                placeholder="Search...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" color="blue" pill>
                Search
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default HeaderComponent;

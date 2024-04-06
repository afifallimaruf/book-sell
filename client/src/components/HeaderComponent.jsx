import React from "react";
import { Navbar, TextInput, Button, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import Logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { logoutSuccess } from "../redux/user/userSlice";

function HeaderComponent() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log("Logout");
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
  return (
    <Navbar className="border-b-2">
      <Navbar.Toggle />
      <Link to="/">
        <img src={Logo} alt="BookSell" className="w-20 rounded-md text-3xl" />
      </Link>
      <form className="">
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="grey" pill>
        <AiOutlineSearch />
      </Button>
      <div className="md:order-2 cursor-pointer">
        <FaShoppingCart />
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
          <Dropdown.Item>Fiction</Dropdown.Item>
          <Dropdown.Item>Sci-fi</Dropdown.Item>
          <Dropdown.Item>Self Development</Dropdown.Item>
          <Dropdown.Item>History</Dropdown.Item>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HeaderComponent;

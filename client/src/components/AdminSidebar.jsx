import { Sidebar } from "flowbite-react";
import { React, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi";

function AdminSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabUrl = urlParams.get("tab");
    if (tabUrl) {
      setTab(tabUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/admin-panel?tab=add-book">
            <Sidebar.Item
              active={tab === "add-book"}
              icon={MdAddCircle}
              labelColor="dark"
              className="cursor-pointer"
            >
              Add Book
            </Sidebar.Item>
          </Link>
          <Link to="/admin-panel?tab=products">
            <Sidebar.Item
              active={tab === "products"}
              icon={HiShoppingBag}
              className="cursor-pointer"
            >
              Products
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default AdminSidebar;

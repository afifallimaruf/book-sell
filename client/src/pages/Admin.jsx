import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AddBook from "../components/AddBook";
import Products from "../components/Products";

function Admin() {
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
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <AdminSidebar />
      </div>
      {/* add book */}
      {tab === "add-book" && <AddBook />}
      {/* products */}
      {tab === "products" && <Products />}
    </div>
  );
}

export default Admin;

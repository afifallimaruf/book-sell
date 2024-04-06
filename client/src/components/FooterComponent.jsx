import React from "react";
import { Footer } from "flowbite-react";

function FooterComponent() {
  return (
    <div className="w-full sm:flex sm:items-center sm:justify-between">
      <Footer.Copyright href="#" by="Booksell™" year={2024} />
    </div>
  );
}

export default FooterComponent;

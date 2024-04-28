import React from "react";
import Hero from "../components/Hero";
import NewAdded from "../components/NewAdded";
import HomeBanner from "../components/HomeBanner";

function Home() {
  return (
    <div>
      <Hero />
      <NewAdded />
      <HomeBanner />
    </div>
  );
}

export default Home;

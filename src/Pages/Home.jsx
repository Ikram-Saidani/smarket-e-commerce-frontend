import React from "react";
import HomeBanner from "../Components/Home/HomeBanner";
import PopularProducts from "../Components/Home/PopularProducts";
import NewProducts from "../Components/Home/NewProducts";
import FeaturedProducts from "../Components/Home/FeaturedProducts";
import Publicity from "../Components/Home/Publicity";
import disc from "../assets/images/disc.png";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">
      <HomeBanner />
      <PopularProducts />
      <Publicity/>
      <NewProducts />
      <div className="disc-prod">
        <img src={disc} alt="discount" />
      </div>
      <FeaturedProducts />
    </div>
  );
}

export default Home;

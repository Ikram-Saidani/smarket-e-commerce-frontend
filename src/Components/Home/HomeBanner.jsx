import React from "react";
import Slider from "react-slick";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";
import banner5 from "../../assets/images/banner5.jpg";
import banner6 from "../../assets/images/banner6.jpg";

function HomeBanner() {
  const banners = [banner1, banner2, banner3, banner4, banner5, banner6];
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };
  return (
    <div className="homeBannerSection container-fluid">
      <Slider {...settings}>
        {banners.map((item, index) => (
          <div className="item" key={index}>
            <img src={item} alt="banner" className="w-100" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HomeBanner;

import React from "react";
import { CiDeliveryTruck, CiDiscount1, CiBadgeDollar } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import "../../styles/footer.css";
import logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import JoinUs from "./JoinUs";
function Footer() {
  const location = useLocation();
  const isLoginOrRegister =
    location.pathname === "/login" || location.pathname === "/register";
  
  return (
   <>
   {!isLoginOrRegister && ( <div className="footerWrapper">
      <JoinUs />
      <div className="descriptionBox">
        <div className="description">
          <span><CiDeliveryTruck /></span>
          <p>Faster Delivery</p>
        </div>
        <div className="description">
          <span><CiDiscount1 /></span>
          <p>Daily Mega Discounts</p>
        </div>
        <div className="description">
         <span> <CiBadgeDollar /></span>
          <p>Best price on the market</p>
        </div>
      </div>
        <Link to='/' className="footerLogo" ><img src={logo} alt="smart way to shop"  /></Link>
      <div className="contactBox">
        <a href="https://www.facebook.com/" rel="noreferrer" target="_blank">
          <span>
            <FaFacebookF />
          </span>
        </a>
        <a href="https://www.instagram.com/" rel="noreferrer" target="_blank">
          <span>
            <FaInstagram />
          </span>
        </a>
       
      </div>
      <div className="footer">
        <p>
          Copyright 2024 © SMarket &nbsp;–&nbsp; The Smart Way to Shop. All
          rights reserved.
        </p>
      </div>
    </div>)}
   </>
  );
}

export default Footer;

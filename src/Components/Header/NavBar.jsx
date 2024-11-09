import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaHandsHelping } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { PiSealQuestionBold } from "react-icons/pi";
import { FaPhone } from "react-icons/fa";
import { Button } from "@mui/material";

function NavBar() {
  return (
    <>
      <ul className="list list-inline ml-0">
        <li className="list-inline-item">
          
          <Link to={"/"}><Button><AiOutlineHome/>&nbsp;Home</Button></Link>
        </li>
        <li className="list-inline-item">
          <Link to={"/shop"}><Button><TiShoppingCart/>&nbsp;Shop</Button></Link>
        </li>
        <li className="list-inline-item">
          <Link to={"/helpAndHope"}><Button><FaHandsHelping />&nbsp;Help & Hope</Button></Link>
        </li>
        <li className="list-inline-item">
          <Link to={"/about"}><Button><PiSealQuestionBold/>&nbsp;About Us</Button></Link>
        </li>
      </ul>
      <span className="help">
        Need help? Call Us: <span className="number">+216 00 000 000&nbsp;<FaPhone/></span>
      </span>
    </>
  );
}

export default NavBar;

import logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { FiUser } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
import { LiaShoppingBagSolid } from "react-icons/lia";
import SearchBox from "./SearchBox";
import "../../styles/header.css";
import { IoGiftOutline } from "react-icons/io5";
import UserProfileDropDown from "./UserProfileDropDown";
import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const location = useLocation();
  const isLoginOrRegister =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      {!isLoginOrRegister && (
        <div className="headerWrapper">
          <div className="container-fluid top-strip">
            <p className="mb-0 mt-0 text-center">
              Transition from shopper to ambassador at SMarket and play a{" "}
              <b>key</b> role in building our community.
            </p>
          </div>
          <header className="header">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="logoWrapper">
                  <Link to="/">
                    <img src={logo} alt="logo" />
                  </Link>
                </div>

                <Button
                  className="menu-button"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                >
                  ☰
                </Button>

                <div className={`menu ${isMenuOpen ? "open" : ""}`}>
                  <div className="d-flex align-items-center part2">
                    <SearchBox />

                    <div className="part3 d-flex align-items-center ml-auto">
                      <Link to="/login">
                        <Button className="circleUser">
                          <FiUser /> Sign in
                        </Button>
                      </Link>
                      <Link to="/ordersHistory">
                        <Button className="circleUser">History</Button>
                      </Link>
                      <div className="ml-auto cartTab d-flex align-items-center">
                        <Link to="/wishlist">
                          <Button className="circle ml-2">
                            <MdFavorite />
                          </Button>
                          <span className="count d-flex align-items-center justify-content-center">
                            0
                          </span>
                        </Link>
                      </div>
                      <div className="ml-auto cartTab d-flex align-items-center">
                        <Link to="/cart">
                          <Button className="circle ml-2">
                            <LiaShoppingBagSolid />
                          </Button>
                          <span className="count d-flex align-items-center justify-content-center">
                            0
                          </span>
                        </Link>
                      </div>
                      <UserProfileDropDown />
                      <div className="ml-auto cartTab d-flex align-items-center">
                        <div className="gift">
                          <Button className="circle cursor-none ml-2">
                            <IoGiftOutline />
                          </Button>
                          <p className="score mb-0">100 coins</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      )}
    </>
  );
}

export default Header;

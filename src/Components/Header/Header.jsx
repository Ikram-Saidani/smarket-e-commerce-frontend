import React, { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../../context/UserContext";
import Notifications from "./Notifications";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";

function Header() {
  const token = localStorage.getItem("authToken");
  const { user,setUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [notif, setNotif] = useState([]);
  const [numberOfNotifications, setNumberOfNotifications] = useState(0);
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);
  const [numberOfItemsInWishlist, setNumberOfItemsInWishlist] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const wishListItems = JSON.parse(localStorage.getItem("wishList")) || [];
      setNumberOfItemsInCart(cartItems.length);
      setNumberOfItemsInWishlist(wishListItems.length);
      setNumberOfNotifications(notif.length);
    };
    const handleStorageUpdate = () => {
      updateCounts();
    };

    window.addEventListener("storage-updated", handleStorageUpdate);

    updateCounts();

    return () => {
      window.removeEventListener("storage-updated", handleStorageUpdate);
    };
  }, [notif, setNotif]);

  const emitStorageEvent = () => {
    const event = new Event("storage-updated");
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const simulateUpdate = () => {
      emitStorageEvent();
    };
    const interval = setInterval(simulateUpdate, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    appAxios
      .get("/api/notification", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const { notifications } = response.data?.data || {};

        if (notifications) {
          setNotif(notifications);
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching notifications:",
          error.response?.data || error
        );
      });
  }, [token]);
  
  useEffect(() => {
    if (!token) return;
    appAxios
      .get("/api/user/me", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error.response || error);
        toast.error("Failed to load user information.");
      });
  }, [setUser, token]);

  const isLoginOrRegister =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      {!isLoginOrRegister && (
        <div className="headerWrapper">
          <div className="container-fluid top-strip">
            <p className="mb-0 mt-0 text-center">
              Transition from shopper to ambassador at SMarket – Play a{" "}
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
                      {!token &&(
                        <Link to="/login">
                          <Button className="circleUser">
                            <FiUser /> Sign in
                          </Button>
                        </Link>
                      )} 
                      {token && (
                        <>
                          <UserProfileDropDown />
                          <div className="ml-auto cartTab d-flex align-items-center">
                            <div className="gift">
                              <IoGiftOutline />

                              <p className="score mb-0">
                                {user?.coinsEarned.toFixed(2)} coins
                              </p>
                            </div>
                          </div>
                          <div className="ml-auto cartTab d-flex align-items-center">
                            <Notifications notif={notif} />
                            <span className="count d-flex align-items-center justify-content-center">
                              {numberOfNotifications || 0}
                            </span>
                          </div>
                        </>
                      )}

                      <div className="ml-auto cartTab d-flex align-items-center">
                        <Link to="/wishlist">
                          <Button className="circle ml-2">
                            <MdFavorite />
                          </Button>
                          <span className="count d-flex align-items-center justify-content-center">
                            {numberOfItemsInWishlist || 0}
                          </span>
                        </Link>
                      </div>
                      <div className="ml-auto cartTab d-flex align-items-center">
                        <Link to="/cart">
                          <Button className="circle ml-2">
                            <LiaShoppingBagSolid />
                          </Button>
                          <span className="count d-flex align-items-center justify-content-center">
                            {numberOfItemsInCart || 0}
                          </span>
                        </Link>
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

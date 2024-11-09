import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
import { LiaShoppingBagSolid } from "react-icons/lia";
import SearchBox from "./SearchBox";
import "../../styles/header.css";
import { IoGiftOutline } from "react-icons/io5";
import UserProfileDropDown from "./UserProfileDropDown";


function Header() {
  const location = useLocation();
  const isLoginOrRegister = location.pathname === "/login" || location.pathname === "/register";
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: "Sign in", icon: <FiUser />, link: "/login" },
    { label: "History", icon: null, link: "/ordersHistory" },
    { label: "Wishlist", icon: <MdFavorite />, link: "/wishlist" },
    { label: "Cart", icon: <LiaShoppingBagSolid />, link: "/cart" },
  ];

  return (
    <>
      {!isLoginOrRegister && (
        <div className="headerWrapper">
          <div className="container-fluid top-strip">
            <p className="mb-0 mt-0 text-center">
              Transition from shopper to admin at SMarket and play a <b>key</b> role in building our community.
            </p>
          </div>
          <AppBar position="static" className="header">
            <Toolbar className="container-fluid d-flex align-items-center">
              <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Box>

              {/* Logo */}
              <Link to={"/"} className="logoWrapper">
                <img src={logo} alt="logo" />
              </Link>

              {/* Search Box */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
                <SearchBox />
              </Box>

              {/* Desktop Menu */}
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 'auto' }} className="part3">
                {navItems.map((item, index) => (
                  <Link to={item.link} key={index}>
                    <Button className="circleUser mr-3">
                      {item.icon} {item.label}
                    </Button>
                  </Link>
                ))}
                <UserProfileDropDown />
                <div className="ml-auto cartTab d-flex align-items-center">
                  <div className="gift">
                    <button className="circle cursor-none ml-2">
                      <IoGiftOutline />
                    </button>
                    <p className="score mb-0">100 coins</p>
                  </div>
                </div>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Drawer for Mobile Menu */}
          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <Box sx={{ width: 250 }}>
              <List>
                {navItems.map((item, index) => (
                  <ListItem button key={index} component={Link} to={item.link} onClick={handleDrawerToggle}>
                    {item.icon && <item.icon />}
                    {item.label}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </div>
      )}
    </>
  );
}

export default Header;

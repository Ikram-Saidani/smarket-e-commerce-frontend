import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { baseURL } from "../../utils/config";

const UserProfileDropDown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);
  const handleClick = (event) => {
    if (anchorEl === null) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully!");
    handleClose();
    navigate("/");
  };

  return (
    <div className="ml-auto cartTab d-flex align-items-center">
      <IconButton onClick={handleClick} className="circle ml-2">
        <img
          src={baseURL + user?.avatar}
          alt="Avatar"
          className="profileAvatar"
        />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem component={Link} to="/profile" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem component={Link} to="/ordersHistory" onClick={handleClose}>
          History
        </MenuItem>
        <MenuItem onClick={(e)=>handleLogout(e)}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserProfileDropDown;

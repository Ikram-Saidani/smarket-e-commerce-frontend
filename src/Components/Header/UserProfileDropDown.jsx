import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, IconButton } from "@mui/material";
import profileAvatar from "../../assets/images/men-avatar.png";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

const UserProfileDropDown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useContext(UserContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    handleClose();
  };

  return (
    <div className="ml-auto cartTab d-flex align-items-center">
      <IconButton onClick={handleClick} className="circle ml-2">
        <img src={profileAvatar} alt="User Avatar" className="profileAvatar" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem component={Link} to="/profile" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserProfileDropDown;

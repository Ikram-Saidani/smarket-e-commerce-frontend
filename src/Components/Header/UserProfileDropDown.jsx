import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, IconButton } from "@mui/material";
import profileAvatar from "../../assets/images/men-avatar.png";
const UserProfileDropDown = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem component={Link} to="/login">
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserProfileDropDown;

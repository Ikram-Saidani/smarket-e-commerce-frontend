import React, { useState } from "react";

import { IconButton, Menu, MenuItem } from "@mui/material";
import { MdNotificationsActive } from "react-icons/md";

function Notifications({ notif }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    if (anchorEl === null) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="ml-auto cartTab d-flex align-items-center">
      <IconButton onClick={handleOpen} className="circle ml-2">
        <MdNotificationsActive />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {notif?.length > 0 ? (
          notif?.map((notification, index) => (
            <MenuItem key={notification._id}>
              {`${index + 1}- ${notification.message}`}
            </MenuItem>
          ))
        ) : (
          <MenuItem>You have no notifications yet!</MenuItem>
        )}
      </Menu>
    </div>
  );
}

export default Notifications;

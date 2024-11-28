import React, { useEffect, useState } from "react";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MdNotificationsActive } from "react-icons/md";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.warning("Please log in to view notifications.");
      return;
    }

    const fetchNotifications = async () => {
      try {
        const response = await appAxios.get("/api/notification", {
          headers: {
            Authorization: token,
          },
        });

        const { notifications } = response.data?.data || {};

        if (notifications) {
          setNotifications(notifications);
          localStorage.setItem("notifications", JSON.stringify(notifications.length));
        } else{
          localStorage.setItem("notifications", JSON.stringify(0));
        }
      } catch (error) {
        console.error(
          "Error fetching notifications:",
          error.response?.data || error
        );
        toast.error("Failed to fetch notifications.");
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  }, []);

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
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
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

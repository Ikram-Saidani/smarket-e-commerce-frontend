import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { baseURL } from "../../utils/config";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";

function ProfileHeader() {
  const { token, user } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(
    user?.avatar ? `${baseURL}${user.avatar}` : ""
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateAvatar = async () => {
    if (!avatar) {
      toast.warning("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const response = await appAxios.put(
        `/api/user/updateimage/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, avatar: response.data.data.avatar })
      );

      setPreview(`${baseURL}${response.data.data.avatar}`);
      toast.success("Avatar updated successfully!");
    } catch (error) {
      console.error("Error updating avatar:", error.response?.data || error);
      toast.error("Failed to update avatar.");
    }
  };

  return (
    <header className="profileHeaderUser">
      <img src={preview} alt="Profile" className="profileAvatar" />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="upload-avatar"
      />
      <label htmlFor="upload-avatar">
        <Button
          style={{ width: "max-content" }}
          className="editProfile"
          component="span"
        >
          Choose File
        </Button>
      </label>
      <Button className="editProfile" onClick={handleUpdateAvatar}>
        Edit
      </Button>
      <h3>Hello, {user?.name}! {` (${user?.role})`}</h3>
    </header>
  );
}

export default ProfileHeader;

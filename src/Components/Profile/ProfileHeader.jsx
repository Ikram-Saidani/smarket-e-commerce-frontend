import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { baseURL } from "../../utils/config";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";

function ProfileHeader() {
  const token = localStorage.getItem("authToken");
  const { user, setUser } = useContext(UserContext);
  const [group, setGroup] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(
   `${baseURL}${user?.avatar}`
  );
  useEffect(() => {
    setPreview(`${baseURL}${user?.avatar}`);
  }, [user?.avatar]);
  useEffect(() => {
    if (!user?.groupId && user?.groupId == null) return;
    appAxios
      .get(`/api/group/${user?.groupId}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setGroup(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching group:", err.response || err);
      });
  }, [user?.groupId, token]);

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
      setUser({ ...user, avatar: response.data.data.avatar });

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
      <h3>
        Hello, {user?.name}! {` (${user?.role})`}
      </h3>
      {group.length>0 && (
        <div className="group">
          <h3>Meet Your Group Members :</h3>
          {group.map((g) => (
            <h4 key={g._id}>
              <strong> {g.role} :</strong>
              <br /> {g.name} {g.phone}
            </h4>
          ))}
        </div>
      )}
    </header>
  );
}

export default ProfileHeader;

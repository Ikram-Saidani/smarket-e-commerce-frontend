import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Clear as ClearIcon } from "@mui/icons-material";
import { UserContext } from "../../context/UserContext";
import appAxios from "../../utils/axiosConfig";
import { toast } from "react-toastify";

function ProfileInfo() {
  const token = localStorage.getItem("authToken");
  const { user, setUser } = useContext(UserContext);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [updatedAddresses, setUpdatedAddresses] = useState(user?.address || []);

  useEffect(() => {
    if (user?.address) {
      setUpdatedAddresses(user.address);
    }
  }, [user]);

  const handleRemoveAddress = (index) => {
    if (!isEditable) return;

    const updatedList = updatedAddresses.filter((_, i) => i !== index);
    setUpdatedAddresses(updatedList);

    updateUserAddress(updatedList);
  };

  const handleEditClick = async () => {
    if (isEditable) {
      const updatedAddressList = newAddress
        ? [...updatedAddresses, newAddress]
        : [...updatedAddresses];

      setUpdatedAddresses(updatedAddressList);

      await updateUserAddress(updatedAddressList);
      setNewAddress("");
      setAddNewAddress(false);
    }

    setIsEditable(!isEditable);
  };

  const updateUserAddress = async (addressList) => {
    const updatedUser = {
      ...user,
      address: addressList,
    };

    try {
      const response = await appAxios.put(
        `/api/user/update/${user._id}`,
        updatedUser,
        {
          headers: { Authorization: token },
        }
      );
      setUser(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );
      console.error("Failed to update profile:", error.response || error);
    }
  };

  return (
    <div className="accountInfo">
      <h3 className="infoTitle">Account Information</h3>
      <div className="row">
        <div>
          <TextField
            label="Name"
            name="name"
            value={user?.name || ""}
            fullWidth
            autoComplete="off"
            required
            disabled={!isEditable}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div>
          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="off"
            value={user?.email || ""}
            fullWidth
            required
            disabled={!isEditable}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div>
          <TextField
            label="Phone Number"
            name="phone"
            value={user?.phone || ""}
            fullWidth
            autoComplete="off"
            required
            disabled={!isEditable}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
        </div>
      </div>

      <div className="row2">
        <div>
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={
              user?.dateOfBirth
                ? new Date(user.dateOfBirth).toISOString().split("T")[0]
                : ""
            }
            fullWidth
            required
            autoComplete="off"
            disabled={!isEditable}
            onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
          />
        </div>
        <div className="selectGender">
          <FormControl className="selectGenderInput" fullWidth required>
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
              labelId="gender-select-label"
              name="gender"
              value={user?.gender || ""}
              label="Gender"
              disabled={!isEditable}
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="row3">
        <div className="addresses">
          {updatedAddresses.map((addr, index) => (
            <div key={index} className="address">
              <TextField
                label={`Address ${index + 1}`}
                name="address"
                autoComplete="off"
                value={addr || ""}
                className="addressInput"
                required
                disabled
              />
              <span
                className={isEditable ? "remove" : "removeDisabled"}
                onClick={() => handleRemoveAddress(index)}
              >
                <ClearIcon />
              </span>
            </div>
          ))}
        </div>
        <div className="addAddressContainer">
          <Button
            className={isEditable ? "addAddress" : "addAddressDisabled"}
            onClick={() => setAddNewAddress(true)}
          >
            Add Address
          </Button>

          {addNewAddress && (
            <TextField
              label="New Address"
              name="address"
              className="newAddressInput"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          )}
        </div>
      </div>

      <Button className="editButton" onClick={handleEditClick}>
        {isEditable ? "Save" : "Edit"}
      </Button>
    </div>
  );
}

export default ProfileInfo;

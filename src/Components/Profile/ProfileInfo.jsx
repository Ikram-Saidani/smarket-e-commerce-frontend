import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Clear as ClearIcon } from "@mui/icons-material";

function ProfileInfo({ user }) {
  const [newAddress, setNewAddress] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="accountInfo">
      <div className="row">
        <div>
          <TextField
            label="Name"
            name="name"
            value={user.name || ""}
            fullWidth
            required
            disabled={!isEditable}
          />
        </div>
        <div>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={user.email || ""}
            fullWidth
            required
            disabled={!isEditable}
          />
        </div>
        <div>
          <TextField
            label="Phone Number"
            name="phone"
            value={user.phone || ""}
            fullWidth
            required
            disabled={!isEditable}
          />
        </div>
      </div>
      <div className="row2">
        <div>
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={user.dateOfBirth || ""}
            fullWidth
            required
            disabled={!isEditable}
          />
        </div>
        <div className="selectGender">
          <FormControl className="selectGenderInput" fullWidth required>
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
              labelId="gender-select-label"
              name="gender"
              value={user.gender || ""}
              label="Gender"
              disabled={!isEditable}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="row3">
        <div className="addresses">
          {user.addresses.map((address, index) => (
            <div key={index} className="address">
              <TextField
                label={`Address ${index + 1}`}
                name="address"
                value={address || ""}
                className="addressInput"
                required
                disabled={!isEditable}
              />
              <span
                className={isEditable ? "remove" : "removeDisabled"}
                disabled={!isEditable}
              >
                <ClearIcon />
              </span>
            </div>
          ))}
        </div>
        <div className="addAddressContainer">
          <Button
            className={isEditable ? "addAddress" : "addAddressDisabled"}
            onClick={() => setNewAddress(true)}
          >
            Add Address
          </Button>

          {newAddress && (
            <TextField
              label="New Address"
              name="address"
              className="newAddressInput"
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

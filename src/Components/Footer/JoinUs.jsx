import React, { useState } from "react";
import Join from "../../assets/images/Join.png";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { MdOutlineMailOutline } from "react-icons/md";

function JoinUs() {
  const [role, setRole] = useState('');
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  
  return (
    <div className="joinUs container-fluid">
      <div>
        <img src={Join} alt="Background" />
        <div className="text">
          <span>Are you ready to embark on your entrepreneurial journey?</span>
          <h3>Become a valued member of our team</h3>
          <div className="subscribeBox">
            <MdOutlineMailOutline />
            <span>I want to be</span>
            <FormControl className="roleForm">
            <InputLabel id="demo-simple-select-helper-label">
                  Select one
                </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper role"
                name="role"
                label="role"
                value={role}
  onChange={handleRoleChange}
              >
                <MenuItem value={"ambassador"}>ambassador</MenuItem>
                <MenuItem value={"coordinator"}>coordinator</MenuItem>
              </Select>
            </FormControl>
            <span>for Smarket.</span>
            <Button className="subscribe">Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinUs;

import React, { useState } from "react";
import Join from "../../assets/images/Join.png";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { MdOutlineMailOutline } from "react-icons/md";
import { toast } from "react-toastify";
import appAxios from "../../utils/axiosConfig";

function JoinUs() {
  const token = localStorage.getItem("authToken");
  const [role, setRole] = useState("");
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleSubmit = async () => {
    if (!token) {
      toast.error("Please log in to proceed!");
      return;
    }

    try {
      const message = `I want to be ${role} for Smarket`;
      const response = await appAxios.post(
        "/api/roleRequest/ambassadorOrCoordinator",
        { message },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "SUCCESS") {
        toast.success(response.data.data);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.error("Role request error:", error);
      toast.error("An error occurred while sending your request");
    }
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
            <Button className="subscribe" onClick={handleSubmit}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinUs;

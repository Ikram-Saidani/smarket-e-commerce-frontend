import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import appAxios from "../utils/axiosConfig";
import "../styles/loginANDregister.css";
import { toast } from "react-toastify";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }
    appAxios
      .post("/api/auth/register", {
        ...formData,
      })
      .then((response) => {
        toast.success("Welcome to Smarket, you can login now");
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Registration Failed, Please try again");
        console.log("Registration error:", err);
      });
  };

  return (
    <div className="container-fluid pageLoginRegister">
      <div className="register-login">
        <Link to="/">
          <img src={logo} alt="logo smarket" />
        </Link>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="dateOfBirth">Date of birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="genderAndAddress">
            <div className="gender">
              <FormControl className="genderForm">
                <InputLabel id="demo-simple-select-helper-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper gender"
                  name="gender"
                  value={formData.gender}
                  label="gender"
                  onChange={handleChange}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="address">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Button type="submit">Sign Up</Button>
          </div>
        </form>
        <h4>
          already have account?
          <span className="link">
            <Link to={"/login"}>Sign In</Link>
          </span>
        </h4>
      </div>
    </div>
  );
};

export default Register;

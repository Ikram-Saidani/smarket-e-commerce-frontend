import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { toast } from "react-toastify";
import appAxios from "../utils/axiosConfig";
import { Button } from "@mui/material";
import "../styles/loginANDregister.css";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await appAxios.post("/api/auth/login", formData);
      const { token, user } = response.data.data;

      login(user, token);
      toast.success(`Welcome back, ${user.name}`);
      navigate(-1);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="container-fluid pageLoginRegister">
      <div className="register-login">
        <Link to="/">
          <img src={logo} alt="logo smarket" />
        </Link>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
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
            <Button type="submit">Sign In</Button>
          </div>
        </form>
        <h4>
          Don't have an account?{" "}
          <span className="link">
            <Link to={"/register"}>Sign Up</Link>
          </span>
        </h4>
      </div>
    </div>
  );
};

export default Login;

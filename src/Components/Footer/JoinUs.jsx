import React from "react";
import Join from "../../assets/images/Join.png";
import { Button } from "@mui/material";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";

function JoinUs() {
  return (
    <div className="joinUs container-fluid">
     <div>
     <img src={Join} alt="Background" />
      <div className="text">
        <span>Are you ready to embark on your entrepreneurial journey?</span>
        <h3>Become a valued member of our team</h3>
        <p><Link className="linkToRegister" to={"/register"}>Register now</Link> and share your email with us.</p>

        <div className="subscribeBox">
          <MdOutlineMailOutline />
          <input type="email" required placeholder="Your email address" />
          <Button className="subscribe">Send</Button>
        </div>
      </div>
     </div>
    </div>
  );
}

export default JoinUs;

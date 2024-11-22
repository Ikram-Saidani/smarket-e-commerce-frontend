import React, { useState } from "react";
import { PiListLight } from "react-icons/pi";
import { FaAngleDown } from "react-icons/fa6";
import { Button } from "@mui/material";
import NavBar from "./NavBar";
import AllCategoriesList from "./AllCategoriesList";
import { useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const isLoginOrRegister =
    location.pathname === "/login" || location.pathname === "/register";

  const [open, setOpen] = useState(false);
  return (
    <>
      {!isLoginOrRegister && (
        <nav>
          <div className="nav">
            <div className="container-fluid m-auto">
              <div className="row">
                <div className=" navPart1">
                  <Button className="allCatTab" onClick={() => setOpen(!open)}>
                    <div className="left">
                      <span>
                        <PiListLight />
                      </span>
                      <span className="text text-uppercase ml-2 mt-1">
                        All Categories
                      </span>
                    </div>
                    <span className="right">
                      <FaAngleDown />
                    </span>
                  </Button>
                </div>
                <div className="col-sm-10 navPart2">
                  <NavBar />
                </div>
              </div>
            </div>
          </div>
          <div className="allCategoriesBox">
            {open && <AllCategoriesList />}
          </div>
        </nav>
      )}
    </>
  );
}

export default Navigation;

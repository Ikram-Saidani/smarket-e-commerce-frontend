import React from "react";
import { Button } from "@mui/material";
import { baseURL } from "../../utils/config";
import { toast } from "react-toastify";
import appAxios from "../../utils/axiosConfig";

function HelpBox({ item }) {
  const handleDonateAction = () => {
    const authToken=localStorage.getItem("authToken");
  
    if (!authToken) {
      toast.warning("You need to log in to donate.");
      return;
    }
  
    if (!item || !item.coins) {
      toast.warning("Invalid donation item.");
      return;
    }
  
    const orderDonation = {
      productDonated: item._id,
    };
  
    appAxios
      .post(
        `/api/donationHistory/postDonationHistory`,
        orderDonation,
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.data.message);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Failed to complete the donation.";
        toast.error(errorMessage);
        console.error("Donation error:", error);
      });
  };
  

  return (
    <div className="helpBox">
      <img
        src={`${baseURL}/${item.image}`}
        alt={item.title}
        className="helpImage"
      />
      <h3 className="mb-0">{item.title}</h3>
      <p className="mb-0">{item.coins} coins</p>
      <Button className="donate" onClick={handleDonateAction}>
        Donate Now
      </Button>
    </div>
  );
}

export default HelpBox;

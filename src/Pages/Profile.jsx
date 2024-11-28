import "../styles/profile.css";
import LoyaltyProgram from "../Components/Profile/LoyaltyProgram";
import DonationHistory from "../Components/Profile/DonationHistory";
import ProfileInfo from "../Components/Profile/ProfileInfo";
import ProfileHeader from "../Components/Profile/ProfileHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appAxios from "../utils/axiosConfig";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const [donationHistory, setDonationHistory] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
      return;
    }

    const fetchDonationHistory = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await appAxios.get(
          "/api/donationHistory/userdonationHistories",
          {
            headers: { Authorization: token },
          }
        );

        const { data } = response.data || {};

        if (data) {
          setDonationHistory(data);
        } else {
          toast.info("No donation history available.");
        }
      } catch (error) {
        console.error("Error fetching donation history:", error.response || error);
        toast.error("Failed to load donation history.");
      }
    };

    fetchDonationHistory();
  }, [navigate]);

  return (
    <div className="profile container-fluid">
      <div className="profileHeader">
        <ProfileHeader />
        {/* <LoyaltyProgram /> */}
      </div>
      {/* <ProfileInfo /> */}
      {donationHistory.length > 0 && (
        <DonationHistory donationHistory={donationHistory} />
      ) }
    </div>
  );
};

export default Profile;


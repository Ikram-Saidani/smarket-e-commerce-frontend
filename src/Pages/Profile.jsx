import "../styles/profile.css";
import LoyaltyProgram from "../Components/Profile/LoyaltyProgram";
import DonationHistory from "../Components/Profile/DonationHistory";
import ProfileInfo from "../Components/Profile/ProfileInfo";
import ProfileHeader from "../Components/Profile/ProfileHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appAxios from "../utils/axiosConfig";

const Profile = () => {
  const navigate = useNavigate();
  const [donationHistory, setDonationHistory] = useState([]);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchDonationHistory = async () => {
      try {
        const response = await appAxios.get(
          "/api/donationHistory/userdonationHistories",
          {
            headers: { Authorization: token },
          }
        );

        const { data } = response.data || {};
        if (data) {
          setDonationHistory(data);
        } 
      } catch (error) {
        console.error(
          "Error fetching donation history:",
          error.response || error
        );
       
      }
    };

    fetchDonationHistory();
  }, [navigate, token]);

  return (
    <div className="profile container-fluid">
      <div className="profileHeader">
        <ProfileHeader />
        <LoyaltyProgram />
      </div>
      {donationHistory.length > 0 && (
        <DonationHistory donationHistory={donationHistory} />
      )}
      <ProfileInfo />
    </div>
  );
};

export default Profile;

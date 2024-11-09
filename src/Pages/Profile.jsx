import "../styles/profile.css";
import LoyaltyProgram from "../Components/Profile/LoyaltyProgram";
import DonationHistory from "../Components/Profile/DonationHistory";
import ProfileInfo from "../Components/Profile/ProfileInfo";
import ProfileHeader from "../Components/Profile/ProfileHeader";

const Profile = () => {
  const user={
    name: "ikram",
    email: "user@email.com",
    phone: "00000000",
    addresses: ["bardo,tunis, 2000", "bizerte,tunis, 7021"],
    gender: "female",
    dateOfBirth: "1996-02-16",
    donationHistory: ["product: 1,coins:300", "product: 2,coins:500"],
    loyaltyPoints: 100,
    hasDonationCertification: true,
  };

 
  return (
    <div className="profile container-fluid">
        <div className="profileHeader">
        <ProfileHeader user={user}/>
     
       <LoyaltyProgram user={user} />
       
        
        </div>
        {user.donationHistory.length > 0 && (
          <DonationHistory user={user} />
        )}
        <ProfileInfo user={user} />
    </div>
  );
};

export default Profile;

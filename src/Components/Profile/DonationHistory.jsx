import React from "react";
import CertificationBadge from "./CertificationBadge";

function DonationHistory({ donationHistory }) {
  return (
    <div className="donationInfo">
      <div>
        <h4>Donation History</h4>
        <ul>
          {donationHistory.map((donation, index) => (
            <li key={index}>
              - {donation.productDonated.title} :{" "}
              {donation.productDonated.coins} coins -{" "}
              {new Date(donation.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>

      <CertificationBadge />
    </div>
  );
}

export default DonationHistory;

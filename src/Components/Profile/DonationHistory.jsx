import React from 'react'
import CertificationBadge from './CertificationBadge'

function DonationHistory({user}) {
  return (
    <div className="donationInfo">

        <div>
        <h4>Donation History</h4>
          <ul>
            {user.donationHistory.length > 0 ? (
              user.donationHistory.map((donation, index) => (
                <li key={index}>{donation}</li>
              ))
            ) : (
              <li>No donation history available.</li>
            )}
          </ul>
        </div>

          {user.hasDonationCertification && <CertificationBadge name={user.name} />}
        </div>
  )
}

export default DonationHistory
import React from 'react';
import html2canvas from 'html2canvas';
import { Button } from '@mui/material';
import smarketLogo from '../../assets/images/logo.png';

const CertificationBadge = ({ name }) => {
  const generateImage = () => {
    const certificationBadge = document.querySelector('.certificationBadge');
    const downloadButton = certificationBadge.querySelector('.download');

    downloadButton.style.display = 'none';

    html2canvas(certificationBadge, { scale: 3 }).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/jpeg', 1.0);
      link.download = 'donation-certification.jpg';
      link.click();

      downloadButton.style.display = 'block';
    });
  };

  return (
    <div className="certificationBadge">
      <img src={smarketLogo} alt="SMarket Logo" className='logo' />
      <h3>Donation Certification</h3>
      <p>SMarket has the honor to certify that</p>
      <h4>{name}</h4>
      <p>has made generous contributions to support our initiatives</p>
      <Button onClick={generateImage} className="download">
        Download Certification
      </Button>
    </div>
  );
};

export default CertificationBadge;

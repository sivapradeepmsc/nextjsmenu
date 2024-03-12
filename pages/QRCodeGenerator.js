// pages/voucher.js

import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import styles from './voucher.module.css';

const VoucherPage = () => {
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [qrCodeData, setQRCodeData] = useState('');

  const generateQRCodeData = () => {
    const data = `${customerName} - ${mobileNumber}`;
    setQRCodeData(data);
  };

  return (
    <div className={styles.container}>
      <h1>Voucher Page</h1>
      <div>
      <label className={styles.label}>Customer Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className={styles.input}
        />
      </div>
      <div>
      <label className={styles.label}>Mobile Number:</label>
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className={styles.input}

        />
      </div>
      <button onClick={generateQRCodeData}  className={styles.button}>Generate QR Code</button>
      {qrCodeData && <QRCode value={qrCodeData} className={styles.qrcode} />}
    </div>


  );
};

export default VoucherPage;

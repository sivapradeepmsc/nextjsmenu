import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import styles from './voucher.module.css';
import { useRouter } from 'next/router';

const VoucherPage = () => {
  const router = useRouter();
  const { expired } = router.query;
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [qrCodeData, setQRCodeData] = useState('');
  const [isExpired, setIsExpired] = useState(false); // New state to track voucher expiry
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error message

  const vouchernumber = `D70571`;

  const generateQRCodeData = async () => {
    if (!email || !mobileNumber) {
      alert('Please enter both email and mobile number');
      return;
    }

    try {
      const response = await fetch('/api/voucher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, mobileNumber, vouchernumber }),
      });

      const data = await response.json();

      if (response.ok) {
        if (!data.expired) {
          setQRCodeData(data);
        } else {
          setErrorMessage('Voucher already expired'); // Set error message
          setIsExpired(true); // Set expiration status
        }
      } else {
        console.error('Failed to insert data');
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  const clearData = () => {
    setEmail('');
    setMobileNumber('');
    setQRCodeData('');
    setIsExpired(false); // Reset expiration status
    setErrorMessage(''); // Clear error message
  };

  const handleChangeMobileNumber = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, '');
    setMobileNumber(numericValue);
  };

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  return (
    <div className={styles.container}>
      <h1>Voucher Page</h1>
      {errorMessage && <div>{errorMessage}</div>}
      {isExpired ? null : (
        <>
          <div>
            <label className={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleChangeEmail}
              className={styles.input}
              required
            />
          </div>
          <div>
            <label className={styles.label}>Mobile Number:</label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={handleChangeMobileNumber}
              className={styles.input}
            />
          </div>
        </>
      )}
      
      <button onClick={generateQRCodeData} className={styles.button}>
        Generate QR Code
      </button>
      <button onClick={clearData} className={styles.clearButton}>
        Clear Data
      </button>
      {qrCodeData && <QRCode value={qrCodeData} className={styles.qrcode} />}
    </div>

  );
};

export default VoucherPage;

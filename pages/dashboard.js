import React, { useState } from 'react';
import styles from './dashboard.module.css';

const DashboardPage = () => {
  const [urls, setUrls] = useState(['']); // Array to store URLs
  const [emailAlerts, setEmailAlerts] = useState(false); // State to manage email alerts

  // Function to add a new URL input field
  const addUrl = () => {
    setUrls([...urls, '']);
  };

  // Function to handle URL input change
  const handleUrlChange = (index, value) => {
    const updatedUrls = [...urls];
    updatedUrls[index] = value;
    setUrls(updatedUrls);
  };

  // Function to remove URL input field
  const removeUrl = (index) => {
    const updatedUrls = [...urls];
    updatedUrls.splice(index, 1);
    setUrls(updatedUrls);
  };

  // Function to handle email alert checkbox change
  const handleEmailAlertChange = () => {
    setEmailAlerts(!emailAlerts);
  };

  // Function to save options
  const saveOptions = () => {
    // Logic to save options (e.g., send data to server)
    console.log('URLs:', urls);
    console.log('Email Alerts:', emailAlerts);
  };

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <div className={styles.option}>
        <label htmlFor="emailAlerts">Email Alerts:</label>
        <input
          type="checkbox"
          id="emailAlerts"
          checked={emailAlerts}
          onChange={handleEmailAlertChange}
        />
      </div>
      <div className={styles.option}>
        <label>URLs:</label>
        {urls.map((url, index) => (
          <div key={index} className={styles.urlInput}>
            <input
              type="text"
              value={url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
              placeholder="Enter URL"
            />
            <button onClick={() => removeUrl(index)}>-</button>
          </div>
        ))}
        <button onClick={addUrl}>+</button>
      </div>
      <button onClick={saveOptions} className={styles.saveButton}>Save</button>
    </div>
  );
};

export default DashboardPage;

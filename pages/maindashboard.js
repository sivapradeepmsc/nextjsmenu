import React, { useState } from 'react';
import styles from './maindashboard.module.css';

const MainDashboardPage = () => {
  // Sample data for URLs with their details
  const [urlsData, setUrlsData] = useState([
    {
      url: 'https://example1.com',
      sslExpireDate: '2024-08-01',
      domainExpireDate: '2025-07-15',
      purchaseDate: '2021-07-15',
      owner: 'John Doe'
    },
    {
      url: 'https://example2.com',
      sslExpireDate: '2023-10-20',
      domainExpireDate: '2024-09-30',
      purchaseDate: '2020-09-30',
      owner: 'Jane Smith'
    },
    {
        url: 'https://example3.com',
        sslExpireDate: '2023-10-20',
        domainExpireDate: '2024-09-30',
        purchaseDate: '2020-09-30',
        owner: 'Jane Smith'
      },
      {
        url: 'https://example4.com',
        sslExpireDate: '2023-10-20',
        domainExpireDate: '2024-09-30',
        purchaseDate: '2020-09-30',
        owner: 'Jane Smith'
      },
      {
        url: 'https://example5.com',
        sslExpireDate: '2023-10-20',
        domainExpireDate: '2024-09-30',
        purchaseDate: '2020-09-30',
        owner: 'Jane Smith'
      },
      {
        url: 'https://example6.com',
        sslExpireDate: '2023-10-20',
        domainExpireDate: '2024-09-30',
        purchaseDate: '2020-09-30',
        owner: 'Jane Smith'
      }
  ]);

  return (
    <div className={styles.container}>
      <h1>Main Dashboard</h1>
      <div className={styles.urlsContainer}>
        {urlsData.map((urlData, index) => (
          <div key={index} className={styles.urlCard}>
            <div className={styles.urlInfo}>
              <div><strong>URL:</strong> {urlData.url}</div>
              <div><strong>SSL Expire Date:</strong> {urlData.sslExpireDate}</div>
              <div><strong>Domain Expire Date:</strong> {urlData.domainExpireDate}</div>
              <div><strong>Purchase Date:</strong> {urlData.purchaseDate}</div>
              <div><strong>Owner:</strong> {urlData.owner}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainDashboardPage;

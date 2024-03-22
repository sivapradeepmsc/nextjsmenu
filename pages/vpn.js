import Head from 'next/head';
import styles from './vpn.module.css';
import { useState } from 'react';

export default function vpn() {
  const [connected, setConnected] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const countries = ['USA', 'UK', 'Canada', 'Germany', 'France']; // Example list of countries

  const handleConnect = () => {
    // Code to connect to VPN server with selected country
    setConnected(true);
  };

  const handleDisconnect = () => {
    // Code to disconnect from VPN server
    setConnected(false);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>VPN App</title>
        <meta name="description" content="VPN Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>VPN Application</h1>

        <p className={styles.description}>
          {connected ? 'Connected to VPN' : 'Disconnected from VPN'}
        </p>

        <div className={styles.countrySelector}>
          <select value={selectedCountry} onChange={handleCountryChange} className={styles.select}>
            <option value="">Select a country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          <button className={styles.button} onClick={handleConnect} disabled={!selectedCountry}>
            Connect
          </button>
        </div>

        {connected && (
          <button className={styles.button} onClick={handleDisconnect}>
            Disconnect
          </button>
        )}
      </main>

      <footer className={styles.footer}>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Powered by Your VPN Provider
        </a>
      </footer>
    </div>
  );
}

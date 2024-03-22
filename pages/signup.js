import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './signup.module.css'; // Import CSS module for styling

const SignUpPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform signup logic here (e.g., send data to server)
    try {
      // Example: Sending user data to an API endpoint
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, confirmPassword, companyName, email, countryCode, mobileNumber }),
      });
      if (response.ok) {
        router.push('/dashboard'); // Redirect to dashboard after successful signup
      } else {
        // Handle signup errors
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.input}
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className={styles.input}
        />
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
          required
          className={styles.input}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          className={styles.input}
        />
        <input
          type="text"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          placeholder="Country Code"
          required
          className={styles.input}
        />
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Mobile Number"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;

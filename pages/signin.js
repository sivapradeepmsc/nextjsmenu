import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './signin.module.css'; // Import CSS module for styling

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform sign-in logic here (e.g., send data to server)
    try {
      // Example: Sending user data to an API endpoint
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        router.push('/dashboard'); // Redirect to dashboard after successful sign-in
      } else {
        // Handle sign-in errors
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Redirect the user to Google sign-in page
      window.location.href = '/api/google/signin'; // Replace '/api/google/signin' with your actual Google sign-in endpoint
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
        <button type="submit" className={styles.button}>Sign In</button>
      </form>
      <button onClick={handleGoogleSignIn} className={styles.googleButton}>Sign In with Google</button>
    </div>
  );
};

export default SignInPage;

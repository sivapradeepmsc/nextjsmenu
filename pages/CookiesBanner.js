// CookiesBanner.js

import { useState, useEffect } from "react";
import styles from "./cookiesBanner.module.css";

function CookiesBanner() {
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie_consent');
    if (cookieConsent === 'accepted') {
      setBannerVisible(false);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setBannerVisible(false);
  };

  const customize = () => {
    // Extend this function to handle customization logic (e.g., modal)
    alert('You can customize cookie preferences here!');
  };

  return (
    <div className={styles.container}>
      {bannerVisible && (
        <div className={styles.cookieBanner}>
          <p>
            We use cookies to improve your experience on our website. By continuing to browse, you consent to our use of cookies.  <a href="#" onClick={() => customize()}>Learn more</a>.
          </p>
          <div className={styles.buttons}>
            <button onClick={acceptAll}>Accept All</button>
            <button onClick={customize}>Customize</button>
          </div>
        </div>
      )}
      <div className={styles.content}>
        <p>This is the content of your website.</p>
      </div>
    </div>
  );
}

export default CookiesBanner;

import Navbar from "../components/Navbar";
import "../src/app/globals.css";
import Articles from "./Articles";
import CookiesBanner from "./CookiesBanner";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <CookiesBanner />
      <Footer />
    </>
  );
}

export default MyApp;


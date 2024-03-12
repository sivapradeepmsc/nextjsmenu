"use client"
import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Router  from 'next/router';
import ImageSlider from '../components/imageslider';


const Home = () => {
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState(null);
  const [showLanguages, setShowLanguages] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://api.storyblok.com/v2/cdn/stories', {
          params: {
            version: 'draft',
            token: '8Su8cdpWnbzcWxCU9chIfQtt',
            starts_with: 'ecommerce' 
          },
        });
        setContent(response.data.stories);
      } catch (error) {
        console.error('Error fetching data from Storyblok:', error);
      }
    }
    fetchData();
  }, []);


  const addToCart = (story) => {
    Router.push({
      pathname: '/addcart',
      query: { image: story.content.product, price: story.content.price }
    });
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguages(false); 
  };

  return (
    <div>
      <Head>
        <title>{content ? content[0].name : 'Loading...'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="language-toggle">
          <button onClick={() => setShowLanguages(!showLanguages)}>Translate</button>
          {showLanguages && (
            <div className="language-dropdown">
              <button onClick={() => changeLanguage('en')}>English</button>
              <button onClick={() => changeLanguage('ar')}>Arabic</button>
              <button onClick={() => changeLanguage('ml')}>Malayalam</button>
              <button onClick={() => changeLanguage('hi')}>Hindi</button>
            </div>
          )}
        </div>
      </header>

      <main>
        <div className="container">
          {content && content.map((story, index) => (
            <div key={index} className="product">
              <img src={story.content.product} alt={story.name} />
              <h2>{story.name}</h2>
              <p>${story.content.price}</p>
              <button onClick={() => addToCart(story)} className="add-to-cart">Add to Cart</button>            
            </div>
          ))}
        </div>
      </main>

      <footer>
      {content && <ImageSlider images={content.map(story => story.content.product)} />}
      </footer>
      <style jsx>{`
header {
  padding: 10px;
  background-color: #f3f3f3;
  position: relative;
}

.language-toggle {
  position: relative;
}

.language-dropdown {
  position: absolute;
  top: 30px;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.language-dropdown button {
  display: block;
  width: 100%;
  padding: 5px 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s;
}

.language-dropdown button:hover {
  background-color: #f0f0f0;
}


        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        .product {
          width: calc(33.333% - 20px);
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          background-color: #f3f3f3; /* Ash background color */
          padding: 10px;
        }
        .product .product-image {
          float: left;
          width: 100px; /* Set a fixed width */
          height: 100px; /* Set a fixed height */
          margin-right: 10px; /* Add some margin between images */
          overflow: hidden;
        }
        .product img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .product-details {
          flex: 1;
        }
        h2 {
          margin: 0;
        }
        p {
          font-weight: bold;
          margin: 0;
        }
        .add-to-cart {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s;
        }
        .add-to-cart:hover {
          background-color: #0056b3;
        }

        @media (max-width: 768px) {
          .product {
            width: calc(50% - 20px);
          }
        }

        @media (max-width: 576px) {
          .product {
            width: 100%;
          }
        }
      `}</style>

    </div>
  );
};

export default Home;

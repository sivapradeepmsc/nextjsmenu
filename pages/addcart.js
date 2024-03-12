import { useState,useEffect,React } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

const AddToCartPage = () => {
  const router = useRouter();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [productImage, setProductImage] = useState(''); 
  const { image, price } = router.query; 


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://api.storyblok.com/v2/cdn/stories', {
          params: {
            version: 'draft',
            token: '8Su8cdpWnbzcWxCU9chIfQtt',
            starts_with: 'paymentdata' 
          },
        });
        setContent(response.data.stories);
      } catch (error) {
        console.error('Error fetching data from Storyblok:', error);
      }
    }
    fetchData();
  }, []);


     
  const handlePayButtonClick = () => {
    setShowPaymentOptions(true);
  };

  useEffect(() => {
    setProductImage(image);
  }, [image]);



  

  return (
    <div>
      <Head>
        <title>Add to Cart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Add to Cart</h1>
        <div className="product">
          <img src={image} alt="Product" />
          <div className="product-details">
            <h2>TEST</h2>
            <p>Price: ${price}</p>
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" />
            <button className="add-to-cart-button" onClick={handlePayButtonClick}>Pay</button>
          </div>
        </div>
        {showPaymentOptions && (
  <div className="payment-options">
    <h2>Select Payment Method</h2>
    <div className="payment-option">
      <input type="radio" id="creditCard" name="paymentMethod" value="creditCard" />
      <label htmlFor="creditCard">Credit Card</label>
    </div>
    <div className="payment-option">
      <input type="radio" id="debitCard" name="paymentMethod" value="debitCard" />
      <label htmlFor="debitCard">Debit Card</label>
    </div>
    <div className="payment-option">
      <input type="radio" id="upi" name="paymentMethod" value="upi" />
      <label htmlFor="upi">UPI</label>
    </div>
    <div className="payment-option">
      <input type="radio" id="googlePay" name="paymentMethod" value="googlePay" />
      <label htmlFor="googlePay">Google Pay</label>
    </div>
    <div className="payment-option">
      <input type="radio" id="cashOnDelivery" name="paymentMethod" value="cashOnDelivery" />
      <label htmlFor="cashOnDelivery">Cash on Delivery</label>
    </div>
    <button className="confirm-payment-button">Confirm Payment</button>
  </div>
)}
      </main>
 
    <style jsx>{`


.payment-options {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    margin-top: 20px;
  }
  
  .payment-options h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  .payment-option {
    margin-bottom: 10px;
  }
  
  .payment-option input[type="radio"] {
    margin-right: 10px;
  }
  
  .confirm-payment-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .confirm-payment-button:hover {
    background-color: #0056b3;
  }
 
        main {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 20px;
          text-align: center;
        }

        .product {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          background-color: #f9f9f9;
          padding: 10px;
          border-radius: 5px;
        }

        .product img {
          width: 150px;
          height: 150px;
          object-fit: cover;
          border-radius: 5px;
          margin-right: 20px;
        }

        .product-details {
          flex: 1;
        }

        h2 {
          margin-bottom: 10px;
        }

        p {
          margin: 5px 0;
        }

        label {
          display: block;
          margin-bottom: 5px;
        }

        input[type="number"] {
          width: 50px;
          padding: 5px;
          margin-bottom: 10px;
        }

        .add-to-cart-button {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s;
        }

        .add-to-cart-button:hover {
          background-color: #0056b3;
        }

        .payment-options {
          margin-top: 20px;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default AddToCartPage;

import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="image-slider">
      <div className="slider-content" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index + 1}`} />
        ))}
      </div>

      <style jsx>{`
        .image-slider {
          overflow: hidden;
          position: relative;
          width: 100%;
        }
        
        .slider-content {
          display: flex;
          justify-content: center;

          transition: transform 0.5s ease-in-out;
        }

        .slider-content img {
            max-width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default ImageSlider;

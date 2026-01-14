import React, { useState } from "react";
import "../styles/ProductImageSlider.css";


export default function ProductImageSlider({ images }) {
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="slider-container">

      {/* Main Image */}
      <div className="slider-main">
        <img src={images[index]} alt="" className="slider-main-image" />

        <button className="slider-btn left" onClick={prevImage}>‹</button>
        <button className="slider-btn right" onClick={nextImage}>›</button>
      </div>

      {/* Thumbnails */}
      <div className="slider-thumbs">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className={`thumb ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            alt=""
          />
        ))}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import carouselImages from "../../assets/Home/CarouselImage";
import "./Home.css";

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="home-container">
      <div className="carousel-container">
      <div
          className="slides-wrapper"
          style={{ transform: `translateY(-${currentSlide * 100}%)` }}
        >
          {carouselImages.map((image) => (
            <div className="slide" key={image.index}>
              <img
                src={image.imgUrl}
                alt={`Slide ${image.index + 1}`}
                className="carousel-image"
              />
            </div>
          ))}
        </div>
        <button className="carousel-btn up" onClick={prevSlide}>
          ↑
        </button>
        <button className="carousel-btn down" onClick={nextSlide}>
          ↓
        </button>
      </div>
      <div className="carousel-indicators">
        {carouselImages.map((_, idx) => (
          <div
            key={idx}
            className={`indicator ${idx === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
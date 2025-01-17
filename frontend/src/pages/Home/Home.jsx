import React, { useState, useEffect, useRef } from "react";
import { Header } from "../../components";
import carouselImages from "../../assets/Home/CarouselImage";
import "./Home.css";

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (isTransitioning) return; // Don’t scroll if we’re animating

      if (e.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setIsTransitioning(true);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isTransitioning]);

  // When the slide finishes its CSS transition, let scrolling resume
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <div className="home-container">
      <Header />
      <div className="carousel-container">
        <div
            className="slides-wrapper"
            style={{ 
              transform: `translateY(-${currentSlide * 100}%)`,
              transition: "transform 0.5s ease"
          }}
            onTransitionEnd={handleTransitionEnd}
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
        <div className="scroll-down">
          <span className="arrow"></span>
        </div>
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
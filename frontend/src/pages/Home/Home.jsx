import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import carouselImages from "../../assets/Home/CarouselImage";
import "./Home.css";

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showButton, setShowButton] = useState(false); // State to control button visibility
  const navigate = useNavigate();

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
      setShowButton(false); // Hide button during transition
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isTransitioning]);

  // When the slide finishes its CSS transition, let scrolling resume and show button if on last slide
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentSlide === 5) {
      setShowButton(true); // Show button after transition ends
    }
  };

  return (
    <div className="home-container">
      <Header />
      <div className="carousel-container">
        <div
          className="slides-wrapper"
          style={{
            transform: `translateY(-${currentSlide * 100}%)`,
            transition: "transform 0.5s ease",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {carouselImages.map((image, index) => (
            <div className="slide" key={index}>
              <img
                src={image.imgUrl}
                alt={`Slide ${index + 1}`}
                className="carousel-image"
              />
              {currentSlide === 5 && showButton && (
                <button
                  className="explore-now-button"
                  onClick={() => navigate("/product")}
                >
                  Explore Now
                </button>
              )}
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

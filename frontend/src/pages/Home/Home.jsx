import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import carouselImages from "../../assets/Home/CarouselImage";
import "./Home.css";

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showButton, setShowButton] = useState(false); // State to control button visibility
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  // Check if device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayImages = isMobile ? carouselImages.slice(1) : carouselImages;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % displayImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  // Auto scroll for mobile
  useEffect(() => {
    let autoScrollTimer;

    if (isMobile && !isTransitioning) {
      autoScrollTimer = setInterval(() => {
        nextSlide();
        setIsTransitioning(true);
      }, 3000); // Change slide every 3 seconds
    }

    return () => {
      if (autoScrollTimer) {
        clearInterval(autoScrollTimer);
      }
    };
  }, [currentSlide, isTransitioning, isMobile]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isMobile) return; // Disable wheel scrolling on mobile

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
  }, [isTransitioning, isMobile]);

  // When the slide finishes its CSS transition, let scrolling resume and show button if on last slide
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentSlide === 5) {
      setShowButton(true); // Show button after transition ends
    }
  };

  // Add touch handlers for mobile
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    setTouchStart(touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (!isMobile || isTransitioning) return;
    const touch = e.touches[0];
    const diff = touchStart - touch.clientY;

    if (Math.abs(diff) > 50) {
      // Minimum swipe distance
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setIsTransitioning(true);
      setShowButton(false);
    }
  };

  return (
    <div className="home-container">
      <Header />
      <div
        className="carousel-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div
          className="slides-wrapper"
          style={{
            transform: `translateY(-${currentSlide * 100}%)`,
            transition: "transform 0.5s ease",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {displayImages.map((image, index) => (
            <div className="slide" key={index}>
              <img
                src={image.imgUrl}
                alt={`Slide ${index + 1}`}
                className="carousel-image"
              />
              {currentSlide === (isMobile ? 4 : 5) && showButton && (
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
        {displayImages.map((_, idx) => (
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

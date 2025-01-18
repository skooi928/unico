import React from 'react';
import Header from "../components/Header";
import logo from "../assets/logo.webp";
import "./About.css";

export const About = () => {
  return (
    <div>
      <Header />
      <div className="background-container"></div>
      <div className="about">
        <h1>About Us</h1>
        <img src={logo} alt="Unico Logo" className="logo" />
        <p>
        Welcome to our platform, where sustainability meets innovation. Guided by the Sustainable Development Goals (SDGs), we are committed to promoting eco-friendly consumption and production. Our curated selection of products, made from recyclable and biodegradable materials, helps reduce waste and foster a healthier planet.

We cater to nature enthusiasts and environmentally conscious individuals who value sustainability in their daily choices. By providing access to responsibly crafted products, we aim to inspire a shift toward eco-friendly lifestyles and strengthen the connection between people and the environment.

Our mission is to deliver a seamless, user-friendly shopping experience that aligns with eco-conscious values. With intuitive navigation, a visually appealing interface, and detailed product insights on sustainability, we empower users to make informed decisions that positively impact the planet.

More than a marketplace, our platform is a movement—a call to action for embracing sustainable living. By combining innovation and environmental stewardship, we strive to educate, inspire, and drive meaningful change for a greener, more sustainable future. </p>
      </div>
    </div>
  );
};

export default About;
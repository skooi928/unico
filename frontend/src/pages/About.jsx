import React from 'react'
import Header from "../components/Header";
import Background from "../assets/Product/Background.jpg";

export const About = () => {

  return (
    <div>
      <Header />
      <img src={Background} alt="About" style={{width: "100%"}} />
    </div>
  )
}

export default About

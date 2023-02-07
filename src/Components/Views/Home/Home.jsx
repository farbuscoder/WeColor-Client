import React from "react";

//Components
import Footer from "./Footer";

import "./Home-styles.css";

const Home = () => {
  return (
    <>
      <div className="home-styles-body">
        <div className="home-content-one">
          <h1>Generate and save your best color palettes</h1>
          <img
            src="https://i.ibb.co/qWv6K9N/undraw-color-schemes-wv48.png
        "
            alt="mobile-home-pic"
          ></img>
          <span>Don't you have an account?</span>
          <button className="sign-button">Create an account</button>
          <button className="explore-palettes-button">
            Explore trending palettes
          </button>
        </div>
        <div className="home-content-two">
          <img
            src="https://i.ibb.co/3yP0bfz/undraw-composition-re-4o4o.png"
            alt="mobile-home-pic-two"
          ></img>
          <h1>Thousands of colors just in the palm of your hand</h1>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};

export default Home;

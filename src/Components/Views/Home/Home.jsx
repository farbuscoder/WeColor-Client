import React from "react";

//Redux
import { useSelector } from "react-redux";

//Components
import Footer from "./Footer";

//React router dom
import { Link } from "react-router-dom";

import "./Home-styles.css";

const Home = () => {
  const { darkmode } = useSelector((state) => state.darkmode);

  return (
    <>
      <div className="home-styles-body">
        <div className="home-content-one">
          <h1>Generate and save your best color palettes.</h1>
          <img
            src="https://i.ibb.co/qWv6K9N/undraw-color-schemes-wv48.png
        "
            alt="mobile-home-pic"
          ></img>
          <div className="button-container">
            <span>Don't you have an account?</span>
            <Link to="/signup">
              <button className="sign-button">Create an account</button>
            </Link>
            <Link to="/explore">
              <button className="explore-palettes-button">
                Explore trending palettes
              </button>
            </Link>
          </div>
        </div>
        <div className="home-content-two">
          <div className="sub-container-content-two">
            <img
              src="https://i.ibb.co/Ct3fCGG/pexels-magda-ehlers-1279813.jpg"
              alt="mobile-home-pic-two"
            ></img>
            <h1 style={{ color: darkmode ? "white" : "#5f5f5f" }}>
              Thousands of colors just in the palm of your hand.
            </h1>
          </div>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};

export default Home;

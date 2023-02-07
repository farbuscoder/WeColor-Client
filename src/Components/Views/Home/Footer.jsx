import React from "react";

const Footer = () => {
  return (
    <>
      <div className="home-footer">
        <div className="column-one">
          <h2>WeColor</h2>
          <ul>
            <li>Generate Palettes</li>
            <li>Login</li>
            <li>Explore trending palettes</li>
          </ul>
        </div>
        <div className="column-one">
          <h2>This Website</h2>
          <ul>
            <li>Builded with React Js</li>
            <li>Social Media</li>
            <li>
              <span>Instagram,</span>
              <span>Twitter</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;

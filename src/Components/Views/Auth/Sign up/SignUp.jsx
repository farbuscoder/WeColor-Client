import React from "react";

//Hooks
import useMobile from "../../../../Hooks/useMobile";

//Css
import "../auth-styles.css";

//Components
import SignUpForm from "./SignUpForm";

const Signup = () => {
  const isMobile = useMobile();

  return (
    <>
      <div className="auth-body">
        {!isMobile ? (
          <>
            <SignUpForm />
            <img
              src="https://i.ibb.co/jJjGSPq/undraw-Add-color-re-buro.png"
              alt="img"
            ></img>
          </>
        ) : (
          <>
            <SignUpForm />
          </>
        )}
      </div>
    </>
  );
};

export default Signup;

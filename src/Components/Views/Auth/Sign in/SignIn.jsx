import React from "react";

//Hooks
import useMobile from "../../../../Hooks/useMobile";

//Components
import SignInForm from "./SignInForm";

//css
import "../auth-styles.css";

const Signin = () => {
  const isMobile = useMobile();

  return (
    <>
      <div className="auth-body">
        {!isMobile ? (
          <>
            <SignInForm />
            <img
              src="https://i.ibb.co/jJjGSPq/undraw-Add-color-re-buro.png"
              alt="img"
            ></img>
          </>
        ) : (
          <>
            <SignInForm />
          </>
        )}
      </div>
    </>
  );
};

export default Signin;

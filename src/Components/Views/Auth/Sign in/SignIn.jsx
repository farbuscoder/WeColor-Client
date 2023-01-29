import React from "react";

//Components
import SignInForm from "./SignInForm";

//css
import "../auth-styles.css";

const Signin = () => {
  return (
    <>
      <div className="signin-body">
        <SignInForm />
      </div>
    </>
  );
};

export default Signin;

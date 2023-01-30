import React from "react";

//Css
import "../auth-styles.css";

//Components
import SignUpForm from "./SignUpForm";

const Signup = () => {
  return (
    <>
      <div className="auth-body">
        <SignUpForm />
      </div>
    </>
  );
};

export default Signup;

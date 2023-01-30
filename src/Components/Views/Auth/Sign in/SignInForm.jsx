import React from "react";

//React router dom
import { Link, useNavigate } from "react-router-dom";

//Formik
import { Formik, Form, Field, ErrorMessage } from "formik";

const SignInForm = () => {
  return (
    <>
      <div className="auth-container">
        <Formik>
          {({ errors }) => (
            <Form>
              <h2>Sign in</h2>
              <div>
                <Field
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="input"
                />
                <ErrorMessage
                  name="email"
                  component={() => {
                    return <div></div>;
                  }}
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input"
                />
                <ErrorMessage
                  name="password"
                  component={() => {
                    return <div></div>;
                  }}
                />
              </div>
              <p>
                Don't you have an account?,{" "}
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "#6c60ff" }}
                >
                  Register now!
                </Link>
              </p>
              <button className="sign-button">Sign in</button>
              <button className="sign-with-google-button">
                Sign in with Google
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignInForm;

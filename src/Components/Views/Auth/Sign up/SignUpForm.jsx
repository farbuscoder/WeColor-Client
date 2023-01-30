import React from "react";

//Formik
import { Formik, Field, ErrorMessage, Form } from "formik";

//React router dom
import { Link, useNavigate } from "react-router-dom";

//Css
import "../auth-styles.css";

const SignUpForm = () => {
  return (
    <div className="auth-container">
      <Formik>
        {({ errors }) => (
          <Form>
            <h2>Sign Up</h2>
            <div>
              <Field
                type="text"
                name="username"
                placeholder="Username"
                className="input"
              />
              <ErrorMessage
                name="username"
                component={() => {
                  return <div></div>;
                }}
              />
            </div>
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
            <div>
              <Field
                type="password"
                name="repeated-password"
                placeholder="Repeat password"
                className="input"
              />
              <ErrorMessage
                name="repeated-password"
                component={() => {
                  return <div></div>;
                }}
              />
            </div>
            <p>
              Don't you have an account?,{" "}
              <Link
                to="/signin"
                style={{ textDecoration: "none", color: "#6c60ff" }}
              >
                Sign Up.
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
  );
};

export default SignUpForm;

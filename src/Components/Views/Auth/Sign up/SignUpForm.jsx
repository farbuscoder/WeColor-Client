import React from "react";

//Formik
import { Formik, Field, ErrorMessage, Form } from "formik";

//Yup
import * as Yup from "yup";

//React router dom
import { Link, useNavigate } from "react-router-dom";

//Libraries
import axios from "axios";
import Cookies from "js-cookie";

//Css
import "../auth-styles.css";

const { REACT_APP_API_DEV } = process.env;

const SignUpForm = () => {
  const url = REACT_APP_API_DEV;
  console.log(url);

  const navigate = useNavigate();

  //Validation Schema
  const required = "* Required field";

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, "Must have more than 5 characters")
      .required(required),
    email: Yup.string().email("Must be a valid email").required("required"),
    password: Yup.string()
      .min(8, ",Must be atleast 8 characters long")
      .required(required),
    confirmPassword: Yup.string()
      .min(8, ",Must be atleast 8 characters long")
      .required(required)
      .oneOf([Yup.ref("password")], "Your passwords do not match"),
  });

  return (
    <div className="auth-container">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          let user = {};

          user = {
            email: values.email,
            name: values.name,
            password: values.password,
          };
          //Function
        }}
      >
        {({ errors }) => (
          <Form>
            <h2>Sign Up</h2>
            <div>
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="input"
              />
              <ErrorMessage
                name="name"
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
                name="confirmPassword"
                placeholder="Repeat password"
                className="input"
              />
              <ErrorMessage
                name="confirmPassword"
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

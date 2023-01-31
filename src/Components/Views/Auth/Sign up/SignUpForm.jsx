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

//Redux
import {
  loginFailure,
  loginSuccess,
  loginStart,
} from "../../../../redux/userSlice";
import { useDispatch } from "react-redux";

const { REACT_APP_API_DEV_URL } = process.env;

const SignUpForm = () => {
  const url = REACT_APP_API_DEV_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (user) => {
    const { email, name, password } = user;

    dispatch(loginStart());

    try {
      const userRegistered = await axios.post(`${url}/auth/signup`, {
        email,
        name,
        password,
      });
      console.log(userRegistered);
      dispatch(loginSuccess(userRegistered.data.user));
      navigate("/signIn", { replace: true });
    } catch (error) {
      dispatch(loginFailure());
      console.log(error.response?.data.message);
    }
  };

  /* const setTokenToCookies = async (cookiesToken) => {
    Cookies.set("we_color_token", cookiesToken);
  };*/

  //Validation Schema
  const required = "* Required field";

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Must have more than 5 characters")
      .required(required),
    email: Yup.string().email("Must be a valid email").required(required),
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

          handleSignUp(user);
          console.log("SENT");
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
                className={errors.name ? "input error-border" : "input"}
              />
              <ErrorMessage
                name="name"
                component={() => {
                  return <div className="error">{errors.name}</div>;
                }}
              />
            </div>
            <div>
              <Field
                type="text"
                name="email"
                placeholder="Email"
                className={errors.email ? "input error-border" : "input"}
              />
              <ErrorMessage
                name="email"
                component={() => {
                  return <div className="error">{errors.email}</div>;
                }}
              />
            </div>
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={errors.password ? "input error-border" : "input"}
              />
              <ErrorMessage
                name="password"
                component={() => {
                  return <div className="error">{errors.password}</div>;
                }}
              />
            </div>
            <div>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Repeat password"
                className={
                  errors.confirmPassword ? "input error-border" : "input"
                }
              />
              <ErrorMessage
                name="confirmPassword"
                component={() => {
                  return <div className="error">{errors.confirmPassword}</div>;
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
            <button type="submit" className="sign-button">
              Sign up
            </button>
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

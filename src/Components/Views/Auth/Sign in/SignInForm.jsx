import React from "react";

//React router dom
import { Link, useNavigate } from "react-router-dom";

//Formik
import { Formik, Form, Field, ErrorMessage } from "formik";

//Yup
import * as Yup from "yup";

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
import { useSelector } from "react-redux";

const { REACT_APP_API_DEV_URL } = process.env;

const SignInForm = () => {
  const url = REACT_APP_API_DEV_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignIn = async (user) => {
    const { email, password } = user;

    dispatch(loginStart());

    try {
      const userLogged = await axios.post(
        `${url}/auth/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      console.log(userLogged);
      dispatch(loginSuccess(userLogged.data.user));
      setTokenToCookies(userLogged.data.token);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      dispatch(loginFailure());
      console.log(error.response?.data.message);
    }
  };

  const setTokenToCookies = async (cookiesToken) => {
    Cookies.set("we_color_token", cookiesToken);
  };

  //Validation Schema
  const required = "* Required field";

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Must be a valid email").required(required),
    password: Yup.string()
      .min(8, ",Must be atleast 8 characters long")
      .required(required),
  });

  return (
    <>
      <div className="auth-container">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            resetForm();
            let user = {};

            user = {
              email: values.email,
              password: values.password,
            };

            //Function
            handleSignIn(user);
          }}
        >
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
              <button type="submit" className="sign-button">
                Sign in
              </button>
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

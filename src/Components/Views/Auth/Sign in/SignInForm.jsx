import React, { useState, useEffect } from "react";

//React router dom
import { Link, useNavigate } from "react-router-dom";

//Formik
import { Formik, Form, Field, ErrorMessage } from "formik";

//Yup
import * as Yup from "yup";

//Libraries
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

//Css
import "../auth-styles.css";

//Redux
import {
  loginFailure,
  loginSuccess,
  loginStart,
  registeredFailure,
  registeredSuccess,
} from "../../../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

//Components
import { SwalError } from "../../../../utils/Swal";
import SimpleBackDrop from "../../../../utils/SimpleBackDrop";

const { REACT_APP_API_DEV_URL } = process.env;

const SignInForm = () => {
  const url = REACT_APP_API_DEV_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkmode } = useSelector((state) => state.darkmode);
  const { registered } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);
  const [errorSwal, setErrorSwal] = useState("");

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

      dispatch(loginSuccess(userLogged.data.user));
      setTokenToCookies(userLogged.data.token);
      navigate("/dashboard", { replace: true });
      dispatch(registeredSuccess());
    } catch (error) {
      dispatch(loginFailure());
      setErrorSwal(error.response?.data.message);
    }
  };

  useEffect(() => {
    if (registered) {
      toast.success(
        "Registered successfully, login to start creating color palettes!",
        {
          icon: "👏",
          duration: 5000,
        }
      );
    }

    return;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(registeredFailure());
    }, 5000);
  }, []);

  useEffect(() => {
    setErrorSwal("");
  }, [errorSwal]);

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
      {loading ? <SimpleBackDrop open={loading}></SimpleBackDrop> : <></>}
      {errorSwal != "" ? <SwalError message={errorSwal}></SwalError> : ""}
      <div
        className="auth-container"
        style={{ backgroundColor: darkmode ? "#2f2f2f" : "#ededed" }}
      >
        <Toaster position="top-center" />
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
            <Form style={{ backgroundColor: darkmode ? "#292929" : "#ffff" }}>
              <h2 style={{ color: darkmode ? "white" : "black" }}>Sign In</h2>
              <div>
                <Field
                  type="text"
                  name="email"
                  placeholder="Email"
                  className={errors.password ? "input error-border" : "input"}
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

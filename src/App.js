// React hooks
import React, { useState, useEffect } from "react";

// React router dom
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

//Framer motion
import { AnimatePresence, motion } from "framer-motion";

//Libraries
import Cookies from "js-cookie";

//Material UI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/readex-pro/600.css";

//Redux
import { useDispatch } from "react-redux";
import { setDarkModeToTrue, setDarkModeToFalse } from "./redux/darkModeSlice";
import { useSelector } from "react-redux";

//Views
import Home from "./Components/Views/Home/Home";
import Signin from "./Components/Views/Auth/Sign in/SignIn";
import Signup from "./Components/Views/Auth/Sign up/SignUp";
import Dashboard from "./Components/Views/Dashboard/Dashboard";
import Error404 from "./Components/Views/Error 404/Error404";
import ExploresPalettes from "./Components/Views/Explore Palettes/ExplorePalettes";
import FavoritesPalettes from "./Components/Views/Favorites Palettes/FavoritesPalettes";
import GeneratorView from "./Components/Views/GeneratorView/GeneratorView";
import ProfileView from "./Components/Views/ProfileView/ProfileView";
import UpdateProfile from "./Components/Views/UpdateProfile/UpdateProfile";
import Sidebar from "./Components/Sidebar/Sidebar";

//Components
import PrimarySearchAppBar from "../src/Components/Header/AppBar";
import SimpleBackDrop from "../src/utils/SimpleBackDrop";

//Hooks
import useMobile from "./Hooks/useMobile";

const RequireAuth = ({ children }) => {
  if (!Cookies.get("we_color_token")) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

const pageTransition = {
  in: {
    opacity: 1,
  },

  out: {
    opacity: 0,
  },
};

const App = () => {
  const [show, setShow] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const isMobile = useMobile();
  const location = useLocation();
  const { darkmode } = useSelector((state) => state.darkmode);
  const { currentUser } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(darkmode);

  console.log("App.js: " + isLogged);

  const theme = createTheme({
    palette: {
      mode: darkmode ? "dark" : "light",
    },
    typography: {
      fontFamily: "readex-pro/600.css",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isMobile ? <Sidebar show={show} setShow={setShow} /> : null}
        <PrimarySearchAppBar
          check={darkmode}
          change={() => {
            if (darkmode === true) {
              dispatch(setDarkModeToFalse(false));
            } else {
              dispatch(setDarkModeToTrue(true));
            }

            return;
          }}
          show={show}
          setShow={setShow}
          isMobile={isMobile}
        />

        <AnimatePresence>
          {currentUser ? (
            <SignInRoutes
              location={location}
              pageTransition={pageTransition}
              loading={loading}
            />
          ) : (
            <SignOutRoutes
              location={location}
              pageTransition={pageTransition}
            />
          )}
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
};

const SignOutRoutes = ({ location, pageTransition }) => {
  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        exact
        element={
          <motion.div
            className="page"
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
          >
            <Home />
          </motion.div>
        }
      ></Route>
      <Route
        path="/signin"
        element={
          <motion.div
            className="page"
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
          >
            <Signin />
          </motion.div>
        }
      ></Route>
      <Route
        path="/signup"
        element={
          <motion.div
            className="page"
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
          >
            <Signup />
          </motion.div>
        }
      ></Route>
      <Route
        path="*"
        element={
          <motion.div
            className="page"
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
          >
            <Error404 />
          </motion.div>
        }
      ></Route>
      <Route
        path="/explore"
        element={
          <motion.div
            className="page"
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
          >
            <ExploresPalettes />
          </motion.div>
        }
      ></Route>
      <Route
        path="generator"
        element={
          <motion.div
            className="page"
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
          >
            <GeneratorView />
          </motion.div>
        }
      ></Route>
    </Routes>
  );
};

const SignInRoutes = ({ location, pageTransition, loading }) => {
  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/explore"
        element={
          <motion.div
            className="page"
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
          >
            <ExploresPalettes />
          </motion.div>
        }
      ></Route>
      <Route
        path="/favorites"
        element={
          <RequireAuth>
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <FavoritesPalettes />
            </motion.div>
          </RequireAuth>
        }
      ></Route>
      <Route
        path="generator"
        element={
          <motion.div
            className="page"
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
          >
            <GeneratorView />
          </motion.div>
        }
      ></Route>
      <Route
        path="/profileview"
        element={
          <motion.div
            className="page"
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
          >
            <ProfileView />
          </motion.div>
        }
      ></Route>
      <Route
        path="/updateprofile"
        element={
          <RequireAuth>
            <motion.div
              className="page"
              initial="out"
              animate="in"
              exit="out"
              variants={pageTransition}
            >
              <UpdateProfile />
            </motion.div>
          </RequireAuth>
        }
      ></Route>
      <Route
        path="dashboard"
        element={
          <motion.div
            className="page"
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
          >
            <SimpleBackDrop open={loading}></SimpleBackDrop>

            <Dashboard />
          </motion.div>
        }
      ></Route>
      <Route
        path="*"
        element={
          <motion.div
            className="page"
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
          >
            {4 > 2 ? (
              <SimpleBackDrop open={loading}></SimpleBackDrop>
            ) : (
              <Error404 />
            )}
          </motion.div>
        }
      ></Route>
    </Routes>
  );
};

export default App;

import React from "react";

//React Router dom
import { Link } from "react-router-dom";

//Icons Material
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PaletteIcon from "@mui/icons-material/Palette";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";

//libraries
import Cookies from "js-cookie";

//Redux
import { useSelector } from "react-redux";
import { registeredFailure } from "../../redux/userSlice";
import { logout } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

//Css
import "./Sidebar-styles.css";

const Sidebar = (props) => {
  const { show, setShow } = props;
  const { darkmode } = useSelector((state) => state.darkmode);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleHide = () => {
    setShow(!show);
  };

  const signOut = () => {
    cleanCookies();
    dispatch(logout());
    dispatch(registeredFailure());
  };

  const cleanCookies = () => {
    Cookies.remove("we_color_token");
  };

  return (
    <>
      <div
        className={show ? "side-bar show" : "side-bar "}
        id="side-bar"
        style={{
          backgroundColor: darkmode ? "#292929" : "white",
        }}
      >
        <div
          style={{ cursor: "pointer", color: darkmode ? "white" : "black" }}
          className="side-bar-btn"
          onClick={handleHide}
        >
          <MenuIcon />
        </div>
        {currentUser ? (
          <LoggedUserList
            handleHide={handleHide}
            darkmode={darkmode}
            signOut={signOut}
          />
        ) : (
          <NotLoggedUserList handleHide={handleHide} darkmode={darkmode} />
        )}
      </div>
    </>
  );
};

const NotLoggedUserList = ({ handleHide, darkmode }) => {
  return (
    <ul>
      <li style={{ fontSize: "22px", color: darkmode ? "white" : "black" }}>
        <HomeIcon />
        <Link
          style={{ color: darkmode ? "white" : "black" }}
          onClick={handleHide}
          to="/"
        >
          Home
        </Link>
      </li>
      <li style={{ fontSize: "22px" }}>
        <PaletteIcon style={{ color: "#6C60FF" }} />
        <Link style={{ color: "#6C60FF" }} onClick={handleHide} to="/generator">
          Generator
        </Link>
      </li>
      <li
        style={{
          fontSize: "22px",
          borderBottom: "1px solid #848C8E",
          color: darkmode ? "#91E5F6" : "#2B4570",
        }}
      >
        <SearchIcon style={{ color: darkmode ? "#91E5F6" : "#2B4570" }} />
        <Link
          style={{ color: darkmode ? "#91E5F6" : "#2B4570" }}
          onClick={handleHide}
          to="/explore"
        >
          Explore
        </Link>
      </li>
      <li>
        <Link
          style={{ color: darkmode ? "white" : "black" }}
          onClick={handleHide}
          to="/signin"
        >
          Sign in
        </Link>
      </li>
      <li>
        <Link
          style={{ color: darkmode ? "white" : "black" }}
          onClick={handleHide}
          to="/signup"
        >
          Sign up
        </Link>
      </li>
    </ul>
  );
};

const LoggedUserList = ({ handleHide, darkmode, signOut }) => {
  return (
    <ul>
      <li style={{ fontSize: "22px" }}>
        <PaletteIcon style={{ color: "#6C60FF" }} />
        <Link style={{ color: "#6C60FF" }} onClick={handleHide} to="/generator">
          Generator
        </Link>
      </li>
      <li style={{ fontSize: "22px" }}>
        <SearchIcon style={{ color: darkmode ? "#91E5F6" : "#2B4570" }} />
        <Link
          style={{ color: darkmode ? "#91E5F6" : "#2B4570" }}
          onClick={handleHide}
          to="/explore"
        >
          Explore
        </Link>
      </li>
      <li style={{ fontSize: "22px", borderBottom: "1px solid #848C8E" }}>
        <DashboardIcon style={{ color: "#5CAB7D" }} />
        <Link style={{ color: "#5CAB7D" }} onClick={handleHide} to="/dashboard">
          DashBoard
        </Link>
      </li>
      <li>
        <Link
          style={{ color: darkmode ? "white" : "black" }}
          onClick={handleHide}
          to="/profileview"
        >
          Profile
        </Link>
      </li>
      <li>
        <Link
          style={{ color: darkmode ? "white" : "black" }}
          onClick={() => {
            handleHide();
            signOut();
          }}
          to="/"
        >
          Sign out
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;

import React, { useState } from "react";

//React Router dom
import { Link } from "react-router-dom";

//Icons Material
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PaletteIcon from "@mui/icons-material/Palette";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";

//Css
import "./Sidebar-styles.css";

const Sidebar = (props) => {
  const { show, setShow, isLogged, setIsLogged } = props;

  const handleHide = () => {
    setShow(!show);
  };

  return (
    <>
      <div className={show ? "side-bar show" : "side-bar "} id="side-bar">
        <div
          style={{ cursor: "pointer" }}
          className="side-bar-btn"
          onClick={handleHide}
        >
          <MenuIcon />
        </div>
        {isLogged ? (
          <LoggedUserList handleHide={handleHide} />
        ) : (
          <NotLoggedUserList handleHide={handleHide} />
        )}
      </div>
    </>
  );
};

const NotLoggedUserList = ({ handleHide }) => {
  return (
    <ul>
      <li style={{ fontSize: "22px" }}>
        <HomeIcon />
        <Link onClick={handleHide} to="/">
          Home
        </Link>
      </li>
      <li style={{ fontSize: "22px" }}>
        <PaletteIcon style={{ color: "#6C60FF" }} />
        <Link style={{ color: "#6C60FF" }} onClick={handleHide} to="/generator">
          Generator
        </Link>
      </li>
      <li style={{ fontSize: "22px", borderBottom: "1px solid #848C8E" }}>
        <SearchIcon style={{ color: "#2B4570" }} />
        <Link style={{ color: "#2B4570" }} onClick={handleHide} to="/explore">
          Explore
        </Link>
      </li>
      <li>
        <Link onClick={handleHide} to="/signin">
          Sign in
        </Link>
      </li>
      <li>
        <Link onClick={handleHide} to="/signup">
          Sign up
        </Link>
      </li>
    </ul>
  );
};

const LoggedUserList = ({ handleHide }) => {
  return (
    <ul>
      <li style={{ fontSize: "22px" }}>
        <HomeIcon />
        <Link onClick={handleHide} to="/">
          Home
        </Link>
      </li>
      <li style={{ fontSize: "22px" }}>
        <PaletteIcon style={{ color: "#6C60FF" }} />
        <Link style={{ color: "#6C60FF" }} onClick={handleHide} to="/generator">
          Generator
        </Link>
      </li>
      <li style={{ fontSize: "22px" }}>
        <SearchIcon style={{ color: "#2B4570" }} />
        <Link style={{ color: "#2B4570" }} onClick={handleHide} to="/explore">
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
        <Link onClick={handleHide} to="/profileview">
          Profile
        </Link>
      </li>
      <li>
        <Link onClick={handleHide} to="/">
          Sign out
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;

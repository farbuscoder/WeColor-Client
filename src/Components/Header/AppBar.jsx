import React, { useState, useEffect } from "react";

// Material UI
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Switch from "@mui/material/Switch";
import HomeIcon from "@mui/icons-material/Home";
import PaletteIcon from "@mui/icons-material/Palette";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "@fontsource/kalam";

//Redux
import { useSelector } from "react-redux";
import { registeredFailure } from "../../redux/userSlice";
import { logout } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

//React router dom
import { Link } from "react-router-dom";

//Libraries
import Cookies from "js-cookie";

const label = { inputProps: { "aria-label": "Switch demo" } };

const PrimarySearchAppBar = ({ check, change, show, setShow, isMobile }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const signOut = () => {
    cleanCookies();
    dispatch(logout());
    dispatch(registeredFailure());
  };

  const cleanCookies = () => {
    Cookies.remove("we_color_token");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const showClass = () => {
    setShow(!show);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {currentUser ? (
        <LoggedRenderMenu
          check={check}
          handleMenuClose={handleMenuClose}
          signOut={signOut}
        />
      ) : (
        <NotLoggedRenderMenu check={check} handleMenuClose={handleMenuClose} />
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {currentUser ? (
        <LoggedRenderMobileMenu
          check={check}
          handleMobileMenuClose={handleMobileMenuClose}
        />
      ) : (
        <NotLoggedRenderMobileMenu
          check={check}
          handleMobileMenuClose={handleMobileMenuClose}
        />
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          {isMobile ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={showClass}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <></>
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "flex", sm: "block" } }}
            color={check ? "#6C60FF" : "#6C60FF"}
            fontSize="35px"
            fontFamily={"kalam"}
          >
            WeColor
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <Switch {...label} onChange={change} checked={check} />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          {!isMobile ? (
            <Box sx={{ display: { xs: "flex", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default PrimarySearchAppBar;

const NotLoggedRenderMobileMenu = ({ check, handleMobileMenuClose }) => {
  return (
    <div>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: check ? "white" : "black",
        }}
      >
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge>
              <HomeIcon />
            </Badge>
          </IconButton>
          <p>Home</p>
        </MenuItem>
      </Link>
      <Link
        to="generator"
        style={{
          textDecoration: "none",
          color: "#6C60FF",
        }}
      >
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge>
              <PaletteIcon />
            </Badge>
          </IconButton>
          <p>Generator</p>
        </MenuItem>
      </Link>
      <Link
        to="explore"
        style={{
          textDecoration: "none",
          color: !check ? "#2B4570" : "#91E5F6",
        }}
      >
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <SearchIcon />
          </IconButton>
          <p>Explore</p>
        </MenuItem>
      </Link>
    </div>
  );
};

const LoggedRenderMobileMenu = ({ check, handleMobileMenuClose }) => {
  return (
    <div>
      <Link
        to="generator"
        style={{
          textDecoration: "none",
          color: "#6C60FF",
        }}
      >
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge>
              <PaletteIcon />
            </Badge>
          </IconButton>
          <p>Generator</p>
        </MenuItem>
      </Link>
      <Link
        to="explore"
        style={{
          textDecoration: "none",
          color: !check ? "#2B4570" : "#91E5F6",
        }}
      >
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <SearchIcon />
          </IconButton>
          <p>Explore</p>
        </MenuItem>
      </Link>
      <Link to="dashboard" style={{ textDecoration: "none", color: "#5CAB7D" }}>
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <DashboardIcon />
          </IconButton>
          <p>Dashboard</p>
        </MenuItem>
      </Link>
    </div>
  );
};

const LoggedRenderMenu = ({ check, handleMenuClose, signOut }) => {
  return (
    <div>
      <MenuItem onClick={handleMenuClose}>
        <Link
          style={{
            textDecoration: "none",
            color: check ? "white" : "black",
          }}
          to="/profileview"
        >
          Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link
          style={{
            textDecoration: "none",
            color: check ? "white" : "black",
          }}
          to="/"
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </Link>
      </MenuItem>
    </div>
  );
};

const NotLoggedRenderMenu = ({ check, handleMenuClose }) => {
  return (
    <div>
      <MenuItem onClick={handleMenuClose}>
        <Link
          style={{
            textDecoration: "none",
            color: check ? "white" : "black",
          }}
          to="/signin"
        >
          Sign in
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link
          style={{
            textDecoration: "none",
            color: check ? "white" : "black",
          }}
          to="/signup"
        >
          Sign up
        </Link>
      </MenuItem>
    </div>
  );
};

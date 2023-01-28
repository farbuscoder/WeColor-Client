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

const label = { inputProps: { "aria-label": "Switch demo" } };

const PrimarySearchAppBar = ({
  check,
  change,
  show,
  setShow,
  isMobile,
  isLogged,
  setIsLogged,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
      {isLogged ? (
        <div>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleMenuClose}>Sign in</MenuItem>
          <MenuItem onClick={handleMenuClose}>Sign up</MenuItem>
        </div>
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
      {isLogged ? (
        <div>
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
          <MenuItem onClick={handleMobileMenuClose}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge>
                <PaletteIcon style={{ color: "#6C60FF" }} />
              </Badge>
            </IconButton>
            <p style={{ color: "#6C60FF" }}>Generator</p>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <SearchIcon style={{ color: !check ? "#2B4570" : "#91E5F6" }} />
            </IconButton>
            <p style={{ color: !check ? "#2B4570" : "#91E5F6" }}>Explore</p>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <DashboardIcon style={{ color: "#5CAB7D" }} />
            </IconButton>
            <p style={{ color: "#5CAB7D" }}>Dashboard</p>
          </MenuItem>
        </div>
      ) : (
        <div>
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
          <MenuItem onClick={handleMobileMenuClose}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge>
                <PaletteIcon style={{ color: "#6C60FF" }} />
              </Badge>
            </IconButton>
            <p style={{ color: "#6C60FF" }}>Generator</p>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <SearchIcon style={{ color: !check ? "#2B4570" : "#91E5F6" }} />
            </IconButton>
            <p style={{ color: !check ? "#2B4570" : "#91E5F6" }}>Explore</p>
          </MenuItem>
        </div>
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

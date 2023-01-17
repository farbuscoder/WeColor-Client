import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { DarkMode } from "@mui/icons-material";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function ButtonAppBar({ check, change }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Switch {...label} onChange={change} checked={check} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

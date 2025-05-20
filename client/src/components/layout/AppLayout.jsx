import React, { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  useTheme,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import PieChartIcon from "@mui/icons-material/PieChart";
import {
  Menu as MenuIcon,
  Upload as UploadIcon,
  Person as PersonIcon,
  VideoLibrary as VideoIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { Link, Outlet, useLocation } from "react-router-dom";

const drawerWidth = 240;

const AppLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const navItems = [
    { text: "Dashboard", icon: <GridViewIcon />, path: "/" },
    { text: "Transactions", icon: <SyncAltIcon />, path: "/transactions" },
    { text: "Charts", icon: <PieChartIcon />, path: "/charts" },
    { text: "Profile", icon: <PersonIcon />, path: "/profile" },
  ];

  const bottomNav = [

    { text: "Settings", icon: <PersonIcon />, path: "/setting" },
    { text: "Logout", icon: <PersonIcon />, path: "/logout" },
  ]

  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            My App
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
  variant="permanent"
  open={open}
  sx={{
    width: open ? drawerWidth : 64,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: open ? drawerWidth : 64,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: "hidden",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between", // Push bottom section down
    },
  }}
>
  <Box>
    <Toolbar />
    <List>
      {navItems.map((item) => {
        const isActive =
        location.pathname === item.path || location.pathname.startsWith(item.path + '/');

        return (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              color: isActive ? "blue" : "inherit",
              backgroundColor: isActive
                ? "rgba(0, 0, 255, 0.1)"
                : "transparent",
            }}
          >
            <ListItemIcon sx={{ color: isActive ? "blue" : "inherit" }}>
              {item.icon}
            </ListItemIcon>
            {open && <ListItemText primary={item.text} />}
          </ListItem>
        );
      })}
    </List>
  </Box>

  <Box>
  <List>
  {bottomNav.map((item) => {
    const isActive = location.pathname === item.path;
    const isLogout = item.text.toLowerCase().includes("logout");

    return (
      <ListItem
        button
        key={item.text}
        component={Link}
        to={item.path}
        sx={{
          color: isLogout ? "red" : isActive ? "blue" : "inherit",
          backgroundColor: isActive
            ? "rgba(0, 0, 255, 0.1)"
            : "transparent",
        }}
      >
        <ListItemIcon sx={{ color: isLogout ? "red" : isActive ? "blue" : "inherit" }}>
          {item.icon}
        </ListItemIcon>

        {open && (
          <ListItemText
            primary={item.text}
            className={isLogout ? "text-red-600" : ""}
          />
        )}
      </ListItem>
    );
  })}
</List>
  </Box>
</Drawer>


      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f5f5",
          p: 3,
          mt: 2,
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>

    
    </Box>
  );
};

export default AppLayout;
 
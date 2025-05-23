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
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Upload as UploadIcon,
  Person as PersonIcon,
  VideoLibrary as VideoIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import GridViewIcon from "@mui/icons-material/GridView";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import PieChartIcon from "@mui/icons-material/PieChart";
import { Link, Outlet, useLocation } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AddTransactions from "../AddTransactions";
import {useSelector} from 'react-redux'
import { logout } from "../../Redux/api/authSlice";

const drawerWidth = 240;

const AppLayout = () => {

  const {user} = useSelector((state) => state.auth)
  console.log(user);
  

  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [opentransaction, setOpenTransaction] = useState(false)
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };

  const navItems = [
    { text: "Dashboard", icon: <GridViewIcon />, path: "/" },
    { text: "Transactions", icon: <SyncAltIcon />, path: "/transactions" },
    { text: "Charts", icon: <PieChartIcon />, path: "/charts" },
    { text: "Profile", icon: <PersonIcon />, path: "/profile" },
  ];

  const handleLogout = () => {
    logout()
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ mr: 2 }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap>
              Finance Tracker
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Button
              variant="contained"
              size="small"
              sx={{ backgroundColor: "#000" }}
              onClick={() => setOpenTransaction(true)}
            >
              + Add Transaction
            </Button>
            <IconButton>
              <Box
                sx={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  bgcolor: "#000",
                  color: "white",
                }}
              >
                {user.username.charAt(0)}
              </Box>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
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
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          <Toolbar />
          <List>
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                location.pathname.startsWith(item.path + "/");

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
            <ListItem component={Link} to='/setting'>
              <ListItemIcon>
              <SettingsIcon />
              </ListItemIcon>
              {open && <ListItemText>Setting</ListItemText>}
            </ListItem>

            <ListItem onClick={handleLogout} sx={{color: 'red'}} component={Link} to='/login'>
              <ListItemIcon>
              <LogoutIcon sx={{color: 'red'}}/>
              </ListItemIcon>
              {open && <ListItemText >Logout</ListItemText>}
            </ListItem>
          </List>
          {/* <List>
            {bottomNav.map((item) => {
              const isActive = location.pathname === item.path;
              const isLogout = item.text.toLowerCase().includes("logout");

              return (
                <ListItem
                  button
                  key={item.text}
                  component={item.path ? Link : "div"}
                  to={item.path || "#"}
                  sx={{
                    color: isLogout ? "red" : isActive ? "blue" : "inherit",
                    backgroundColor: isActive
                      ? "rgba(0, 0, 255, 0.1)"
                      : "transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isLogout ? "red" : isActive ? "blue" : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.text}
                      sx={isLogout ? { color: "red" } : {}}
                    />
                  )}
                </ListItem>
              );
            })}
          </List> */}
        </Box>
      </Drawer>

      {/* Main Content */}
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
      <AddTransactions
      opentransaction={opentransaction}
      setOpenTransaction={setOpenTransaction}
    />
    </Box>
  );
};

export default AppLayout;

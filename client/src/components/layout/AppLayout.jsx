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
  Button,
  Tooltip,
  useTheme,
  useMediaQuery,
  ListItemButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Upload as UploadIcon,
  Person as PersonIcon,
  VideoLibrary as VideoIcon,
  ChevronLeft as ChevronLeftIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import GridViewIcon from "@mui/icons-material/GridView";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import PieChartIcon from "@mui/icons-material/PieChart";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, Outlet, useLocation } from "react-router-dom";
import AddTransactions from "../AddTransactions";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/api/authSlice";
import UploadTransaction from "../UploadTransaction";

const drawerWidth = 240;

const AppLayout = ({ mode, toggleTheme }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(!isMobile);
  const [opentransaction, setOpenTransaction] = useState(false);
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const navItems = [
    { text: "Dashboard", icon: <GridViewIcon />, path: "/dashboard" },
    { text: "Transactions", icon: <SyncAltIcon />, path: "/transactions" },
    { text: "Charts", icon: <PieChartIcon />, path: "/charts" },
    { text: "Profile", icon: <PersonIcon />, path: "/profile" },
    { text: "Trashed", icon: <DeleteIcon />, path: "/trash" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <IconButton
              color="inherit"
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

          <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title="Toggle light/dark theme">
              <IconButton onClick={toggleTheme}>
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>

            {!isMobile && (
              <>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setOpenTransaction(true)}
                >
                  Add Transaction
                </Button>
                <IconButton
                  onClick={() => setOpenUploadFile(true)}
                  color="primary"
                >
                  <FileUploadIcon />
                </IconButton>
              </>
            )}

            <IconButton component={Link} to="/profile">
              <Box
                sx={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  bgcolor: "#000",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {user?.username?.[0]?.toUpperCase()}
              </Box>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={handleDrawerToggle}
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
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    sx={{
                      color: isActive ? "blue" : "inherit",
                      backgroundColor: isActive ? "rgba(0, 0, 255, 0.1)" : "transparent",
                    }}
                  >
                    <ListItemIcon sx={{ color: isActive ? "blue" : "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    {open && <ListItemText primary={item.text} />}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Box>
          <List>
            <ListItem onClick={handleLogout} component={Link} to="/login">
              <ListItemIcon>
                <LogoutIcon sx={{ color: "red" }} />
              </ListItemIcon>
              {open && <ListItemText sx={{ color: "red" }} primary="Logout" />}
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 2,
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {isMobile && (
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Button
              variant="contained"
              size="small"
              fullWidth
              onClick={() => setOpenTransaction(true)}
            >
              Add Transaction
            </Button>
            <IconButton
              onClick={() => setOpenUploadFile(true)}
              sx={{ ml: 1 }}
              color="primary"
            >
              <FileUploadIcon />
            </IconButton>
          </Box>
        )}

        <Outlet />
      </Box>

      <AddTransactions
        opentransaction={opentransaction}
        setOpenTransaction={setOpenTransaction}
      />
      <UploadTransaction
        openUploadFile={openUploadFile}
        setOpenUploadFile={setOpenUploadFile}
      />
    </Box>
  );
};

export default AppLayout;

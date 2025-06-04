import React, { useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Charts from "./pages/Charts";
import Profile from "./pages/Profile";
import Trash from "./pages/Trash";

import LoginPage from "./components/authantication/Login";
import SignupPage from "./components/authantication/Signup";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ForgetPassword from "./components/authantication/ForgetPassword";

const App = () => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className="w-full min-h-screen">
        <Routes>
          <Route path="/register" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            element={
              <ProtectedRoutes>
                <AppLayout mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoutes>
            }
          >
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoutes>
                  <Transactions />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/charts"
              element={
                <ProtectedRoutes>
                  <Charts />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/trash"
              element={
                <ProtectedRoutes>
                  <Trash />
                </ProtectedRoutes>
              }
            />
          </Route>
        </Routes>
      </main>
    </ThemeProvider>
  );
};

export default App;

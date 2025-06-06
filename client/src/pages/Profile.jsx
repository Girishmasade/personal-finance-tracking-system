import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Person, Security, Download } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Text from "../components/Text";
import {
  useGetUserProfileQuery,
  useUpdateUserMutation,
} from "../Redux/app/authApiSlice";
import { useSelector } from "react-redux";

const tabItems = [
  { icon: <Person />, label: "Profile" },
  { icon: <Security />, label: "Security" },
  { icon: <Download />, label: "Export Data" },
];

const Profile = () => {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { user } = useSelector((state) => state.auth);
  const { data, isError, error } = useGetUserProfileQuery(user.id);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (form.newPassword && form.newPassword === form.confirmNewPassword) {
    form.password = form.newPassword;
  }

  const handleChange = (index) => setTab(index);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (data) {
      setForm((prev) => ({
        ...prev,
        username: data?.user?.username || "",
        firstname: data?.user?.firstname || "",
        lastname: data?.user?.lastname || "",
        email: data?.user?.email || "",
        address: data?.user?.address || "",
        phone: data?.user?.phone || "",
      }));
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ id: user.id, ...form }).unwrap();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Profile Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error?.data?.message || "Failed to update profile",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (isLoading) return <p>Loading profile...</p>;
  if (isError) return <p>Error: {error?.data?.message || "Something went wrong"}</p>;

  return (
    <Box p={{ xs: 2, sm: 3, md: 4 }}>
      <Paper elevation={2}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          minHeight="100%"
        >
          {/* Sidebar */}
          <Box
            width={{ xs: "100%", md: "250px" }}
            borderRight={{ md: "1px solid #ddd" }}
            borderBottom={{ xs: "1px solid #ddd", md: "none" }}
          >
            <List sx={{ display: "flex", flexDirection: { xs: "row", md: "column" } }}>
              {tabItems.map((item, index) => (
                <ListItem
                  key={item.label}
                  selected={tab === index}
                  onClick={() => handleChange(index)}
                  sx={{
                    flex: 1,
                    justifyContent: { xs: "center", md: "flex-start" },
                    cursor: "pointer",
                    backgroundColor: tab === index ? "#f0f0f0" : "inherit",
                    borderLeft: {
                      md: tab === index ? "4px solid #1976d2" : "4px solid transparent",
                    },
                    color: tab === index ? "#1976d2" : "inherit",
                    fontWeight: tab === index ? "bold" : "normal",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{ color: tab === index ? "#1976d2" : "inherit", minWidth: 36 }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {isSmallScreen ? null : <ListItemText primary={item.label} />}
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Main Content */}
          <Box flex={1} p={{ xs: 2, sm: 3, md: 4 }}>
            {tab === 0 && (
              <>
                <Text
                  title="Personal Information"
                  subTitle="Enter your details to update your profile"
                />
                <form onSubmit={handleSubmit}>
                  {[
                    { label: "Username", name: "username" },
                    { label: "First Name", name: "firstname" },
                    { label: "Last Name", name: "lastname" },
                    { label: "Email", name: "email", type: "email" },
                    { label: "Address", name: "address" },
                    { label: "Phone Number", name: "phone" },
                  ].map(({ label, name, type = "text" }) => (
                    <FormControl fullWidth sx={{ mb: 2 }} key={name}>
                      <FormLabel>{label}</FormLabel>
                      <OutlinedInput
                        name={name}
                        type={type}
                        value={form[name]}
                        onChange={handleInputChange}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                      />
                    </FormControl>
                  ))}
                </form>
              </>
            )}

            {tab === 1 && (
              <>
                <Typography variant="h6" mb={2}>
                  Security Settings
                </Typography>
                {[
                  { label: "Current Password", name: "currentPassword" },
                  { label: "New Password", name: "newPassword" },
                  { label: "Confirm New Password", name: "confirmNewPassword" },
                ].map(({ label, name }) => (
                  <FormControl fullWidth sx={{ mb: 2 }} key={name}>
                    <FormLabel>{label}</FormLabel>
                    <OutlinedInput
                      type="password"
                      name={name}
                      value={form[name]}
                      onChange={handleInputChange}
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                  </FormControl>
                ))}
              </>
            )}

            {tab === 2 && (
              <>
                <Typography variant="h6" mb={2}>
                  Export Your Data
                </Typography>
                <Typography variant="body1" mb={2}>
                  Download a copy of your personal data including your profile,
                  payment history, and activity logs.
                </Typography>
                <Button variant="contained" color="primary">
                  Export Data
                </Button>
              </>
            )}

            {tab !== 2 && (
              <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                <Button variant="outlined">Cancel</Button>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  variant="contained"
                  color="primary"
                >
                  {isLoading ? "Updating..." : "Update"}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;

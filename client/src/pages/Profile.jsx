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
} from "@mui/material";
import { Person, Security, Download } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Text from "../components/Text";
import { useUpdateUserMutation } from "../Redux/app/authApiSlice";
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

console.log(user);


  if (form.newPassword && form.newPassword === form.confirmNewPassword) {
    form.password = form.newPassword;
  }

  const handleChange = (index) => {
    setTab(index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        username: user.username || "",
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        id: user.id,
        ...form,
      }).unwrap();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Profile Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error?.data?.message || "Failed to update profile",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Box p={4}>
      <Paper elevation={2}>
        <Box display="flex">
          {/* Sidebar */}
          <Box
            width="250px"
            borderRight="1px solid #ddd"
            height="100%"
            minHeight="500px"
          >
            <List>
              {tabItems.map((item, index) => (
                <ListItem
                  key={item.label}
                  selected={tab === index}
                  onClick={() => handleChange(index)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: tab === index ? "#f0f0f0" : "inherit",
                    borderLeft:
                      tab === index
                        ? "4px solid #1976d2"
                        : "4px solid transparent",
                    color: tab === index ? "#1976d2" : "inherit",
                    fontWeight: tab === index ? "bold" : "normal",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: tab === index ? "#1976d2" : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Content Area */}
          <Box flex={1} p={4}>
            {tab === 0 && (
              <Box>
                <Text
                  title="Personal Information"
                  subTitle="Enter your details to update your profile"
                />

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-wrap flex-col pt-7 gap-4 w-full"
                >
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <FormLabel>Username</FormLabel>
                    <OutlinedInput
                      name="username"
                      value={form.username}
                      onChange={handleInputChange}
                      placeholder="Enter your username"
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <FormLabel>First Name</FormLabel>
                    <OutlinedInput
                      name="firstname"
                      value={form.firstname}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <FormLabel>Last Name</FormLabel>
                    <OutlinedInput
                      name="lastname"
                      value={form.lastname}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <FormLabel>Email</FormLabel>
                    <OutlinedInput
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <FormLabel>Address</FormLabel>
                    <OutlinedInput
                      name="address"
                      value={form.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <FormLabel>Phone Number</FormLabel>
                    <OutlinedInput
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </FormControl>
                </form>
              </Box>
            )}

            {tab === 1 && (
              <Box>
                <Typography variant="h6" mb={2}>
                  Security Settings
                </Typography>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel>Current Password</FormLabel>
                  <OutlinedInput
                    type="password"
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Enter current password"
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel>New Password</FormLabel>
                  <OutlinedInput
                    type="password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel>Confirm New Password</FormLabel>
                  <OutlinedInput
                    type="password"
                    name="confirmNewPassword"
                    value={form.confirmNewPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm new password"
                  />
                </FormControl>
              </Box>
            )}

            {tab === 2 && (
              <Box>
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
              </Box>
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

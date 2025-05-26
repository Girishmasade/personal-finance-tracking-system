import {
  Box,
  Button,
  Divider,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Person, Security, Download } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
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
  });
  const [updateUser, { isLoading, error}] = useUpdateUserMutation();
  const { user } = useSelector((state) => state.auth);
  // console.log("user", user);


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
    setForm((prev) =>({
      ...prev,
      username: user.username || "",
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      email: user.email || "",
      address: user.address || "",
      phone: user.phone || ""
    }))
   }
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({
        id: user.id,
        ...form,      
      }).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={4}>
      <Paper elevation={1}>
        <List>
          {tabItems.map((item, index) => (
            <ListItem
              key={item.label}
              selected={tab === index}
              onClick={() => handleChange(index)}
              sx={{ cursor: "pointer" }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Divider sx={{ my: 3 }} />
      {tab === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "2px",
            paddingLeft: "21px",
          }}
        >
          <Text
            title={"Personal Information"}
            subTitle={"Enter your details update here"}
          />

          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap flex-col pt-7 gap-4 w-full"
          >
            <div>
              <InputLabel> Username </InputLabel>
              <TextField
                fullWidth
                name="username"
                type="text"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleInputChange}
                autoComplete="username"
                autoFocus
              />
            </div>

            <div>
              <InputLabel> First Name </InputLabel>
              <TextField
                fullWidth
                name="firstname"
                type="text"
                placeholder="Enter your first name"
                value={form.firstname}
                onChange={handleInputChange}
                autoComplete="firstname"
                autoFocus
              />
            </div>

            <div>
              <InputLabel> Last Name </InputLabel>
              <TextField
                fullWidth
                name="lastname"
                type="text"
                placeholder="Enter your last name"
                value={form.lastname}
                onChange={handleInputChange}
                autoComplete="lastname"
                autoFocus
              />
            </div>

            <div>
              <InputLabel> Email </InputLabel>
              <TextField
                fullWidth
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleInputChange}
                autoComplete="email"
                autoFocus
              />
            </div>

            <div>
              <InputLabel> Address </InputLabel>
              <TextField
                fullWidth
                name="address"
                type="text"
                placeholder="Enter your address"
                value={form.address}
                onChange={handleInputChange}
                autoComplete="address"
                autoFocus
              />
            </div>
            <div>
              <InputLabel> Phone no. </InputLabel>
              <TextField
                fullWidth
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleInputChange}
                autoComplete="tel"
                autoFocus
              />
            </div>
          </form>
        </Box>
      )}

      {tab === 1 && (
        <Box>
          <Typography variant="h6" mb={2}>
            Security Settings
          </Typography>
          <TextField
            label="Current Password"
            type="password"
            value={form.currentPassword}
            onChange={handleInputChange}
            name="currentPassword"
            autoComplete="current-password"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="New Password"
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleInputChange}
            autoComplete="new-password"
            placeholder="Enter new password"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            name="confirmNewPassword"
            value={form.confirmNewPassword}
            onChange={handleInputChange}
            autoComplete="new-password"
            placeholder="Confirm new password"
            fullWidth
            sx={{ mb: 2 }}
          />
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
        <Box
          sx={{
            display: "flex",
            gap: "4px",
            justifyContent: "end",
            paddingTop: "4px",
          }}
        >
          <Button variant="outlined">Cancel</Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
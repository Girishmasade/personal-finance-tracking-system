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
import React, { useState } from "react";
import Text from "../components/Text";

const tabItems = [
  { icon: <Person />, label: "Profile" },
  { icon: <Security />, label: "Security" },
  { icon: <Download />, label: "Export Data" },
];

const Profile = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (index) => {
    setTab(index);
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

          <form className="flex flex-wrap flex-col pt-7 gap-4 w-full">
            <div>
              <InputLabel> First Name </InputLabel>
              <TextField fullWidth />
            </div>

            <div>
              <InputLabel> Last Name </InputLabel>
              <TextField fullWidth />
            </div>

            <div>
              <InputLabel> Email </InputLabel>
              <TextField fullWidth />
            </div>

            <div>
              <InputLabel> Address </InputLabel>
              <TextField fullWidth />
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
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
          />
        </Box>
      )}

      {tab === 2 && (
          <Box>
          <Typography variant="h6" mb={2}>Export Your Data</Typography>
          <Typography variant="body1" mb={2}>
            Download a copy of your personal data including your profile, payment history, and activity logs.
          </Typography>
          <Button variant="contained" color="primary">Export Data</Button>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          gap: "4px",
          justifyContent: "end",
          paddingTop: "4px",
        }}
      >
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained">Update</Button>
      </Box>
    </Box>
  );
};

export default Profile;
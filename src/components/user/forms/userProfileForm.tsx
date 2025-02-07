import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axiosInstance from "../../../configs/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

const UserProfileForm = ({ handleClose }) => {
    const [loading,setLoading] = useState(false);
  const parcedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: parcedUser.username,
    email: parcedUser.email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
        setLoading(true);
      const token = localStorage.getItem("userLibraryToken");
      const response = await axiosInstance.put("/update-profile", user, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response) {
        console.log("userData", response.data.userData);
        console.log("rspoonse", response.data);
        localStorage.setItem("user", JSON.stringify(response.data.userData));
        toast.success(response.data.message);
        setTimeout(() => {
          handleClose();
        }, 1000);
        setLoading(false)
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 4,
        mt: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 3,
        bgcolor: "#242324", // Change background color here
      }}
    >
      <ToastContainer />
      <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: "primary.main" }}>
        {/* You can replace this with a user's image */}
      </Avatar>
      <Typography color="#ffffff" variant="h5" fontWeight="bold" mb={2}>
        User Profile
      </Typography>
      <Box
        component="form"
        sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2, // Rounded borders
              "& fieldset": {
                borderColor: "white", // Default outline color
              },
              "&:hover fieldset": {
                borderColor: "white", // Outline color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Outline color when focused
              },
            },
            input: { color: "white" }, // Text color
            label: { color: "white" }, // Label color
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white", // Keeps label white when focused
            },
          }}
          label="Username"
          name="username"
          value={user.username}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2, // Rounded borders
              "& fieldset": {
                borderColor: "white", // Default outline color
              },
              "&:hover fieldset": {
                borderColor: "white", // Outline color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Outline color when focused
              },
            },
            input: { color: "white" }, // Text color
            label: { color: "white" }, // Label color
            "& .MuiInputLabel-root.Mui-focused": {
              color: "white", // Keeps label white when focused
            },
          }}
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="warning"
          fullWidth
          sx={{ mt: 2 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </Box>
    </Paper>
  );
};

export default UserProfileForm;

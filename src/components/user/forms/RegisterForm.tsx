import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../../../configs/axiosInstance';
import {
  TextField,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from 'react';

const SignUpForm = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "",username:"",confirmPassword:"" });

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let tempErrors = { email: "", password: "",username:"",confirmPassword:"" };
    if (!username) tempErrors.username = "Please enter your username";
    if (username.length < 4)
        tempErrors.username = "Username must be at least 4 characters";
    if (!email){
tempErrors.email = "Please enter your email address"
    } else if (!emailRegex.test(email)) tempErrors.email = "Invalid email format";

    
    if (!password){
        tempErrors.password = "Please enter your password";
    } else if (password.length < 6)
        tempErrors.password = "Password must be at least 6 characters";
    
    if (!confirmPassword){
        tempErrors.confirmPassword = "Please confirm your password";
    } else  if (password!==confirmPassword) tempErrors.confirmPassword = "Password not match";
   
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // setErrors([]);

    try {
      const response = await axiosInstance.post("/sign-up", {
        username,
        email,
        password,
        confirmPassword
      });

      if (response) {

        console.log("Sign in Successful", response.data);
        toast.success(response.data.message);
   
        

      } 
    } catch (error:any) {
        toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: "url('https://medisepkerala.com/img/background.svg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
       <ToastContainer/>
      <Card
        elevation={6}
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Sign up to Your Account
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={Boolean(errors.username)}
              helperText={errors.username}
            />

            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            <TextField
              label="Password"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 2, py: 1.5, fontWeight: "bold", borderRadius: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            You already have an account?{" "}
            <Button
              variant="text"
              size="small"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
    </Box>
  );
};

export default SignUpForm;

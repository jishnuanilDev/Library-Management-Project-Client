import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
   
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
import React from "react";
import axiosInstance from "../../../configs/axiosInstance";


const AdminLoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    let tempErrors = { email: "", password: "" };
    if (!email){
      tempErrors.email = "Email address is required";

    } else if (!email.includes("@")) tempErrors.email = "Invalid email address";
    
    if (!password)
      tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    axiosInstance
  .post("/admin/sign-in", {
    email,
    password,
  })
  .then((response) => {
   
      localStorage.setItem('admin', JSON.stringify(response.data.adminData));
      toast.success(response.data.message);
      if( response.data.adminLibraryToken){
        localStorage.setItem('adminLibraryToken', response.data.adminLibraryToken);
      }
      navigate('/admin/dashboard');

  })
  .catch((error) => {
    console.log(error)
    toast.error(error.response.data.message);
  })
  .finally(() => {
    setLoading(false);
  });
  
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
        <ToastContainer />
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
          Admin Login
          </Typography>

          <form onSubmit={handleSubmit}>
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
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

        </CardContent>
      </Card>
    </Container>
    </Box>
  );
};

export default AdminLoginForm;

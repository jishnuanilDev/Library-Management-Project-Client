import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../../configs/axiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
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
import { setUserId } from "../../../redux/slices/userSlice";


const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    let tempErrors = { email: "", password: "" };
    if (!email.includes("@")) tempErrors.email = "Invalid email address";
    if (password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    axiosInstance
  .post("/sign-in", {
    email,
    password,
  })
  .then((response) => {
      console.log("Signup Successful", response.data);

      dispatch(setUserId(response.data.userData.userId));
      localStorage.setItem('user', JSON.stringify(response.data.userData));
      toast.success(response.data.message);
      if( response.data.userLibraryToken){
        localStorage.setItem('userLibraryToken', response.data.userLibraryToken);
      }
      navigate('/dashboard');

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
            Login to Your Account
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
            Don't have an account?{" "}
            <Button
              variant="text"
              size="small"
              onClick={() => navigate('/sign-up')}
            >
              Sign Up
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
    </Box>
  );
};

export default LoginForm;

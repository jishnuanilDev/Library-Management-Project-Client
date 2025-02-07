import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const ProtectedLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("userLibraryToken");
    const currentPath = window.location.pathname;
    if (!token) {
      navigate("/login") 
      setLoading(false);
    } else {
      if (currentPath === "/login" || currentPath === "/sign-up") {
        navigate("/dashboard");
      } else {
        navigate(currentPath);
      }
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <CircularProgress />;
  }

  return <>{children}</>;
};

export default ProtectedLayout;

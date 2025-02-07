import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const PLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("userLibraryToken");

    if (!token) {
      navigate("/sign-up");
      setLoading(false);
    } else {
      navigate("/dashboard");

      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <CircularProgress />;
  }

  return <>{children}</>;
};

export default PLayout;

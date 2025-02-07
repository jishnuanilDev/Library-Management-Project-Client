import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
const LoadingOverlay = ({ loading }: { loading: boolean }) => {
  return (
    <Backdrop
      sx={{ 
        color: "#fff", 
        zIndex: (theme) => theme.zIndex.modal + 1 
      }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;

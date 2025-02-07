import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      // Preview the image
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
      {/* Image Preview */}
      {image && (
        <Box
          component="img"
          src={image}
          alt="Preview"
          sx={{ width: 150, height: 150, objectFit: "cover", borderRadius: 2, border: "1px solid #ccc" }}
        />
      )}

      {/* Upload Button */}
      <Button variant="contained" component="label">
        Upload Image
        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
      </Button>

      {/* Display File Name */}
      {file && <Typography variant="body2">{file.name}</Typography>}
    </Box>
  );
};

export default ImageUploader;

import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value); 
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      value={query}
      onChange={handleSearch}
      fullWidth
      sx={{
        maxWidth: 400,
        backgroundColor: "#f1f3f4",
        borderRadius: 3,
        mt: 3, // Adds margin on top
        mx: "auto", // Centers it horizontally
        display: "block", // Ensures it behaves like a block element
        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
          "& fieldset": {
            borderColor: "transparent",
          },
          "&:hover fieldset": {
            borderColor: "#bbb",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#007bff",
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="disabled" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;

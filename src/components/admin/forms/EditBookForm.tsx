import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import ImageUploader from "../../ImageComponent";
import axiosInstance from "../../../configs/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { editBook } from "../../../redux/slices/bookSlice";


interface BookData {
    _id:string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: string;
  availableCopies: number;
  imageUrl:string;
}

interface AddBookFormProps {
  handleClose: () => void;
  book:BookData;
}
interface Errors {
  title?: string;
  author?: string;
  isbn?: string;
  publishedYear?: string;
  availableCopies?: string;
}

const EditBookForm: React.FC<AddBookFormProps> = ({ handleClose, book }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState(book.imageUrl);
  const [bookData, setBookData] = useState<BookData>({
    _id:book._id,
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    publishedYear: book.publishedYear,
    availableCopies: book.availableCopies,
    imageUrl:''
  });

  const [errors, setErrors] = useState<Errors>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

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

  const validate = (): boolean => {
    let tempErrors: Errors = {};
    if (!bookData.title.trim()) tempErrors.title = "Title is required";
    if (!bookData.author.trim()) tempErrors.author = "Author is required";
    if (!bookData.isbn.trim()) tempErrors.isbn = "ISBN is required";
    if (!bookData.publishedYear)
      tempErrors.publishedYear = "Published Year is required";
    if (!bookData.availableCopies)
      tempErrors.availableCopies = "Available Copies is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;


    try {
      const formData = new FormData();
      formData.append("bookId",bookData._id);
      formData.append("title", bookData.title);
      formData.append("author", bookData.author);
      formData.append("isbn", bookData.isbn);
      formData.append("publishedYear", bookData.publishedYear);
      formData.append("availableCopies", bookData.availableCopies.toString());
      if(file){
        formData.append("image", file);
      }
   

      const response = await axiosInstance.put("/admin/edit-book", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        toast.success(response.data.message);
        dispatch(editBook(response.data.book));
        handleClose();
      }

      setBookData({
        _id:'',
        title: "",
        author: "",
        isbn: "",
        publishedYear: "",
        availableCopies: 1,
        imageUrl:''
      });
      setImage(null);
      setFile(null);
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        maxWidth: 500,
        margin: "auto",
        borderRadius: "16px", // Adjust the value to make the corners more rounded
      }}
    >
      <ToastContainer />
      <Typography variant="h5" gutterBottom>
        Edit Book
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            sx={{
              borderRadius: 2, // Adjust the value to make the corners more or less rounded
              "& .MuiOutlinedInput-root": {
                borderRadius: 3, // Ensure the input field itself has rounded corners
              },
            }}
            label="Title"
            name="title"
            fullWidth
            value={bookData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            sx={{
              borderRadius: 2, // Adjust the value to make the corners more or less rounded
              "& .MuiOutlinedInput-root": {
                borderRadius: 3, // Ensure the input field itself has rounded corners
              },
            }}
            label="Author"
            name="author"
            fullWidth
            value={bookData.author}
            onChange={handleChange}
            error={!!errors.author}
            helperText={errors.author}
          />
          <TextField
            sx={{
              borderRadius: 2, // Adjust the value to make the corners more or less rounded
              "& .MuiOutlinedInput-root": {
                borderRadius: 3, // Ensure the input field itself has rounded corners
              },
            }}
            label="ISBN"
            name="isbn"
            fullWidth
            value={bookData.isbn}
            onChange={handleChange}
            error={!!errors.isbn}
            helperText={errors.isbn}
          />
          <TextField
            sx={{
              borderRadius: 2, // Adjust the value to make the corners more or less rounded
              "& .MuiOutlinedInput-root": {
                borderRadius: 3, // Ensure the input field itself has rounded corners
              },
            }}
            label="Published Year"
            name="publishedYear"
            type="number"
            fullWidth
            value={bookData.publishedYear}
            onChange={handleChange}
            error={!!errors.publishedYear}
            helperText={errors.publishedYear}
          />
          <TextField
            sx={{
              borderRadius: 2, // Adjust the value to make the corners more or less rounded
              "& .MuiOutlinedInput-root": {
                borderRadius: 3, // Ensure the input field itself has rounded corners
              },
            }}
            label="Available Copies"
            name="availableCopies"
            type="number"
            fullWidth
            value={bookData.availableCopies}
            onChange={handleChange}
            error={!!errors.availableCopies}
            helperText={errors.availableCopies}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            {/* Image Preview */}
            {(image || img) && (
              <Box
                component="img"
                src={image || img}
                alt="Preview"
                sx={{
                  width: 150,
                  height: 150,
                  objectFit: "cover",
                  borderRadius: 2,
                  border: "1px solid #ccc",
                }}
              />
            )}

            {/* Upload Button */}
            <Button variant="contained" component="label">
              Change Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {/* Display File Name */}
            {file && <Typography variant="body2">{file.name}</Typography>}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" color="primary" type="submit">
          Submit
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default EditBookForm;

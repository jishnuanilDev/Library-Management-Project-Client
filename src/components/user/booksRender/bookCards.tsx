import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookListCard from "../cards/bookListCard";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../configs/axiosInstance";
import { setBooks } from "../../../redux/slices/bookSlice";
import { setBorrowedBooks } from "../../../redux/slices/bookBorrowSlice";
function BookCards() {
  const dispatch = useDispatch();
  const books = useSelector((state: any) => state.book.books);
const [update,setUpdate] = useState(false);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get("/admin/fetch-books");
        dispatch(setBooks(response.data.books));
        dispatch(setBorrowedBooks(response.data.borrowedBooks));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [dispatch,update]);
  return (
    <>
    
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('https://medisepkerala.com/img/background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: 3, // Adds some padding so content isn't too close to the edges
      }}
    >
      <Box
    sx={{
        ml: 0,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 2,
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional for readability
        p: 3,
        borderRadius: 2,
        backgroundImage: "url('https://img.freepik.com/premium-photo/color-background-presentations-decorative-design-layout-template-insert-picture-copy-space_7954-5964.jpg?semt=ais_hybrid')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      >
        {books?.map((book, index) => (
            <>
              <BookListCard key={index} setUpdate={setUpdate} book={book} />
      
            </>
        
          
        ))}
      </Box>
    </Box>
    </>
  );
}

export default BookCards;

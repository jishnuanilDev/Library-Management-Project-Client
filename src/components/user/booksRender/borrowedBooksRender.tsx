import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookListCard from "../cards/bookListCard";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../configs/axiosInstance";
import { setBooks } from "../../../redux/slices/bookSlice";
import BorrowedHistory from "../cards/borrowedHistoryCard";
import { setBorrowedBooks } from "../../../redux/slices/bookBorrowSlice";
import BorrowedBook from "../cards/borrowedBooksCard";
function BorrowedBooksRender() {
  const dispatch = useDispatch();
  const borrowedBooks = useSelector(
    (state: any) => state.borrowedBook.borrowedBooks
  );
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("userLibraryToken");
        const response = await axiosInstance.get("/borrowed-books", {
          headers: {
            Authorization: token,
          },
        });
        dispatch(setBorrowedBooks(response.data.borrowedBooks));
      } catch (error) {
        console.error("Error fetching borrow history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [dispatch, update]);
  return (
    <>
      {borrowedBooks.length > 0 ? (
        borrowedBooks.map((book, index) => (
          <BorrowedBook setUpdate={setUpdate} key={index} book={book} />
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
            textAlign: "center",
            color: "gray",
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="primary">
            No Borrowed Books
          </Typography>
          <Typography variant="body1">
            You haven't borrowed any books yet. Start exploring now!
          </Typography>
        </Box>
      )}
    </>
  );
}

export default BorrowedBooksRender;

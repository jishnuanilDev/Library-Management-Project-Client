import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookListCard from "../cards/bookListCard";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../configs/axiosInstance";
import { setBooks } from "../../../redux/slices/bookSlice";
import BorrowedHistory from "../cards/borrowedHistoryCard";
function BorrowedCards() {

  const dispatch = useDispatch();
  const books = useSelector((state: any) => state.book.books);
  const [update, setUpdate] = useState(false);
  const [borrowHistory, setBorrowHistory] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchHistory = async () => {
          try {
            const token = localStorage.getItem('userLibraryToken')
            const response = await axiosInstance.get("/borrow-history", {
              headers: {
                Authorization: token,
              },
            });
            setBorrowHistory(response.data.borrowHistory);
          } catch (error) {
            console.error("Error fetching borrow history:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchHistory();
      }, []);
  return (
    <>
    {
        borrowHistory.map((book,index)=>(
<BorrowedHistory key={index} book={book} />
        ))
    }
      
    </>
  );
}

export default BorrowedCards;

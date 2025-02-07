import UserDashboardNav from "../components/user/layouts/DashboardNavbar";
import BookListCard from "../components/user/cards/bookListCard";
import React from "react";
import ProtectedLayout from "../utils/protectedRoute";
import { Box, Typography } from "@mui/material";
import BookCards from "../components/user/booksRender/bookCards";
import BorrowedBooksRender from "../components/user/booksRender/borrowedBooksRender";
function BorrowedBooksPage() {
  return ( 
    <>
      <ProtectedLayout>
        <nav>
          <UserDashboardNav />
        </nav>
        <Typography
          variant="h4"
          sx={{
            mt:2,
            fontWeight: "bold",
            textAlign: "center",
            color: "rgba(0, 0, 0, 0.7)", 
          }}
        >
        Borrowed Books 
        </Typography>
        <BorrowedBooksRender />
      </ProtectedLayout>
    </>
  );
}

export default BorrowedBooksPage;

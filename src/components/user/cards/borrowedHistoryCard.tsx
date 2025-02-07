import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import axiosInstance from "../../../configs/axiosInstance";
import { Book } from "@mui/icons-material";
import { Chip } from "@mui/material";

export default function BorrowedHistory({ book }) {
  const handleReturn = () => {
    const bookId = book.book._id;
    const token = localStorage.getItem("userLibraryToken");
    axiosInstance.put(`/return/${bookId}`, {
      headers: {
        Authorization: token,
      },
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
      }}
    >
      <Card
        orientation="horizontal"
        sx={{
          width: "100%", // or set a specific fixed width, like '400px', if you need it
          maxWidth: "100%", // Ensure it does not exceed the container width
          flexWrap: "wrap",
          [`& > *`]: {
            minWidth: "auto", // Remove the resizable width logic
          },
          overflow: "hidden", // Prevents overflow, just in case
        }}
      >
        <AspectRatio
          flex
          ratio="1"
          maxHeight={182}
          sx={{
            minWidth: 182,
            overflow: "hidden", // To ensure the image doesn't overflow the card's boundaries
          }}
        >
          <img
            src={book.bookId.imageUrl}
            srcSet={book.bookId.imageUrl}
            loading="lazy"
            alt="Image"
            style={{
              width: "100%", // Ensures the image takes full width of its container
              height: "100%", // Ensures the image takes full height of its container
              objectFit: "cover", // Ensures the image covers the aspect ratio box without distortion
            }}
          />
        </AspectRatio>

        <CardContent>
          <Typography sx={{ fontSize: "xl", fontWeight: "lg" }}>
            {book.bookId.title}
          </Typography>
          <Typography
            level="body-sm"
            textColor="text.tertiary"
            sx={{ fontWeight: "lg" }}
          >
            Author: {book.bookId.author}
          </Typography>
          <Sheet
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",
              gap: 2,
              "& > div": { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                ISBN: {book.bookId.isbn}
              </Typography>
              <Typography sx={{ fontWeight: "lg" }}></Typography>
            </div>
          </Sheet>
          <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
            {/* <Button variant="outlined" color="neutral">
              Chat
            </Button> */}
            <Typography level="body-xs" sx={{ fontWeight: "lg", mt: 1.5 }}>
            Borrowed Date: {new Date(book.borrowedDate).toLocaleDateString("en-GB")}

            </Typography>

            <Typography level="body-xs" sx={{ fontWeight: "lg", mt: 1.5 }}>
              Returned Date: {new Date(book.returnedDate).toLocaleDateString("en-GB")}
            </Typography>
            <Box>
              {book.returned ? (
                <Chip label="Returned" color="success" />
              ) : (
                <Typography
                  sx={{
                    fontWeight: "bold",
                    padding: "8px",
                    border: "1px solid",
                    borderColor: "warning.main",
                    borderRadius: "4px",
                    display: "inline-block",
                  }}
                >
                  Borrowed Book
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

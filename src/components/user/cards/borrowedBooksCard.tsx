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
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from "../../loader";
export default function BorrowedBook({setUpdate, book }) {
    const [loading,setLoading] = React.useState(false);
  const handleReturn = () => {
    const bookId = book.bookId._id
setLoading(true);
    const token = localStorage.getItem("userLibraryToken");
    axiosInstance.put(
        `/return/${bookId}`,
        {},
        {
          headers: {
            Authorization:token, 
          },
        }
      )
        .then((response) => {
 toast.success('Book returned successfully');
 setLoading(false);
        })
        .catch((error) => {
            toast.error('Book returned failed,please try again later')
        });
    setUpdate(prev=>!prev);
    toast.success('Book returned successfully')
  };

  return (
    <>
    <LoadingOverlay loading={loading} />
        <Box
          sx={{
            width: "100%",
            position: "relative",
            overflow: { xs: "auto", sm: "initial" },
          }}
        >
                <ToastContainer />
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
                <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                  Borrowed Date: {new Date(book.borrowedDate).toLocaleDateString()}
                </Typography>
                <Box>
                  {book.returned ? (
                    <Chip label="Returned" color="success" />
                  ) : (
                    <Button color="danger" onClick={handleReturn}>
                      Return Book
                    </Button>
                  )}
    
                  {book.returned && (
                    <Typography>
                      Returned Date:
                      {new Date(book.returnedDate).toLocaleDateString()}
                    </Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
    </>
  );
}

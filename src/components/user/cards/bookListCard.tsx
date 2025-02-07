import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from '../../../configs/axiosInstance';
import { borrowBook } from '../../../redux/slices/bookSlice';
export default function BookListCard({setUpdate,book}) {
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.user.userId);
  const borrowedBooks = useSelector((state:any) => state.borrowedBook.borrowedBooks);
const userLoc = localStorage.getItem('user');
let hasBorrowed;
if(userLoc){
  const parsedUser = JSON.parse(userLoc);
  hasBorrowed = borrowedBooks.some(
    (b) => b.bookId === book._id && b.userId === parsedUser.userId && !b.returned
  );
}


  const handleBorrow = async (bookId: string) => {
    try {
  
      const token = localStorage.getItem('userLibraryToken');

      const response = await axiosInstance.post(
        `/borrow/${bookId}`, 
        {},
        {
          headers: {
            Authorization: token, 
          }
        }
      );
      setUpdate(prev=>!prev);
      dispatch(borrowBook(response.data.book));
   
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  };

  
  return (
    
    <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg",ml:1.5 }}>

      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img
            src={book.imageUrl}
            srcSet={book.imageUrl}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="body-xs">ISBN:{book.isbn}</Typography>
        <Link
          href="#product-card"
          color="neutral"
          textColor="text.primary"
          overlay
          endDecorator={<ArrowOutwardIcon />}
          sx={{ fontWeight: 'md' }}
        >
       {book.author}
        </Link>

        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: 'xl' }}
          endDecorator={
            <Chip component="span" size="sm" variant="soft" color="success">
            {book.publishedYear} Edition
            </Chip>
          }
        >
     {book.title}
        </Typography>
        <Typography level="body-sm">
          (Only <b>{book.availableCopies}</b> left in stock!)
        </Typography>
      </CardContent>
      <CardOverflow>
        
        <Button   disabled={book.availableCopies < 1 || hasBorrowed} onClick={()=>handleBorrow(book._id)} variant="solid" color="success" size="lg">
          
        {hasBorrowed ? "You Already Borrowed" : book.availableCopies < 1 ? "Not Available" : "Borrow"}
        </Button>
 
      </CardOverflow>
    </Card>
  );
}

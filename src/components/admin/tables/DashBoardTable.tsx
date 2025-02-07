import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AddBookModal from "../modals/addBook";
import { Box, Button } from "@mui/material";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { setBooks,deleteBook } from "../../../redux/slices/bookSlice";
import axiosInstance from "../../../configs/axiosInstance";
import { setSearchQuery } from "../../../redux/slices/searchSlice";
import EditBookModal from "../modals/editBook";
import { ToastContainer, toast } from 'react-toastify';
   
import Swal from 'sweetalert2'
interface Column {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

export default function AdminDataTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const books = useSelector((state: any) => state.book.books);

  const searchQuery = useSelector((state: any) => state.search.query);

  const filteredBooks = searchQuery
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books; // If no search query, show all books

  React.useEffect(() => {
    if (books?.length === 0) {
      const fetchBooks = async () => {
        try {
          const response = await axiosInstance.get("/admin/fetch-books");
          console.log(response.data.books);
          dispatch(setBooks(response.data.books));
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };
      fetchBooks();
    }
  }, [books?.length, dispatch]);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  

  const handleDelete = (bookId)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.delete(`/admin/delete-book/${bookId}`);
        
          if (response.data.success) {
            dispatch(deleteBook(bookId));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          } else {
            toast.error("Something went wrong");
          }
        } catch (err) {
          console.error("Error deleting book:", err);
          toast.error("Failed to delete book");
        }
       
    
      }
    });
  }

  return (
    <>
      <AddBookModal />
      <ToastContainer />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontStyle: "italic" }}>Image</TableCell>

                <TableCell sx={{ fontWeight: "bold", fontStyle: "italic" }}>Title</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontStyle: "italic" }}>Author</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontStyle: "italic" }}>ISBN</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontStyle: "italic" }}>Published Year</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontStyle: "italic" }}>Available Copies</TableCell>
                {/* Column header for the action */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks?.map((book, index) => (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell>
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 5,
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.publishedYear}</TableCell>
                  <TableCell>{book.availableCopies}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <EditBookModal book={book} />
                      <Button onClick={()=>handleDelete(book._id)} variant="outlined" color="error">
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}


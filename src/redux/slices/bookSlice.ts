import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Book {
    _id: string;
    title: string;
    author: string;
    isbn: string;
    publishedYear: string;
    availableCopies: number;
    imageUrl?: string;
  }

interface BookState {
  books: Array<{
    title: string;
    author: string;
    ISBN: string;
    publishedYear: number;
    availableCopies: number;
  }>;
}
interface BooksState {
    books: Book[];
  }
  
  const initialState: BooksState = {
    books: [],
  }

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks: (
      state,
      action: PayloadAction<Book[]>
        
      
    ) => {
      state.books = action.payload;
    },
    addBook: (state, action: PayloadAction<Book>) => {
        state.books.unshift(action.payload);
      },
      editBook: (state, action: PayloadAction<Book>) => {
        const index = state.books.findIndex((book) => book._id === action.payload._id);
        if (index !== -1) {
          state.books[index] = action.payload; 
        }
      },
      deleteBook: (state, action: PayloadAction<string>) => {
        state.books = state.books.filter((book) => book._id !== action.payload);
      },

      borrowBook: (state, action: PayloadAction<Book>) => {
        const index = state.books.findIndex((book) => book._id === action.payload._id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      },
      returnBook: (state, action: PayloadAction<Book>) => {
        const index = state.books.findIndex((book) => book._id === action.payload._id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      },
  },
});

export const { setBooks,addBook,editBook,deleteBook ,borrowBook, returnBook } = bookSlice.actions;
export default bookSlice.reducer;

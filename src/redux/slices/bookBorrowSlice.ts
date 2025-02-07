import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BorrowedBook {
  bookId: string;
  userId: string;
  returned: boolean;
}

interface BorrowedBooksState {
  borrowedBooks: BorrowedBook[];
}

const initialState: BorrowedBooksState = {
  borrowedBooks: [],
};

const borrowedBookSlice = createSlice({
  name: "borrowedBook",
  initialState,
  reducers: {
    setBorrowedBooks: (state, action: PayloadAction<BorrowedBook[]>) => {
      state.borrowedBooks = action.payload;
    },
  },
});

export const { setBorrowedBooks } = borrowedBookSlice.actions;
export default borrowedBookSlice.reducer;

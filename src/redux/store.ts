import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; 
import bookReducer from './slices/bookSlice'
import searchReducer from './slices/searchSlice'
import borrowReducer from './slices/bookBorrowSlice'
const store = configureStore({
  reducer: {
    user: userReducer, 
    book:bookReducer,
    search:searchReducer,
    borrowedBook:borrowReducer,
  },
});

export default store;

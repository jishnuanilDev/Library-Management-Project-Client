import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  users: Array<{ _id: string; username: string; email: string }>;
  userId: string | null; 
  query:string|null,
}

const initialState: UserState = {
  users: [],
  userId: null,
  query: "",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<Array<{ _id: string; username: string; email: string }>>) => {
      state.users = action.payload;
    },
    searchUser: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;  // set user ID
    },
    clearUserId: (state) => {
      state.userId = null;  // clear user ID
    },
  },
});

export const { setUsers,setUserId, clearUserId,searchUser } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { deleteUser } from './deleteUser';
import { editUser } from './editUser';
import { login } from './login';
import { logout } from './logout';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  extraReducers: {
    [login.fulfilled]: (_state, action) => ({
      ...(action.payload?.user ?? {}),
      authorized: action.payload?.success,
    }),
    [logout.fulfilled]: (_state, _action) => ({
      authorized: false,
    }),
    [deleteUser.fulfilled]: (_state, _action) => ({
      authorized: false,
    }),
    [editUser.fulfilled]: (state, action) => ({ ...state, ...action.payload }),
  },
});

export { login, logout, editUser, deleteUser };

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { login } from './login';
import { logout } from './logout';
import { edit } from './edit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  extraReducers: {
    [login.fulfilled]: (_state, action) => ({
      ...action.payload.user,
      authorized: action.payload.success,
    }),
    [logout.fulfilled]: (_state, _action) => ({
      authorized: false,
    }),
    [edit.fulfilled]: (state, action) => ({ ...state, ...action.payload }),
  },
});

export { login, logout, edit };

export default userSlice.reducer;

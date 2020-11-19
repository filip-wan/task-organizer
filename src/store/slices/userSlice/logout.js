import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api';

export const logout = createAsyncThunk('user/logout', async () =>
  api('GET', `logout`)
);

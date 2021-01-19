import api from '../../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteUser = createAsyncThunk('user/delete', async () =>
  api('DELETE', `user`)
);

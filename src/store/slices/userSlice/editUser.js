import api from '../../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const editUser = createAsyncThunk('user/edit', async ({ email }) =>
  api('PUT', `user`, ({ email }) => ({ email }), JSON.stringify({ email }))
);

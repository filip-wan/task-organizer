import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api';

export const edit = createAsyncThunk('user/edit', async ({ type }) =>
  api('GET', `auth/${type}`, ({ data }) => data)
);

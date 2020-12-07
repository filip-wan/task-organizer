import api from '../../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async ({ id }) =>
    api('DELETE', `categories/` + id, ({ _id: id, ...data }) => ({
      ...data,
      id,
    }))
);

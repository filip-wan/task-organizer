import api from '../../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postCategory = createAsyncThunk(
  'categories/postCategory',
  async ({ type, ...body }) =>
    api(
      'POST',
      `categories`,
      ({ _id: id, ...data }) => ({ ...data, id }),
      JSON.stringify(body)
    )
);

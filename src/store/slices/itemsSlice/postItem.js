import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api';

export const postItem = createAsyncThunk(
  'items/postItem',
  async ({ type, ...body }) =>
    api(
      'POST',
      `${type}s`,
      ({ _id: id, ...data }) => ({ ...data, id, type }),
      JSON.stringify(body)
    )
);

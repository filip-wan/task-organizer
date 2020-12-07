import api from '../../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const putCategory = createAsyncThunk(
  'categories/putCategory',
  async ({ id, type, ...body }) =>
    api(
      'PUT',
      'categories/' + id,
      ({ _id: id, ...data }) => ({ ...data, id }),
      JSON.stringify(body)
    )
);

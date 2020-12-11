import api from '../../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postNotification = createAsyncThunk(
  'items/postNotification',
  async ({ type, deadline, ...body }) =>
    api(
      'POST',
      `notification`,
      ({ _id: id, ...data }) => ({
        ...data,
        id,
        type,
        deadline,
      }),
      JSON.stringify(body)
    )
);

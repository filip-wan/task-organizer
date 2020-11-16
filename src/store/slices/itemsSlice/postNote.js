import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api';

export const postNote = createAsyncThunk(
  'items/postNote',
  async (body) =>
    await api(
      'POST',
      'notes',
      (data) => ({ ...data, id: data._id }),
      JSON.stringify(body)
    )
);

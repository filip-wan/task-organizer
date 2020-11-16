import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api';

export const fetchAllNotes = createAsyncThunk(
  'items/fetchAll',
  async () =>
    await api('GET', 'notes', (data) => data.map((i) => ({ ...i, id: i._id })))
);

import api from '../../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => [
    ...(await api('GET', 'categories', (data) =>
      data.map(({ _id: id, ...data }) => ({ ...data, id, checked: false }))
    )),
  ]
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api';

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async ({ id, type }) =>
    api('DELETE', `${type}s/` + id, ({ _id: id, ...data }) => ({ data, id }))
);

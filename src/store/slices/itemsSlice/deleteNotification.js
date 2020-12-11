import api from '../../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteNotification = createAsyncThunk(
  'items/deleteNotification',
  async ({ id, type }) =>
    api('DELETE', `notification/` + id, ({ data }) => ({
      ...data,
      id,
      type,
    }))
);

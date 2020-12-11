import api from '../../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const putItem = createAsyncThunk(
  'items/putItem',
  async ({ id, type, ...body }) =>
    api(
      'PUT',
      type + 's/' + id,
      ({ _id: id, ...data }) => ({ ...data, id, type }),
      JSON.stringify(body)
    )
);

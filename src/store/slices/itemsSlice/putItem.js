import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api';

export const putItem = createAsyncThunk(
  'items/putItem',
  async ({ id, type, ...body }) =>
    api(
      'PUT',
      type + 's/' + id,
      ({ _id: id, ...data }) => ({ data, id, type }),
      JSON.stringify(body)
    )
);

import { createAsyncThunk } from '@reduxjs/toolkit';

export const putNote = createAsyncThunk(
  'items/putNote',
  async ({ id, ...body }) => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + 'notes/' + id,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return { ...data, id: data._id };
      })
      .catch((err) => console.error(err));
    console.log('PUT', process.env.REACT_APP_API_URL + 'notes' + id, response);
    return response;
  }
);

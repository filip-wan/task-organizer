import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteNote = createAsyncThunk(
  'items/deleteNote',
  async ({ id }) => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + 'notes/' + id,
      {
        method: 'DELETE',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return { ...data, id: data._id };
      })
      .catch((err) => console.error(err));
    console.log(
      'DELETE',
      process.env.REACT_APP_API_URL + 'notes' + id,
      response
    );
    return response;
  }
);

import { createSlice } from '@reduxjs/toolkit';
import { deleteNote } from './deleteNote';
import { fetchAllNotes } from './fetchAllNotes';
import { postNote } from './postNote';
import { putNote } from './putNote';
export { deleteNote, fetchAllNotes, postNote, putNote };

export const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  extraReducers: {
    [deleteNote.fulfilled]: (state, action) =>
      state.filter((item) => item.id !== action.payload._id),
    [fetchAllNotes.fulfilled]: (state, action) => action.payload,
    [postNote.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [putNote.fulfilled]: (state, action) =>
      state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      ),
  },
});

export default itemsSlice.reducer;

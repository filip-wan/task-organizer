import { createSlice } from '@reduxjs/toolkit';
import { deleteItem } from './deleteItem';
import { fetchAllItems } from './fetchAllItems';
import { postItem } from './postItem';
import { putItem } from './putItem';
export { deleteItem, fetchAllItems, postItem, putItem };

export const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  extraReducers: {
    [deleteItem.fulfilled]: (state, action) =>
      state.filter((item) => item.id !== action.payload.id),
    [fetchAllItems.fulfilled]: (state, action) => action.payload,
    [postItem.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [putItem.fulfilled]: (state, action) => {
      console.log(action.payload);
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },
  },
});

export default itemsSlice.reducer;

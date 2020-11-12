const { createSlice } = require('@reduxjs/toolkit');

export const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    loadItems: (state, action) => {
      // TODO: implement loading items
      state = [];
    },
    pushItem: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) =>
      state.filter((item) => item.id !== action.payload.id),
    editItem: (state, action) =>
      state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      ),
  },
});

export const { loadItems, pushItem, removeItem, editItem } = itemsSlice.actions;

export default itemsSlice.reducer;

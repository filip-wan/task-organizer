const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchAllNotes = createAsyncThunk('items/fetchAll', async () => {
  const response = await fetch(process.env.REACT_APP_API_URL + 'notes')
    .then((response) => response.json())
    .then((data) => {
      return data.map((i) => ({ ...i, id: i._id }));
    });
  console.log(process.env, process.env.REACT_APP_API_URL + 'notes', response);
  return response;
});

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
  extraReducers: {
    [fetchAllNotes.fulfilled]: (state, action) => {
      // Add user to the state array
      console.log(action.payload);
      state.push(...action.payload);
    },
  },
});

export const { loadItems, pushItem, removeItem, editItem } = itemsSlice.actions;

export default itemsSlice.reducer;

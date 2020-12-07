import { createSlice } from '@reduxjs/toolkit';
import { deleteCategory } from './deleteCategory';
import { fetchCategories } from './fetchCategories';
import { postCategory } from './postCategory';
import { putCategory } from './putCategory';

export { deleteCategory, fetchCategories, postCategory, putCategory };

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    toggleCategory: (state, action) => {
      const categoryIndex = state.findIndex((c) => c.id === action.payload);
      state[categoryIndex] !== undefined &&
        (state[categoryIndex].toggled = !state[categoryIndex].toggled);
    },
  },
  extraReducers: {
    [deleteCategory.fulfilled]: (state, action) =>
      state.filter((Category) => Category.id !== action.payload.id),
    [fetchCategories.fulfilled]: (_state, action) => action.payload,
    [postCategory.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [putCategory.fulfilled]: (state, action) =>
      state.map((Category) =>
        Category.id === action.payload.id
          ? { ...Category, ...action.payload }
          : Category
      ),
  },
});

const { toggleCategory } = categoriesSlice.actions;
export { toggleCategory };

export default categoriesSlice.reducer;

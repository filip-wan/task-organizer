import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import categories from './slices/categoriesSlice';
import items from './slices/itemsSlice';
import { useSelector } from 'react-redux';
import user from './slices/userSlice';

export const selectSlice = (slice) => () =>
  useSelector((state) => state[slice.name]);

const store = configureStore({
  reducer: combineReducers({ user, items, categories }),
  middleware: getDefaultMiddleware(),
});

export default store;

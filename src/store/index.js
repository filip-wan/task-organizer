import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import user from './slices/userSlice';
import items from './slices/itemsSlice/index.js';

export const selectSlice = (slice) => () =>
  useSelector((state) => state[slice.name]);

const store = configureStore({
  reducer: combineReducers({ user, items }),
  middleware: getDefaultMiddleware(),
});

export default store;

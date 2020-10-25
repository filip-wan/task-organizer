import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import user from './slices/userSlice';

export const selectSlice = (slice) => () =>
  useSelector((state) => state[slice.name]);

const store = configureStore({
  reducer: combineReducers({ user }),
  middleware: getDefaultMiddleware(),
});

export default store;

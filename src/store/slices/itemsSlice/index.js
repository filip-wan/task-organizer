import { createSlice } from '@reduxjs/toolkit';
import { deleteItem } from './deleteItem';
import { deleteNotification } from './deleteNotification';
import { fetchAllItems } from './fetchAllItems';
import { postItem } from './postItem';
import { postNotification } from './postNotification';
import { putItem } from './putItem';

export {
  deleteItem,
  deleteNotification,
  fetchAllItems,
  postItem,
  postNotification,
  putItem,
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  extraReducers: {
    [deleteItem.fulfilled]: (state, action) =>
      state.filter((item) => item.id !== action.payload.id),
    [deleteNotification.fulfilled]: (state, action) =>
      action.payload.type === 'event'
        ? state.map((item) =>
            item.type === 'timeTable'
              ? {
                  ...item,
                  events: item.events.map((event) =>
                    event.notification?.id === action.payload.id
                      ? { ...event, notification: undefined }
                      : event
                  ),
                }
              : item
          )
        : state.map((item) =>
            item.notification?.id === action.payload.id
              ? {
                  ...item,
                  notification: undefined,
                  deadline: undefined,
                }
              : item
          ),
    [fetchAllItems.fulfilled]: (_state, action) => action.payload,
    [postItem.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [postNotification.fulfilled]: (state, action) =>
      action.payload.type === 'event'
        ? state.map((item) =>
            item.type === 'timeTable'
              ? {
                  ...item,
                  events: item.events.map((event) =>
                    event._id === action.payload.item
                      ? { ...event, notification: action.payload }
                      : event
                  ),
                }
              : item
          )
        : state.map((item) =>
            item.id === action.payload.item
              ? {
                  ...item,
                  notification: action.payload,
                  deadline: action.payload.deadline,
                }
              : item
          ),
    [putItem.fulfilled]: (state, action) =>
      state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      ),
  },
});

export default itemsSlice.reducer;

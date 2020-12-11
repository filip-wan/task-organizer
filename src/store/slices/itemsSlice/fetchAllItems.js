import api from '../../../api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllItems = createAsyncThunk('items/fetchAll', async () => {
  const notifications = await api('GET', 'notifications', (data) =>
    data.map(({ _id: id, ...data }) => ({
      ...data,
      id,
      type: data.recurring ? 'event' : 'item',
    }))
  );

  return [
    ...(await api('GET', 'notes', (data) =>
      data.map(({ _id: id, ...data }) => ({ ...data, id, type: 'note' }))
    )),
    ...(await api('GET', 'todos', (data) =>
      data.map(({ _id: id, ...data }) => ({ ...data, id, type: 'todo' }))
    )),
    ...(await api('GET', 'timetables', (data) =>
      data.map(({ _id: id, ...data }) => ({ ...data, id, type: 'timeTable' }))
    )),
  ].map((item) => {
    const newItem = {
      ...item,
      notification: notifications.find((n) => n.item === item.id),
    };
    if (newItem.type === 'timeTable') {
      newItem.events = newItem.events.map((event) => ({
        ...event,
        notification: notifications.find((n) => n.item === event._id),
      }));
    }
    return newItem;
  });
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api';

export const fetchAllItems = createAsyncThunk('items/fetchAll', async () => [
  ...(await api('GET', 'notes', (data) =>
    data.map(({ _id: id, ...data }) => ({ ...data, id, type: 'note' }))
  )),
  ...(await api('GET', 'todos', (data) =>
    data.map(({ _id: id, ...data }) => ({ ...data, id, type: 'todo' }))
  )),
  ...(await api('GET', 'timetables', (data) =>
    data.map(({ _id: id, ...data }) => ({ ...data, id, type: 'timeTable' }))
  )),
]);

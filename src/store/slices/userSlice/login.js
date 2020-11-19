import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api';

export const login = createAsyncThunk('user/login', async () =>
  api('GET', `auth`)
);

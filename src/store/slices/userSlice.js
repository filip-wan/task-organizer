const { createSlice } = require('@reduxjs/toolkit');

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'none',
  },
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { changeName } = userSlice.actions;

// export const selectUser = useSelector((state) => state[userSlice.name]);

export default userSlice.reducer;

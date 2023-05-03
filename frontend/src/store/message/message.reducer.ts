import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    message: '',
  },
  reducers: {
    SET_MESSAGE: (state, action) => {
      state.message = action.payload;
    },
    CLEAR_MESSAGE: (state) => {
      state.message = '';
    },
  },
});

export const { SET_MESSAGE, CLEAR_MESSAGE } = messageSlice.actions;
export const messageReducer = messageSlice.reducer;

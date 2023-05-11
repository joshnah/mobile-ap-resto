import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    message: '',
    status: '',
    closable: false,
    autoClose: false,
  },
  reducers: {
    SET_MESSAGE: (state, action) => {
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.closable = action.payload.closable ?? false;
      state.autoClose = action.payload.autoClose ?? false;
    },
    CLEAR_MESSAGE: (state) => {
      state.message = '';
    },
  },
});

export const { SET_MESSAGE, CLEAR_MESSAGE } = messageSlice.actions;
export const messageReducer = messageSlice.reducer;

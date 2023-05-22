import { createSlice } from '@reduxjs/toolkit';
const messageSlice = createSlice({
  name: 'message',
  initialState: {
    message: '',
    status: '',
    closable: false,
    autoClose: false,
    id: 0,
  },
  reducers: {
    SET_MESSAGE: (state, action) => {
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.closable = action.payload.closable ?? false;
      state.autoClose = action.payload.autoClose ?? false;
      state.id = state.id + 1;
    },
    CLEAR_MESSAGE: (state) => {
      state.message = '';
    },
    CLEAR_AUTOCLOSE_MESSAGE: (state, action) => {
      if (action.payload.id === state.id - 1) {
        state.message = '';
      }
    },
  },
});

export const { SET_MESSAGE, CLEAR_MESSAGE, CLEAR_AUTOCLOSE_MESSAGE } =
  messageSlice.actions;
export const messageReducer = messageSlice.reducer;

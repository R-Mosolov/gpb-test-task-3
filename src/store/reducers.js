import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: []
};

const slice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    createEvent(state = initialState, action) {
      const { taskTitle } = action.payload;
      state.tasks = taskTitle;
    },
  },
});

const globalReducer = {
  ['global']: slice.reducer,
};

export const {
  createEvent,
} = slice.actions;
export default globalReducer;

import { createSlice } from '@reduxjs/toolkit';
import { EVENTS } from './constants';
import { initialState } from './initialState';

const slice = createSlice({
  name: EVENTS,
  initialState: initialState,
  reducers: {
    createEvent(state = initialState, action) {
      const { event } = action.payload;
      
      state.all = [
        ...state.all,
        event
      ];
    },
    deleteEvent(state = initialState, action) {
      const { event } = action.payload;
      
      state.all = state.all.filter(({ id }) => id !== event.id);
    },
    updateEvent(state = initialState, action) {
      const { event } = action.payload;

      state.all = [
        ...state.all.filter(({ id }) => id !== event.id),
        event
      ];
    }
  },
});

const globalReducer = {
  [EVENTS]: slice.reducer,
};

export const {
  createEvent,
  deleteEvent,
  updateEvent,
} = slice.actions;
export default globalReducer;

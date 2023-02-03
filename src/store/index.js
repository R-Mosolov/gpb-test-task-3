import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import globalReducer from './reducers';

const reducers = {
  ...globalReducer,
};

const middleware = [];

const store = configureStore({
  reducer: combineReducers(reducers),
  middleware: middleware,
});

export default store;

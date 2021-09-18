import { configureStore } from '@reduxjs/toolkit';
import displayOkrReducer from '../features/OkrDisplay/displaySlice';

/**
 * This file we are using to define store.
 * We are using Redux for Demo purpose.
 * Feel free to add context based store if planning to use hooks self created stores
 */
export const store = configureStore({
  reducer: {
    okr: displayOkrReducer,
    //Define other reducers here hooks one and non hooks one
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

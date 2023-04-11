import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import modeReducer from './slices/modeSlice';
import calcReduser from './slices/calcBlocksSlice';

export const store = configureStore({
   reducer: {
      mode: modeReducer,
      calculator: calcReduser
   }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

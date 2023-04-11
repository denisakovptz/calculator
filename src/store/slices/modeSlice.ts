import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IMode } from '../storeTypes';

const initialState: IMode = {
   isConstructor: true
};

export const modeSlice = createSlice({
   name: 'mode',
   initialState,
   reducers: {
      setMode: (state, action: PayloadAction<boolean>) => {
         state.isConstructor = action.payload;
      }
   }
});

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;

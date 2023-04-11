import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ICalcBlocks } from '../storeTypes';

import { calcBlocks } from '../../utils/constatns';

const initialState: ICalcBlocks = {
   paletteBlocks: [...calcBlocks],
   canvasBlocks: []
};

export const calcBlocksSlice = createSlice({
   name: 'calcBlocks',
   initialState,
   reducers: {
      hidePaletteBlock(state, action: PayloadAction<number>) {
         state.paletteBlocks = state.paletteBlocks.map((block) => {
            if (block.id === action.payload) {
               return { ...block, isVisible: false };
            }
            return block;
         });
      },
      showPaletteBlock(state, action: PayloadAction<number>) {
         state.paletteBlocks = state.paletteBlocks.map((block) => {
            if (block.id === action.payload) {
               return { ...block, isVisible: true };
            }
            return block;
         });
      },
      addCanvasBlock(state, action: PayloadAction<number>) {
         const newBlock = state.paletteBlocks.filter((block) => block.id === action.payload);
         state.canvasBlocks = [
            ...state.canvasBlocks,
            ...newBlock.map((item) => {
               return {
                  ...item,
                  index: state.canvasBlocks.length
               };
            })
         ];
      },
      removeCanvasBlock(state, action: PayloadAction<number>) {
         state.canvasBlocks = state.canvasBlocks
            .filter((block) => block.id !== action.payload)
            .map((block, i) => {
               return {
                  ...block,
                  index: i
               };
            });
      },
      moveCanvasBlock(state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) {
         // const one = state.canvasBlocks.findIndex((block) => block.index === action.payload.dragIndex);
         // const two = state.canvasBlocks.findIndex((block) => block.index === action.payload.hoverIndex);
         // state.canvasBlocks[one].index = action.payload.hoverIndex;
         // state.canvasBlocks[two].index = action.payload.dragIndex;
         // state.canvasBlocks.sort((block1, block2) => block1.index - block2.index);

         const minIndex = action.payload.dragIndex < action.payload.hoverIndex ? action.payload.dragIndex : action.payload.hoverIndex;
         const maxIndex = action.payload.dragIndex > action.payload.hoverIndex ? action.payload.dragIndex : action.payload.hoverIndex;

         state.canvasBlocks = [
            ...state.canvasBlocks.slice(0, minIndex),
            ...state.canvasBlocks
               .filter((block) => block.index === minIndex)
               .map((item) => {
                  return {
                     ...item,
                     index: maxIndex
                  };
               }),
            ...state.canvasBlocks
               .filter((block) => block.index === maxIndex)
               .map((item) => {
                  return {
                     ...item,
                     index: minIndex
                  };
               }),
            ...state.canvasBlocks.slice(maxIndex + 1)
         ].sort((block1, block2) => block1.index - block2.index);
      }
   }
});

export const { hidePaletteBlock, showPaletteBlock, addCanvasBlock, removeCanvasBlock, moveCanvasBlock } = calcBlocksSlice.actions;
export default calcBlocksSlice.reducer;

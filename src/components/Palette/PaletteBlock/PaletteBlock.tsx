import { FC } from 'react';

import { CalcButton } from '../../UI/CalcButton/CalcButton';
import { componentNames, dndTypes } from '@/utils/constatns';

import styles from './PaletteBlock.module.scss';
import { useDrag } from 'react-dnd';
import cn from 'classnames';
import { RootState, useAppDispatch } from '@/store/store';
import { hidePaletteBlock } from '@/store/slices/calcBlocksSlice';
import { useSelector } from 'react-redux';

interface CalcBlockProps {
   id: number;
   name: string;
   blockClass: string;
   buttons?: ButtonsType[] | undefined;
   value?: string | undefined;
   isVisible: boolean;
   isActive: boolean;
}

interface ButtonsType {
   id: number;
   value: string;
}

export const PaletteBlock: FC<CalcBlockProps> = ({ id, name, blockClass, buttons, value, isActive, isVisible }) => {
   const dispatch = useAppDispatch();

   const itemIndex = useSelector((state: RootState) => state.calculator.canvasBlocks.length);

   const [{ isDragging }, drag] = useDrag(
      () => ({
         type: dndTypes.COMPONENT,
         item: { id, index: itemIndex },
         collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
         }),
         end: (item, monitor) => {
            if (monitor.didDrop()) {
               dispatch(hidePaletteBlock(id));
            }
         },
         canDrag: () => isVisible
      }),
      [isVisible, itemIndex]
   );

   return (
      <div
         className={isVisible ? styles.wrapper : cn(styles.wrapper, styles.disable)}
         ref={drag}
         style={{
            opacity: isDragging ? 0.5 : 1
         }}
      >
         <div className={isVisible ? styles[blockClass] : cn(styles[blockClass], styles.disable)}>
            {name === componentNames.DISPLAY
               ? value
               : buttons?.map((button) => (
                    <CalcButton key={button.id} isActive={isActive} name={name}>
                       {button.value}
                    </CalcButton>
                 ))}
         </div>
      </div>
   );
};

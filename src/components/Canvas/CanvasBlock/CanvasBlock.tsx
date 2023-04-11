import { FC, useRef } from 'react';
import { CalcButton } from '../../UI/CalcButton/CalcButton';
import { componentNames, dndTypes } from '../../../utils/constatns';

import styles from './CanvasBlock.module.scss';
import cn from 'classnames';
import { RootState, useAppDispatch } from '../../../store/store';
import { showPaletteBlock, removeCanvasBlock, moveCanvasBlock } from '../../../store/slices/calcBlocksSlice';
import { useDrag, useDrop } from 'react-dnd';
import type { XYCoord } from 'dnd-core';
import { DropZone } from '../DropZone/DropZone';
import { useSelector } from 'react-redux';

interface CalcBlockProps {
   id: number;
   name: string;
   blockClass: string;
   buttons?: ButtonsType[] | undefined;
   value?: string | undefined;
   isVisible: boolean;
   isActive: boolean;
   index: number;
   handlerClick: (value: string) => void;
}

interface ButtonsType {
   id: number;
   value: string;
}

interface DragItem {
   index: number;
   id: number;
}

export const CanvasBlock: FC<CalcBlockProps> = ({ id, index, name, blockClass, buttons, value, isActive, isVisible, handlerClick }) => {
   const dispatch = useAppDispatch();
   const appMode = useSelector((state: RootState) => state.mode);
   const ref = useRef<HTMLDivElement>(null);

   const [{ isDragging }, drag] = useDrag(
      () => ({
         type: dndTypes.COMPONENT,
         item: () => ({ id, index }),
         collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
         }),
         end: (item, monitor) => {
            if (monitor.didDrop()) {
               console.log('dispatch sort canvas block...');
            }
         },
         canDrag: () => appMode.isConstructor
      }),
      [index, appMode.isConstructor]
   );

   const [{ itemIndex }, drop] = useDrop(
      () => ({
         accept: dndTypes.COMPONENT,
         drop: (item: DragItem, monitor) => {
            console.log('drop');
         },
         collect: (monitor) => {
            return {
               isOver: !!monitor.isOver(),
               itemIndex: monitor.getItem()?.index
            };
         },
         hover: (item, monitor) => {
            if (ref.current === null) {
               return;
            }

            const hoverIndex = index;
            const dragIndex = item.index;

            if (dragIndex === hoverIndex) {
               return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            dispatch(moveCanvasBlock({ dragIndex, hoverIndex }));
            item.index = hoverIndex;
         }
      }),
      [index]
   );

   const doubleClickHandler = (): void => {
      dispatch(showPaletteBlock(id));
      dispatch(removeCanvasBlock(id));
   };

   drag(drop(ref));

   return (
      <div
         className={cn(styles[`${name}_wrapper`], styles.hide_box_shadow)}
         onDoubleClick={doubleClickHandler}
         ref={ref}
         style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: appMode.isConstructor ? 'move' : 'pointer'
         }}
      >
         {isDragging ? (
            <DropZone />
         ) : (
            <div className={styles[blockClass]}>
               {name === componentNames.DISPLAY
                  ? value
                  : buttons?.map((button) => (
                       <CalcButton key={button.id} isActive={isActive} name={name} handlerClick={() => handlerClick(button.value)}>
                          {button.value}
                       </CalcButton>
                    ))}
            </div>
         )}
      </div>
   );
};

import { FC, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { Placeholder } from './Placeholder/Placeholder';
import { useAppDispatch } from '../../store/store';
import type { RootState } from '../../store/store';
import { componentNames, dndTypes, initialInputs, initialInputsProps, reg } from '../../utils/constatns';
import { CanvasBlock } from './CanvasBlock/CanvasBlock';
import { addCanvasBlock } from '../../store/slices/calcBlocksSlice';
import { DropZone } from './DropZone/DropZone';

import styles from './Canvas.module.scss';

export const Canvas: FC = () => {
   const dispatch = useAppDispatch();
   const canvas = useSelector((state: RootState) => state.calculator.canvasBlocks);
   const canvasBlockIds = canvas.map((block) => block.id);

   const appMode = useSelector((state: RootState) => state.mode);

   const [{ isOver, itemId, itemDidDrop }, drop] = useDrop(
      () => ({
         accept: dndTypes.COMPONENT,
         drop: ({ id, index }: { id: number; index: number }, monitor) => {
            if (canvasBlockIds.includes(id)) {
               console.log('handler drop item');
            } else {
               dispatch(addCanvasBlock(id));
            }
         },
         collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            itemId: monitor.getItem()?.id,
            itemDidDrop: monitor.didDrop()
         })
      }),
      [canvasBlockIds]
   );

   const [inputs, setInputs] = useState(initialInputs);
   const [displayData, setDisplayData] = useState<string>('0');
   const isNewInput = useRef(false);
   const isNewData = useRef(false);

   useEffect(() => {
      setInputs(initialInputs);
      setDisplayData('0');
      isNewInput.current = false;
      isNewData.current = false;
   }, [appMode.isConstructor]);

   const handlerClick = (value: string) => {
      if (!appMode.isConstructor) {
         if (reg.NUMBERS.test(value)) {
            if (isNewInput.current) {
               if (inputs.valueB.length < 9) setInputs({ ...inputs, valueB: inputs.valueB + value });
            } else {
               if (inputs.valueA.length < 9) setInputs({ ...inputs, valueA: inputs.valueA + value });
            }
            if (isNewData.current) {
               setDisplayData('');
               isNewData.current = false;
               setDisplayData((prev) => (prev !== '0' ? prev + value : value));
            }
            if (displayData.length < 9) setDisplayData((prev) => (prev !== '0' ? prev + value : value));
         }
         if (value === ',') {
            if (isNewInput.current) {
               if (!inputs.valueB.includes('.')) setInputs({ ...inputs, valueB: inputs.valueB + '.' });
            } else {
               if (!inputs.valueA.includes('.')) setInputs({ ...inputs, valueA: inputs.valueA + '.' });
            }
            if (!displayData.includes(',')) setDisplayData((prev) => prev + value);
         }
         if (value === '=') {
            isNewInput.current = false;
            isNewData.current = true;
            setDisplayData(calcResult(inputs));
            setInputs(initialInputs);
         }
         if (reg.ACTIONS.test(value)) {
            isNewInput.current = true;
            isNewData.current = true;
            if (inputs.action !== '') {
               const result = calcResult(inputs);
               if (result !== 'error') {
                  setInputs({ valueA: calcResult(inputs), valueB: '', action: value });
               } else {
                  setInputs(initialInputs);
                  setDisplayData(result);
                  isNewInput.current = false;
               }
            } else {
               setInputs({ ...inputs, action: value });
            }
         }
      }
   };

   const calcResult = (inputs: initialInputsProps) => {
      switch (inputs.action) {
         case '+':
            return (parseFloat(inputs.valueA) + parseFloat(inputs.valueB)).toFixed(8).replace(/\.?0+$/, '');
         case '-':
            return (parseFloat(inputs.valueA) - parseFloat(inputs.valueB)).toFixed(8).replace(/\.?0+$/, '');
         case 'x':
            return (parseFloat(inputs.valueA) * parseFloat(inputs.valueB)).toFixed(8).replace(/\.?0+$/, '');
         case '/':
            if (parseFloat(inputs.valueB) === 0) return 'error';
            return (parseFloat(inputs.valueA) / parseFloat(inputs.valueB)).toFixed(8).replace(/\.?0+$/, '');
      }
      return '';
   };

   return (
      <div ref={drop} className={isOver && canvas.length === 0 ? cn(styles.canvas, styles.isover) : styles.canvas}>
         {canvas.length === 0 ? (
            <Placeholder />
         ) : (
            canvas.map((block) => {
               if (block.name === componentNames.DISPLAY) {
                  return (
                     <CanvasBlock
                        key={block.id}
                        id={block.id}
                        index={block.index}
                        name={block.name}
                        blockClass={block.blockClass}
                        value={displayData.replace('.', ',')}
                        isVisible={block.isVisible}
                        isActive={!appMode.isConstructor}
                        handlerClick={handlerClick}
                     />
                  );
               }
               return (
                  <CanvasBlock
                     key={block.id}
                     id={block.id}
                     index={block.index}
                     name={block.name}
                     blockClass={block.blockClass}
                     buttons={block.buttons}
                     isVisible={block.isVisible}
                     isActive={!appMode.isConstructor}
                     handlerClick={handlerClick}
                  />
               );
            })
         )}
         {isOver && canvas.length !== 0 && <DropZone />}
      </div>
   );
};

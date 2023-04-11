import { componentNames } from '../../utils/constatns';

import styles from './Palette.module.scss';
import type { FC } from 'react';
import { PaletteBlock } from './PaletteBlock/PaletteBlock';
import type { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export const Palette: FC = () => {
   const calcBlocks = useSelector((state: RootState) => state.calculator.paletteBlocks);
   const appMode = useSelector((state: RootState) => state.mode);

   return (
      <div className={styles.wrapper}>
         {appMode.isConstructor &&
            calcBlocks.map((block) => {
               if (block.name === componentNames.DISPLAY) {
                  return (
                     <PaletteBlock
                        key={block.id}
                        id={block.id}
                        name={block.name}
                        blockClass={block.blockClass}
                        value={block.value}
                        isVisible={block.isVisible}
                        isActive={block.isActive}
                     />
                  );
               }
               return (
                  <PaletteBlock
                     key={block.id}
                     id={block.id}
                     name={block.name}
                     blockClass={block.blockClass}
                     buttons={block.buttons}
                     isVisible={block.isVisible}
                     isActive={block.isActive}
                  />
               );
            })}
      </div>
   );
};

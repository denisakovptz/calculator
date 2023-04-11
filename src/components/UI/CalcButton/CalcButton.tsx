import cn from 'classnames';
import type { FC } from 'react';

import { componentNames } from '@/utils/constatns';

import styles from './CalcButton.module.scss';

interface CalcButtonProps {
   children: string;
   isActive: boolean;
   name: string;
   handlerClick?: () => void;
}

export const CalcButton: FC<CalcButtonProps> = ({ children, isActive, name, handlerClick }: CalcButtonProps) => {
   const buttomClass = name === componentNames.EQUAL ? styles.equal_button : styles.calc_button;
   return (
      <div className={isActive ? cn(buttomClass, styles.active) : buttomClass} onClick={handlerClick}>
         {children}
      </div>
   );
};

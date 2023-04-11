import type { FC } from 'react';
import { useSelector } from 'react-redux';

import { HeaderLink } from '@/components/UI/HeaderLink/HeaderLink';
import { setMode } from '@/store/slices/modeSlice';
import { RootState, useAppDispatch } from '@/store/store';
import { mode } from '@/utils/constatns';

import styles from './Header.module.scss';

export const Header: FC = () => {
   const dispatch = useAppDispatch();
   const appMode = useSelector((state: RootState) => state.mode.isConstructor);

   return (
      <div className={styles.header}>
         <div className={appMode === mode.RUNTIME ? 'active' : ''} onClick={() => dispatch(setMode(mode.RUNTIME))}>
            <HeaderLink>Runtime</HeaderLink>
         </div>
         <div className={appMode === mode.CONSTRUCTOR ? 'active' : ''} onClick={() => dispatch(setMode(mode.CONSTRUCTOR))}>
            <HeaderLink>Constructor</HeaderLink>
         </div>
      </div>
   );
};

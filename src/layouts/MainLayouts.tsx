import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../pages/Header/Header';

import styles from './MainLayouts.module.scss';

const MainLayout: FC = () => {
   return (
      <div className={styles.wrapper}>
         <Header />
         <div className={styles.content}>
            <Outlet />
         </div>
      </div>
   );
};

export default MainLayout;

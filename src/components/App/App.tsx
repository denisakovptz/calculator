import { Constructor } from '@/pages/Constructor/Constructor';
import { Header } from '@/pages/Header/Header';

import styles from './App.module.scss';

function App() {
   return (
      <div className={styles.app}>
         <div className={styles.wrapper}>
            <Header />
            <div className={styles.content}>
               <Constructor />
            </div>
         </div>
      </div>
   );
}

export default App;

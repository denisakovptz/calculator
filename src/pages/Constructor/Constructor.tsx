import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Canvas } from '../../components/Canvas/Canvas'
import { Palette } from '../../components/Palette/Palette'

import styles from './Constructor.module.scss'

export const Constructor = (): JSX.Element => {
   return (
      <DndProvider backend={HTML5Backend}>
         <div className={styles.wrapper}>
            <div className={styles.palette}>
               <Palette />
            </div>
            <div className={styles.canvas}>
               <Canvas />
            </div>
         </div>
      </DndProvider>
   )
}

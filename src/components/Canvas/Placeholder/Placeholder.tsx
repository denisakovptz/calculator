import canvasImg from '../../../assets/paletteIcon.png'
import styles from './Placeholder.module.scss'

export const Placeholder = (): JSX.Element => {
   return (
      <div className={styles.placeholder}>
         <img src={canvasImg} alt="Palette" />
         <div className={styles.placeholder_text}>Перетащите сюда</div>
         <div className={styles.placeholder_span}>любой элемент из левой панели</div>
      </div>
   )
}

import type { FC, ReactNode } from 'react'

import styles from './HeaderLink.module.scss'
import { HeaderSvgSelector } from './HeaderSvgSelector'

interface HeaderLinkProps {
   children: ReactNode
}

export const HeaderLink: FC<HeaderLinkProps> = ({ children }) => {
   return (
      <div className={styles.header_link}>
         <HeaderSvgSelector id={children === 'Runtime' ? 'runtimeIcon' : 'constructorIcon'} />
         {children}
      </div>
   )
}

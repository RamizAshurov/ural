import { Spinner } from '../spinner'
import styles from './loader.module.scss'

export function Loader({ children }) {
  return (
    <p className={styles.loader} role="status">
      <Spinner />
      {children}
    </p>
  )
}

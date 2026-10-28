import styles from './page-container.module.scss'

export function PageContainer({ children }) {
  return <div className={styles.container}>{children}</div>
}

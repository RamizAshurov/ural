import styles from './empty-state.module.scss'

export function EmptyState({ children }) {
  return <p className={styles.empty}>{children}</p>
}

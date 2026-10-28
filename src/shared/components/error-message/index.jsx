import styles from './error-message.module.scss'

export function ErrorMessage({ children }) {
  return (
    <p className={styles.error} role="alert">
      {children}
    </p>
  )
}

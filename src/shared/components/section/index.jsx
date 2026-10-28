import styles from './section.module.scss'

export function Section({ title, count, description, children }) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          {title}
          {count != null && <span className={styles.count}>{count}</span>}
        </h2>
        {description && <p className={styles.description}>{description}</p>}
      </header>
      {children}
    </section>
  )
}

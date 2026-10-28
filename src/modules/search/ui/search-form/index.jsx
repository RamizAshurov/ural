import styles from './search-form.module.scss'

export const MIN_QUERY_LENGTH = 3

export function SearchForm({ value, onChange }) {
  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="article" className={styles.label}>
        Артикул детали
      </label>
      <input
        id="article"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Например, 01089"
        className={styles.input}
      />
      <p className={styles.hint}>Введите минимум {MIN_QUERY_LENGTH} символа</p>
    </form>
  )
}

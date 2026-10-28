import styles from './manufacturer-card.module.scss'

export function ManufacturerCard({ brand, name, isSelected, onSelect }) {
  return (
    <button type="button" className={isSelected ? styles.active : styles.option} onClick={onSelect}>
      <span className={styles.brand}>{brand}</span>
      <span className={styles.name}>{name}</span>
    </button>
  )
}

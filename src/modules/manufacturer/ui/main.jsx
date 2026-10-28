import Card from './card'
import styles from './main.module.scss'

export function Main({ isLoading, error, data, search, selectedBrand, onSelect }) {
  if (isLoading) return <p>Ищем производителей…</p>
  if (error) return <p className={styles.error}>{error.message}</p>
  if (!data) return null
  if (data.length === 0) return <p>Ничего не найдено по артикулу «{search}»</p>

  return (
    <ul className={styles.list}>
      {data.map(({ goodsID, brand, name }) => (
        <li key={goodsID}>
          <Card
            brand={brand}
            name={name}
            isSelected={selectedBrand === brand}
            onSelect={() => onSelect(brand)}
          />
        </li>
      ))}
    </ul>
  )
}

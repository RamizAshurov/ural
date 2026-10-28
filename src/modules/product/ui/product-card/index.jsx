import styles from './product-card.module.scss'

function formatPrice(price) {
  return price.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2,
  })
}

export function ProductCard({ brand, name, price, count }) {
  const hasPrice = price > 0
  const inStock = count > 0

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <span className={styles.brand}>{brand}</span>
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.offer}>
        <span className={inStock ? styles.inStock : styles.outOfStock}>
          {inStock ? `В наличии: ${count}` : 'Нет в наличии'}
        </span>
        <span className={hasPrice ? styles.price : styles.noPrice}>
          {hasPrice ? formatPrice(price) : 'Цена по запросу'}
        </span>
      </div>
    </div>
  )
}

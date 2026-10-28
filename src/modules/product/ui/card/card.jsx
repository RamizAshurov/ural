import styles from './card.module.scss'

function formatPrice(price) {
  return price.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2,
  })
}

function formatStock(count) {
  return count === 20 ? '20+' : String(count)
}

function Card({ brand, name, price, count }) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>
        {brand} — {name}
      </div>
      <div className={styles.price}>{formatPrice(price)}</div>
      <div className={styles.stock}>Остаток: {formatStock(count)}</div>
    </div>
  )
}

export default Card

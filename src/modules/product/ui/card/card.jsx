import styles from './card.module.scss'

function formatPrice(price) {
  return price.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2,
  })
}

function Card({ brand, name, price, count }) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>
        {brand} — {name}
      </div>
      <div className={styles.price}>{price > 0 ? formatPrice(price) : 'Цена по запросу'}</div>
      <div className={styles.stock}>{count > 0 ? `Остаток: ${count}` : 'Нет в наличии'}</div>
    </div>
  )
}

export default Card

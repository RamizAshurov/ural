import Card from '../Card/Card.jsx'
import styles from './List.module.scss'

function List({ isLoading, error, data, brand }) {
  if (isLoading) return <p>Загружаем предложения…</p>
  if (error) return <p className={styles.error}>{error.message}</p>
  if (!data) return null
  if (data.length === 0) return <p>Для производителя «{brand}» предложений не найдено</p>

  return (
    <ul className={styles.list}>
      {data.map((good) => (
        <li key={good.goodsID}>
          <Card brand={good.brand} name={good.name} price={good.price} count={good.count} />
        </li>
      ))}
    </ul>
  )
}

export default List

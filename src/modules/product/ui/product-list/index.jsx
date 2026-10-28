import { EmptyState, ErrorMessage, Loader, Section } from '@shared/components'
import { ProductCard } from '../product-card'
import styles from './product-list.module.scss'

export function ProductList({ isLoading, error, data, brand }) {
  if (isLoading) return <Loader>Загружаем предложения…</Loader>
  if (error) return <ErrorMessage>{error}</ErrorMessage>
  if (!data) return null
  if (data.length === 0) {
    return <EmptyState>Для производителя «{brand}» предложений не найдено</EmptyState>
  }

  return (
    <Section
      title="Предложения"
      count={data.length}
      description={`Деталь ${brand} и аналоги других производителей`}
    >
      <ul className={styles.list}>
        {data.map((good) => (
          <li key={good.goodsID}>
            <ProductCard brand={good.brand} name={good.name} price={good.price} count={good.count} />
          </li>
        ))}
      </ul>
    </Section>
  )
}

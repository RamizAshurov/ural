import { EmptyState, ErrorMessage, Loader, Section } from '@shared/components'
import { ManufacturerCard } from '../manufacturer-card'
import styles from './manufacturer-list.module.scss'

export function ManufacturerList({ isLoading, error, data, query, selectedBrand, onSelect }) {
  if (isLoading) return <Loader>Ищем производителей…</Loader>
  if (error) return <ErrorMessage>{error}</ErrorMessage>
  if (!data) return null
  if (data.length === 0) return <EmptyState>Ничего не найдено по артикулу «{query}»</EmptyState>

  return (
    <Section
      title="Производители"
      count={data.length}
      description="Выберите производителя, чтобы увидеть цены и наличие"
    >
      <ul className={styles.list}>
        {data.map(({ goodsID, brand, name }) => (
          <li key={goodsID}>
            <ManufacturerCard
              brand={brand}
              name={name}
              isSelected={selectedBrand === brand}
              onSelect={() => onSelect(brand)}
            />
          </li>
        ))}
      </ul>
    </Section>
  )
}

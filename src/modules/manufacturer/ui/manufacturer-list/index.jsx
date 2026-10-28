import { EmptyState, ErrorMessage, Loader, Section } from '@shared/components'
import { ManufacturerCard } from '../manufacturer-card'
import styles from './manufacturer-list.module.scss'

export function ManufacturerList({ status, error, data, query, selectedBrand, onSelect }) {
  if (status === 'loading') return <Loader>Ищем производителей…</Loader>
  if (status === 'failed') return <ErrorMessage>{error}</ErrorMessage>
  if (status !== 'succeeded') return null
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

import axiosInstance from './client.js'

// Если ничего не найдено, API отдаёт не пустой список, а заглушку с нулевым goodsID
const EMPTY_GOODS_ID = '00000000-0000-0000-0000-000000000000'

function isRealGood(good) {
  return good.goodsID !== EMPTY_GOODS_ID
}

export async function fetchManufacturers(number, { signal } = {}) {
  const { data } = await axiosInstance.get('', { params: { number }, signal })
  return (data.goods ?? []).filter(isRealGood)
}

export async function fetchAnalogues(number, brand, { signal } = {}) {
  const { data } = await axiosInstance.get('', {
    params: { number, brand, analogues: 'on' },
    signal,
  })
  const [primary] = data.goods ?? []
  if (!primary) return []
  const { analogues = [], ...primaryRest } = primary
  return [primaryRest, ...analogues].filter(isRealGood)
}

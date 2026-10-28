import axiosInstance from './client.js'

export async function fetchManufacturers(number) {
  const { data } = await axiosInstance.get('', { params: { number } })
  return data.goods ?? []
}

export async function fetchAnalogues(number, brand) {
  const { data } = await axiosInstance.get('', {
    params: { number, brand, analogues: 'on' },
  })
  const [primary] = data.goods ?? []
  if (!primary) return []
  const { analogues = [], ...primaryRest } = primary
  return [primaryRest, ...analogues]
}

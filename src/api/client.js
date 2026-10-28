import axios from 'axios'

const API_ERROR_MESSAGES = {
  'Empty key!': 'Не указан ключ доступа к API',
  'Invalid key client!': 'Неверный ключ доступа к API',
  'Invalid access key': 'Неверный ключ доступа к API',
  'Empty number goods!': 'Введите артикул детали',
  'Request quota exceeded!': 'Превышен лимит запросов по грузовому ассортименту, попробуйте позже',
}

function getErrorMessage(error) {
  if (!axios.isAxiosError(error)) {
    return API_ERROR_MESSAGES[error.message] ?? 'Не удалось выполнить поиск'
  }
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return 'Сервер не ответил вовремя, попробуйте ещё раз'
  }
  if (!error.response) return 'Нет соединения с сервером'
  return `Сервер вернул ошибку (HTTP ${error.response.status})`
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

axiosInstance.interceptors.request.use((config) => ({
  ...config,
  params: { ...config.params, key: import.meta.env.VITE_API_KEY },
}))

// API отвечает HTTP 200 даже при логической ошибке, поэтому проверяем тело ответа здесь
axiosInstance.interceptors.response.use((response) => {
  if (response.data && typeof response.data.error === 'string') {
    throw new Error(response.data.error)
  }
  return response
})

axiosInstance.interceptors.response.use(undefined, (error) => {
  if (axios.isCancel(error)) return Promise.reject(error)
  return Promise.reject(new Error(getErrorMessage(error), { cause: error }))
})

export default axiosInstance

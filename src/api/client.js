import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

axiosInstance.interceptors.request.use((config) => ({
  ...config,
  params: { ...config.params, key: import.meta.env.VITE_API_KEY },
}))

axiosInstance.interceptors.response.use((response) => {
  // API отвечает HTTP 200 даже при логической ошибке, поэтому проверяем тело ответа здесь
  if (response.data && typeof response.data.error === 'string') {
    throw new Error(response.data.error)
  }
  return response
})

export default axiosInstance

import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <>
      <h1>404 — страница не найдена</h1>
      <p>
        <Link to="/">Вернуться на главную</Link>
      </p>
    </>
  )
}

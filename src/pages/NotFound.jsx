import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section id="center">
      <div>
        <h1>404 — страница не найдена</h1>
        <p>
          <Link to="/">Вернуться на главную</Link>
        </p>
      </div>
    </section>
  )
}

export default NotFound

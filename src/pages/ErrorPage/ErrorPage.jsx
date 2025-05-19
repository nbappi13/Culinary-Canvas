import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[var(--bg-color)] text-[var(--text-color)] text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Oops! The page you are looking for does not exist...🙄</p>
      <Link
        to="/"
        className="py-2 px-4 bg-[var(--button-bg)] text-[var(--button-text)] border-none rounded hover:bg-[var(--button-hover-bg)] transition-colors duration-200 no-underline"
      >
        Go Back Home 😭💀
      </Link>
    </div>
  )
}

export default ErrorPage

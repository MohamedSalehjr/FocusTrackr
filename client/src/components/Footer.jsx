
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <div className="flex gap-4 ml-10 fixed bottom-0 mb-4">
      <Link to="/toc">
        <p>terms</p>
      </Link>
      <Link to="/privacy">
        <p>privacy</p>
      </Link>
    </div>
  )
}

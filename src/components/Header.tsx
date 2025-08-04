import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const userEmail = localStorage.getItem('userEmail') || ''

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Properties</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{userEmail}</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
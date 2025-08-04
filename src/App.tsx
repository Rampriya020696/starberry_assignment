import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import ListPage from './pages/ListPage'
import LoginPage from './pages/Login'
import DetailPage from './pages/DetailPage'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  return isLoggedIn ? children : <Navigate to="/" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/list"
          element={
            <PrivateRoute>
              <ListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <PrivateRoute>
              <DetailPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

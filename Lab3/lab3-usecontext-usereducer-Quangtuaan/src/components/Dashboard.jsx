import { Badge, Button } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { state, dispatch } = useAuth()
  const { user } = state

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  if (!user) return null

  return (
    <div className="mt-4">
      <h2>Chào mừng, {user.name}!</h2>
      <p>
        Vai trò của bạn:{' '}
        {user.role === 'admin' ? (
          <Badge bg="danger">admin</Badge>
        ) : (
          <Badge bg="success">user</Badge>
        )}
      </p>
      <Button variant="secondary" onClick={handleLogout}>
        Đăng xuất
      </Button>
    </div>
  )
}
import { Alert, Table } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import USERS from '../data/users'

export default function UserListPage() {
  const { state } = useAuth()
  const { user } = state

  if (user?.role !== 'admin') {
    return (
      <div className="mt-4">
        <Alert variant="danger">Bạn không có quyền truy cập</Alert>
      </div>
    )
  }

  return (
    <div className="mt-4">
      <h2>Danh sách User</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {USERS.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.name}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

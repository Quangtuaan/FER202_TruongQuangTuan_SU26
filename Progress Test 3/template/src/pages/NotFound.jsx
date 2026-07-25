import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'

export default function NotFound() {
  // TODO-09: Thiết kế trang 404 — hiển thị mã lỗi 404, thông báo, và nút Back to Home
  return (
    <Container className="text-center py-5">
      {/* TODO-09: implement 404 page design */}
      <h1 className="display-1 fw-bold">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <Button as={Link} to="/" variant="primary">Back to Home</Button>
    </Container>
  )
}

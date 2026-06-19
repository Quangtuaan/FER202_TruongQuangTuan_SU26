import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="app-footer">
      <Container className="d-flex justify-content-between text-muted small">
        <span>© 2026 Feedback Demo</span>
        <span>Built with React, useContext + useReducer & JSON Server</span>
      </Container>
    </footer>
  )
}

export default Footer
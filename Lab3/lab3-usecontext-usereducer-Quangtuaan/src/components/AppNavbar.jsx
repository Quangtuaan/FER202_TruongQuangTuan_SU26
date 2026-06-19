import { Navbar, Container, Button } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function AppNavbar() {
  const { state, dispatch } = useAuth()
  const { theme, toggleTheme } = useContext(ThemeContext)
  
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <Navbar bg={theme === 'dark' ? 'dark' : 'primary'} variant="dark">
      <Container>
        <Navbar.Brand href="#home">MyApp</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-light" className="me-3" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
          <Navbar.Text className="me-3">
            Xin chào, {state.user?.name}
          </Navbar.Text>
          <Button variant="outline-light" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
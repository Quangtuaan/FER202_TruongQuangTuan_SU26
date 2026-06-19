import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={currentUser ? '/users' : '/login'} replace />}
      />

      <Route
        path="/login"
        element={currentUser ? <Navigate to="/users" replace /> : <LoginPage />}
      />

      <Route
        path="/users"
        element={currentUser ? <UsersPage /> : <Navigate to="/login" replace />}
      />

      <Route
        path="*"
        element={<Navigate to={currentUser ? '/users' : '/login'} replace />}
      />
    </Routes>
  );
}

export default App;
import { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../api/userApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('current_user');

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError('');

    try {
      const { account, user } = await authApi.login(username, password);

      const session = {
        ...user,
        role: account.role,
      };

      setCurrentUser(session);
      localStorage.setItem('current_user', JSON.stringify(session));

      return true;
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentUser = (updatedUser) => {
    const session = {
      ...currentUser,
      ...updatedUser,
    };

    setCurrentUser(session);
    localStorage.setItem('current_user', JSON.stringify(session));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('current_user');
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        login,
        logout,
        updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
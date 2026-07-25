import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

// Mock initial users database from db.json
const DEFAULT_USERS = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    email: "admin@atelier.com",
    fullName: "ATELIER TechLead",
    role: "admin",
    avatarUrl: "https://ui-avatars.com/api/?name=Admin&background=c5a880&color=000&size=128"
  },
  {
    id: 2,
    username: "user01",
    password: "user123",
    email: "user01@example.com",
    fullName: "Nguyễn Văn An",
    role: "user",
    avatarUrl: "https://ui-avatars.com/api/?name=Van+An&background=13151a&color=c5a880&size=128"
  },
  {
    id: 3,
    username: "user02",
    password: "user123",
    email: "user02@example.com",
    fullName: "Phạm Thị Lan",
    role: "user",
    avatarUrl: "https://ui-avatars.com/api/?name=Thi+Lan&background=13151a&color=c5a880&size=128"
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);

  // Load user from localStorage and initialize users database
  useEffect(() => {
    // Load registered users list from local storage or set defaults
    const localUsers = localStorage.getItem('atelier_users');
    if (localUsers) {
      setUsersList(JSON.parse(localUsers));
    } else {
      localStorage.setItem('atelier_users', JSON.stringify(DEFAULT_USERS));
      setUsersList(DEFAULT_USERS);
    }

    // Load active session
    const activeUser = localStorage.getItem('atelier_active_user');
    if (activeUser) {
      setUser(JSON.parse(activeUser));
    }
    
    // Simulate initial app loading check
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Update browser tab title based on user state
  useEffect(() => {
    if (user) {
      document.title = `ATELIER | Welcome, ${user.fullName}`;
    } else {
      document.title = 'ATELIER | Showroom Siêu Xe Thượng Lưu';
    }
  }, [user]);

  // Login action
  const login = (username, password) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        const foundUser = usersList.find(
          (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
        );

        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem('atelier_active_user', JSON.stringify(foundUser));
          // Synchronize legacy key for ProtectedRoute compatibility
          localStorage.setItem('user', JSON.stringify(foundUser));
          setLoading(false);
          resolve(foundUser);
        } else {
          setLoading(false);
          reject(new Error('Tài khoản hoặc mật khẩu không chính xác.'));
        }
      }, 800); // Luxury delay to show spinner
    });
  };

  // Logout action
  const logout = () => {
    return new Promise((resolve) => {
      setLoading(true);
      setTimeout(() => {
        setUser(null);
        localStorage.removeItem('atelier_active_user');
        localStorage.removeItem('user'); // Clean up legacy key too
        setLoading(false);
        resolve();
      }, 600);
    });
  };

  // Register action
  const register = (username, email, password, fullName) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        const usernameExists = usersList.some(
          (u) => u.username.toLowerCase() === username.toLowerCase()
        );
        const emailExists = usersList.some(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (usernameExists) {
          setLoading(false);
          reject(new Error('Tên đăng nhập đã tồn tại.'));
          return;
        }

        if (emailExists) {
          setLoading(false);
          reject(new Error('Email đã được đăng ký.'));
          return;
        }

        const newUser = {
          id: Date.now(),
          username,
          password,
          email,
          fullName,
          role: 'user',
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=13151a&color=c5a880&size=128`
        };

        const updatedList = [...usersList, newUser];
        setUsersList(updatedList);
        localStorage.setItem('atelier_users', JSON.stringify(updatedList));

        // Auto login on successful register
        setUser(newUser);
        localStorage.setItem('atelier_active_user', JSON.stringify(newUser));
        localStorage.setItem('user', JSON.stringify(newUser));
        setLoading(false);
        resolve(newUser);
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, setLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

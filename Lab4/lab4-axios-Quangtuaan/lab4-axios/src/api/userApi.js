import api from './axiosInstance';

export const authApi = {
  login: async (username, password) => {
    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = String(password).trim();

    const { data: accounts } = await api.get('/accounts');

    const account = accounts.find((acc) => {
      return (
        String(acc.username).trim().toLowerCase() === cleanUsername &&
        String(acc.password).trim() === cleanPassword
      );
    });

    if (!account) {
      throw new Error('Tên đăng nhập hoặc mật khẩu không đúng.');
    }

    const { data: user } = await api.get(`/users/${account.userId}`);

    if (user.status === 'inactive') {
      throw new Error('Tài khoản đã bị vô hiệu hóa.');
    }

    return {
      account,
      user,
    };
  },
};

export const userApi = {
  getAll: (params = {}) => api.get('/users', { params }),

  getById: (id) => api.get(`/users/${id}`),

  create: (data) =>
    api.post('/users', {
      ...data,
      createdAt: new Date().toISOString().split('T')[0],
    }),

  update: (id, data) => api.put(`/users/${id}`, data),

  patch: (id, part) => api.patch(`/users/${id}`, part),

  remove: (id) => api.delete(`/users/${id}`),
};
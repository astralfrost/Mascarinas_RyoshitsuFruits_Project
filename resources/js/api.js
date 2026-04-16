import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Include token in all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const productAPI = {
  getAll: () => api.get('/products'),
  getBySlug: (slug) => api.get(`/products/${slug}`),
};

export const adminProductAPI = {
  getAll: () => api.get('/admin/products'),
  create: (data) => api.post('/admin/products', data),
  update: (id, data) => api.put(`/admin/products/${id}`, data),
  destroy: (id) => api.delete(`/admin/products/${id}`),
};

export const cartAPI = {
  getCart: () => api.get('/cart'),
  add: (productId, quantity) =>
    api.post('/cart/add', { product_id: productId, quantity }),
  update: (productId, quantity) =>
    api.post('/cart/update', { product_id: productId, quantity }),
  remove: (productId) =>
    api.post('/cart/remove', { product_id: productId }),
  clear: () => api.post('/cart/clear'),
};

export const adminOrderAPI = {
  getAll: () => api.get('/admin/orders'),
};

export const adminUserAPI = {
  getAll: () => api.get('/admin/users'),
  destroy: (id) => api.delete(`/admin/users/${id}`),
};

export const authAPI = {
  register: (name, email, password, passwordConfirmation) => {
    return api.post('/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }).then(response => {
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      return response;
    });
  },
  login: (email, password) => {
    return api.post('/login', { email, password }).then(response => {
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      return response;
    });
  },
  logout: () => {
    localStorage.removeItem('auth_token');
    return api.post('/logout');
  },
  getCurrentUser: () => api.get('/user'),
};

export const orderAPI = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  checkout: (data) => api.post('/checkout', data),
};

export default api;

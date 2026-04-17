import React, { createContext, useState, useCallback, useEffect } from 'react';
import { cartAPI, authAPI } from '../api';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user on mount and when token changes
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const loadUser = async () => {
        try {
          const response = await authAPI.getCurrentUser();
          setUser(response.data);
          await loadCart();
        } catch (err) {
          localStorage.removeItem('auth_token');
          setUser(null);
        }
      };
      loadUser();
    } else {
      setUser(null);
    }
  }, []);

  const loadCart = useCallback(async () => {
    try {
      const response = await cartAPI.getCart();
      setCart(response.data.items || []);
      setCartTotal(response.data.total || 0);
    } catch (err) {
      console.error('Failed to load cart:', err);
    }
  }, []);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    if (!user) {
      if (confirm('Please login to add to cart. Go to login?')) {
        window.location.href = '/login';
      }
      return false;
    }
    try {
      const response = await cartAPI.add(productId, quantity);
      setCart(response.data.items || []);
      setCartTotal(response.data.total || 0);
      return true;
    } catch (err) {
      setError('Failed to add item to cart');
      return false;
    }
  }, [user]);

  const updateCart = useCallback(async (productId, quantity) => {
    try {
      const response = await cartAPI.update(productId, quantity);
      setCart(response.data.items || []);
      setCartTotal(response.data.total || 0);
    } catch (err) {
      setError('Failed to update cart');
    }
  }, []);

  const removeFromCart = useCallback(async (productId) => {
    try {
      const response = await cartAPI.remove(productId);
      setCart(response.data.items || []);
      setCartTotal(response.data.total || 0);
    } catch (err) {
      setError('Failed to remove item from cart');
    }
  }, []);

  const clearCart = useCallback(async () => {
    try {
      const response = await cartAPI.clear();
      setCart([]);
      setCartTotal(0);
    } catch (err) {
      setError('Failed to clear cart');
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const response = await authAPI.login(email, password);
      setUser(response.data.user);
      await loadCart();
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadCart]);

  const register = useCallback(async (name, email, password) => {
    setLoading(true);
    try {
      const response = await authAPI.register(name, email, password, password);
      setUser(response.data.user);
      await loadCart();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadCart]);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem('auth_token');
      setUser(null);
      setCart([]);
      setCartTotal(0);
      window.dispatchEvent(new Event('logout'));
    } catch (err) {
      localStorage.removeItem('auth_token');
      setUser(null);
      setCart([]);
      setCartTotal(0);
      setError('Logout failed');
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        cart,
        cartTotal,
        loading,
        error,
        addToCart,
        updateCart,
        removeFromCart,
        clearCart,
        login,
        register,
        logout,
        loadCart,
        clearError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

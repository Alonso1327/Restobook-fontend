import { createContext, useState, useContext, useEffect } from 'react';
import {API_ENDPOINTS} from '../utils/apiConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Intenta recuperar la información de autenticación del localStorage
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');
    const restaurantId = localStorage.getItem('restaurantId');
    return token && userType && userId ? { token, userType, userId, restaurantId } : null;
  });

  useEffect(() => {
    // Actualiza el localStorage cuando cambia el estado de autenticación
    if (auth) {
      localStorage.setItem('token', auth.token);
      localStorage.setItem('userType', auth.userType);
      localStorage.setItem('userId', auth.userId);
      if (auth.restaurantId) {
        localStorage.setItem('restaurantId', auth.restaurantId);
      } else {
        localStorage.removeItem('restaurantId');
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      localStorage.removeItem('userId');
      localStorage.removeItem('restaurantId');
    }
  }, [auth]);

  const login = async (email, password) => {
    try {
      const response = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(`Error en la autenticación: ${response.status} - ${errorData.message || 'Detalles no disponibles'}`);
        error.status = response.status;
        throw error;
      }

      const data = await response.json();
      setAuth({
        token: data.token,
        userType: data.user_type,
        userId: data.id,
        restaurantId: data.restaurant_id || null
      });
      return data;
    } catch (error) {
      console.error('Error durante el login:', error);
      throw error;
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('restaurantId');
  };

  const updateAuth = (newAuthData) => {
    setAuth(prevAuth => {
      if (!prevAuth) return null;
      const updatedAuth = { ...prevAuth, ...newAuthData };
      // Actualizar localStorage
      Object.entries(updatedAuth).forEach(([key, value]) => {
        if (value) {
          localStorage.setItem(key, value);
        } else {
          localStorage.removeItem(key);
        }
      });
      return updatedAuth;
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('authToken');
    const storedUserData = localStorage.getItem('userData');

    const checkTokenExpiry = () => {
      // Implement token expiry check logic if needed
      // Example: if (tokenExpired) logout();
    };

    if (accessToken && storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setIsAuthenticated(true);
        setUserData(parsedUserData);

        checkTokenExpiry();
      } catch (error) {
        console.error('Error parsing userData from localStorage:', error);
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('https://phpstack-1252920-4618688.cloudwaysapps.com/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.accessToken);
      localStorage.setItem('userData', JSON.stringify(data));
      setIsAuthenticated(true);
      setUserData(data);

      console.log('Login response:', data);
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUserData(null);
  };

  const value = {
    isAuthenticated,
    userData,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

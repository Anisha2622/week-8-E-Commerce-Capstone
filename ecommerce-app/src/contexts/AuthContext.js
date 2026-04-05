import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('auth-user')) || null);

  const login = (email, password) => {
    const simulatedUser = { id: 1, name: email.split('@')[0], email };
    setUser(simulatedUser);
    localStorage.setItem('auth-user', JSON.stringify(simulatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth-user');
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

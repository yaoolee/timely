import React, { useMemo, useState } from 'react';
import { AuthContext } from './authContextCore.js';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    const reg = localStorage.getItem('registeredUser');
    if (!reg) {
      throw new Error('No account found. Please register first.');
    }
    const registered = JSON.parse(reg);
    if (registered.email !== email || registered.password !== password) {
      throw new Error('Invalid credentials.');
    }
    const nextUser = { username: registered.username, email: registered.email };
    setUser(nextUser);
    localStorage.setItem('user', JSON.stringify(nextUser));
    return nextUser;
  };

  const register = async (username, email, password) => {
    const registered = { username, email, password };
    localStorage.setItem('registeredUser', JSON.stringify(registered));
    // Require login after registration
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


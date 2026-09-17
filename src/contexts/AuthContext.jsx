import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS, authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Default to Guest or Donor for smooth testing
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('roktokonika_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.donor;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('roktokonika_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('roktokonika_user');
    }
  }, [user]);

  const login = async (emailOrPhone, password) => {
    setLoading(true);
    try {
      const res = await authService.login(emailOrPhone, password);
      setUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      const res = await authService.register(data);
      setUser(res.user);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  // Demo Role Quick Switcher Helper
  const switchRole = (roleKey) => {
    if (roleKey === 'guest') {
      setUser(null);
    } else if (DEMO_USERS[roleKey]) {
      setUser(DEMO_USERS[roleKey]);
    }
  };

  const updateProfile = (updatedFields) => {
    setUser(prev => prev ? { ...prev, ...updatedFields } : prev);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      role: user ? user.role : 'guest',
      loading,
      login,
      register,
      logout,
      switchRole,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

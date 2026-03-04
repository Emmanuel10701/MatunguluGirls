'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const SessionContext = createContext(undefined);

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = () => {
    try {
      const token = localStorage.getItem('admin_token');
      const userData = localStorage.getItem('admin_user');

      if (token && userData) {
        // Check if token is expired
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        if (tokenData.exp > currentTime) {
          // Token is valid
          setSession({
            user: JSON.parse(userData),
            token: token
          });
        } else {
          // Token expired, clear storage
          clearSession();
        }
      }
    } catch (error) {
      console.error('Session check failed:', error);
      clearSession();
    } finally {
      setLoading(false);
    }
  };

  const signIn = (userData, token) => {
    try {
      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify(userData));
      
      setSession({
        user: userData,
        token: token
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const signOut = () => {
    clearSession();
    window.location.href = '/pages/adminLogin';
  };

  const clearSession = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setSession(null);
  };

  const value = {
    session,
    loading,
    signIn,
    signOut,
    checkSession
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
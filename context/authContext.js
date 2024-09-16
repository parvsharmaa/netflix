'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  clearToken,
  saveToken,
  saveUser,
  setUserToContext,
} from '@/utils/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  const login = (data) => {
    setUserData(data?.user);
    saveUser(data?.user);
    saveToken(data?.token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    clearToken();
    saveUser(null);
    setIsLoggedIn(false);
    setUserData(null);
    router.push('/auth');
  };

  const setUserCredentials = (user) => {
    if (user) {
      setUserData(user);
      setIsLoggedIn(true);
    } else {
      const storedUser = setUserToContext();
      if (storedUser) {
        setUserData(storedUser);
        setIsLoggedIn(true);
      }
    }
  };

  useEffect(() => {
    setUserCredentials();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userData, login, logout, setUserCredentials }}
    >
      {children}
    </AuthContext.Provider>
  );
};

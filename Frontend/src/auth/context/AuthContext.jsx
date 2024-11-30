import { createContext, useState } from 'react';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const login = (profile) => {
    setIsAuthenticated(true);
    setUserProfile(profile);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userProfile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
import React, { useState } from 'react';
const AuthContext = React.createContext();

const LOCAL_STORAGE_KEY = 'movieAppToken';

function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem(LOCAL_STORAGE_KEY) || false
  );

  const login = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'dummytoken');
    setTimeout(() => setIsAuthenticated(true), 1000);
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        onLogin: login,
        onLogout: logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };

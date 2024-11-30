import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  token: null,
  login: () => {},
  logout: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

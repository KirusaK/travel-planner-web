import {createContext, useContext, useState} from "react";

const AuthContext = createContext(null);
const expire_time = 24 * 60 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedData = localStorage.getItem("user");

    if (!savedData) return null;

    try {
      const {user, timestamp} = JSON.parse(savedData)
      const isExpired = Date.now() - timestamp > expire_time;

      if (isExpired) {
        localStorage.removeItem("user");
        return null
      }

      return user;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = (userData) => {
    const sessionData = {
      user: userData,
      timestamp: Date.now(),
    }

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(sessionData));
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout } }>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}



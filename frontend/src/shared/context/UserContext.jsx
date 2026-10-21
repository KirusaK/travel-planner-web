import { createContext, useContext, useEffect, useState } from "react";

const API = "http://localhost:5000/api";
const UserContext = createContext(null);

export const UserProvider = ({ userId = 1, children }) => {
  const [user, setUser] = useState(null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    fetch(`${API}/users/${userId}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || "Failed to load");
        setUser(data);
      })
      .catch((e) => setLoadError(e.message));
  }, [userId]);

  return (
    <UserContext.Provider value={{ user, setUser, userId, loadError }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

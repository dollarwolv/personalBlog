import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { apiPath } from "../utils/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    async function loadUser() {
      try {
        const res = await fetch(apiPath("/me"), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await res.json();
        setUser(user);
      } catch (error) {}
    }
    loadUser();
  }, [token]);

  async function logIn(username, password) {
    const res = await fetch(apiPath("/log-in"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");

    console.log(data);
    setToken(data.token);
    setUser(data.user);
  }

  async function signUp(username, password) {
    const res = await fetch(apiPath("/sign-up"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.err || "Signup failed");

    console.log(data);
    setToken(data.token);
    setUser(data.user);
  }

  function logOut() {
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, logIn, logOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

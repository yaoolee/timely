import React, { useMemo, useState } from "react";
import { AuthContext } from "./authContextCore.js";
import { api } from "../api/client.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      const nextUser = data.user;
      setUser(nextUser);
      localStorage.setItem("user", JSON.stringify(nextUser));
      return nextUser;
    } catch (err) {
      const msg = err?.response?.data?.message || "Invalid email or password";
      throw new Error(msg);
    }
  };

  const register = async (username, email, password) => {
    try {
      await api.post("/auth/register", { name: username, email, password });
      return true;
    } catch (err) {
      const status = err?.response?.status;
      if (status === 409) {
        throw new Error("Email already in use");
      }
      const msg = err?.response?.data?.message || "Registration failed";
      throw new Error(msg);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.warn("Logout request failed", err);
    }
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

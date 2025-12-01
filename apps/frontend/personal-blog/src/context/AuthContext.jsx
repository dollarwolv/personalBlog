import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

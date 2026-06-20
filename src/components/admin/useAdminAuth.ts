"use client";

import { useCallback, useEffect, useState } from "react";

export const ADMIN_STORAGE_KEY = "sikachain_admin_token";

export function useAdminAuth() {
  const [token, setToken] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_STORAGE_KEY);
    if (saved) setToken(saved);
  }, []);

  const authHeaders = useCallback(
    () => ({ Authorization: `Bearer ${token}`, "Content-Type": "application/json" }),
    [token],
  );

  function login(e: React.FormEvent) {
    e.preventDefault();
    sessionStorage.setItem(ADMIN_STORAGE_KEY, input.trim());
    setToken(input.trim());
    setInput("");
    setError("");
  }

  function logout() {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    setToken("");
  }

  function handleUnauthorized() {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    setToken("");
    setError("Invalid admin token");
  }

  return { token, input, setInput, error, setError, authHeaders, login, logout, handleUnauthorized };
}

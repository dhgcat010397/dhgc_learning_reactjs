import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { default as AuthApi } from "../services/apis/authApi";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || null);
  const [isLoading, setIsLoading] = useState(true);
  const abortControllerRef = useRef(null);
  const navigate = useNavigate();

  // Check for existing valid token on initial load
  useEffect(() => {
    const verifyToken = async () => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        if (token) {
          // Add your token validation logic here
          // Example: Verify with backend or check expiration
          const userData = await AuthApi.validateToken(
            token,
            controller.signal
          );
          setUser(userData);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        setUser(null);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [logout, token]);

  const login = async (credentials) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await AuthApi.login(credentials, controller.signal);

      const newToken = response.token;
      const userData = response.user;

      localStorage.setItem("jwtToken", newToken);
      setToken(newToken);
      setUser(userData);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = useCallback(async () => {
    await AuthApi.logout();
    setToken(null);
    setUser(null);
    navigate("/login");
  }, [navigate]);

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
